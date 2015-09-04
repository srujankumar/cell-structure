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

  function MessageBoxNode( model, modelViewTransform ) {
    Node.call( this, {
      x: model.location.x,
      y: model.location.y
    } );

    var messageBoxBorder = new Image(messageBoxImage);
    var messageText = new Text( model.message, { font: new PhetFont(14), fill: 'orange'});
    messageBoxBorder.addChild(messageText);
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
    this.scale( modelViewTransform.modelToViewDeltaX( model.size.width ) / this.width,
      modelViewTransform.modelToViewDeltaY( model.size.height ) / this.height );

    model.visibilityProperty.link( function(visibility){
      this.setVisible(visibility);
    }.bind(this));

    var getMultiLineText = function( text){
      var multiLineArray = [];
      var wordArray = text.split(" ");
      var maxLength = 15;
      var line = '';
      var curLen = 0;
      wordArray.forEach( function( word){
        if(curLen + word.length <= maxLength) {
          line = line + ' ' + word;
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

    model.messageProperty.link( function( message ){
      messageBoxBorder.removeAllChildren();
      var lineNum = 0;
      getMultiLineText(message).forEach( function( text) {
        messageBoxBorder.addChild( new Text( text, { font: new PhetFont(10), fill: 'black',
          x: 10, y: 15 + lineNum*15 }));
          lineNum++;
      });

    });

    model.locationProperty.link( function( location) {
      this.translation = location;
    }.bind(this));
  }

  return inherit( Node, MessageBoxNode );
} );
