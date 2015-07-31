/*
  View to display subject under test ( microscope)
 */
define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle');
  var Node = require( 'SCENERY/nodes/Node');
  var Image = require( 'SCENERY/nodes/Image' );


  function MagnifierViewNode( model, options, modelViewTransform ) {

    var rect = new Rectangle( 20, 20, 300, 250, 5, 5, { fill: '#000000', stroke: 'orange', lineWidth:5 });

    Node.call(this);

    this.addChild(rect);
    model.magnifiedImageProperty.link(function( image ) {
      if ( !image ) { return; }
      var imageNode = new Image( image.image, { centerX: 80, centerY: 80 } );
      rect.removeAllChildren();
      rect.addChild(imageNode);
    }.bind(this));
  }

  return inherit ( Node, MagnifierViewNode);

});
