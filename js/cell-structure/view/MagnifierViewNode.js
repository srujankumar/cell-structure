/*
  View to display subject under test ( microscope)
 */
define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle');
  var Node = require( 'SCENERY/nodes/Node');
  var Image = require( 'SCENERY/nodes/Image' );
  var MagnifiedImageNode = require( 'CELL_STRUCTURE/cell-structure/view/MagnifiedImageNode' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var TextPushButton = require( 'SUN/buttons/TextPushButton' );

  function MagnifierViewNode( model, options, modelViewTransform ) {

    var rect = new Rectangle( 0, 0, 240, 200, 5, 5, { fill: '#000000', stroke: 'orange', lineWidth: 5 });

    Node.call(this, options);

    this.addChild(rect);
    model.magnifiedImageProperty.link(function( image ) {
      if ( !image ) { this.setVisible(false); return; }
      this.setVisible(true);
      rect.removeAllChildren();

      var magnifiedImageNode = new MagnifiedImageNode( image, modelViewTransform );
      rect.addChild(magnifiedImageNode);
    }.bind(this));


    var flipButton = new TextPushButton( "<", {
      font: new PhetFont( 16 ),
      baseColor: 'yellow',
      xMargin: 10,
      x: -30,
      y: 0,
      listener: function() {
        if ( model.magnifiedImage.parentImage ) {
          model.magnifiedImageProperty.set( model.magnifiedImage.parentImage );
        }
      }
    } );
    this.addChild(flipButton);
  }

  return inherit ( Node, MagnifierViewNode);

});
