define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Image = require( 'SCENERY/nodes/Image' );
  var messageBoxImage = require( 'image!CELL_STRUCTURE/message-box.svg' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Dimension2 = require( 'DOT/Dimension2' );

  function MessageBoxNode( model, modelViewTransform ) {
    Node.call( this, {
      x: model.location.x,
      y: model.location.y
    } );

    var messageBoxBorder = new Image(messageBoxImage, { x:0, y:0 });
    messageBoxBorder.scale( modelViewTransform.modelToViewDeltaX( model.size.width ) / messageBoxBorder.width,
      modelViewTransform.modelToViewDeltaY( model.size.height ) / messageBoxBorder.height );
    this.addChild(messageBoxBorder);

    var closeButton = new TextPushButton( "X", {
      font: new PhetFont( 10 ),
      baseColor: 'yellow',
      x: -20,
      y: 0,
      listener: function() {
        model.visibilityProperty.set(false);
      }
    } );
    this.addChild(closeButton);

    model.visibilityProperty.link( function(visibility){
      this.setVisible(visibility);
    }.bind(this));

    var getMultiLineText = function( text, lineLen){
      var multiLineArray = [];
      var wordArray = text.split(" ");
      var maxLength = lineLen;
      var line = '';
      var curLen = 0;
      wordArray.forEach( function( word){
        if(curLen + word.length <= maxLength) {
          line = ( line.length === 0 )? word : line + ' ' + word ;
          curLen = curLen + word.length + 1;
        }
        else {
          multiLineArray.push(line);
          line = word;
          curLen = word.length;
        }
      });
      if( line.length > 0)
        multiLineArray.push(line);

      return multiLineArray;
    };

    var textContainer = new Node({ x:0, y:0 });
    this.addChild(textContainer);

    var updateText = function( message ){
      textContainer.removeAllChildren();
      var lineNum = 0;
      var i = 0;
      if( message.length > 95 ) {
        while( message.length > 95 + ( 20 * i) + ( ( 3 * i) * ( 5 + i))) 
          i++;
        model.sizeProperty.set( new Dimension2( 200 + ( 40 * i), 170 + ( 30 * i)));
      }
      else
        model.sizeProperty.reset();
      getMultiLineText(message, 20 + ( 3 * i)).forEach( function( text) {
        textContainer.addChild( new Text( text, { font: new PhetFont(20), fill: 'black',
          x: 15 + ( 2 * i), y: 30  + ( 2 * i) + lineNum*20 }));
          lineNum++;
      });
    };

    updateText(model.message);

    model.messageProperty.link( updateText );

    model.locationProperty.link( function( location) {
      this.translation = location;
    }.bind(this));

    model.sizeProperty.link( function( size) {
     messageBoxBorder.scale( modelViewTransform.modelToViewDeltaX( size.width ) / messageBoxBorder.width,
      modelViewTransform.modelToViewDeltaY( size.height ) / messageBoxBorder.height );
    });
  }

  return inherit( Node, MessageBoxNode );
} );
