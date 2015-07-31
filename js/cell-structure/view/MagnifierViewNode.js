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

  function MagnifierViewNode( model, options, modelViewTransform ) {

    var rect = new Rectangle( 0, 0, 300, 250, 5, 5, { fill: '#000000', stroke: 'orange', lineWidth: 5 });

    Node.call(this, options);

    this.addChild(rect);
    model.magnifiedImageProperty.link(function( image ) {
      if ( !image ) { return; }
      rect.removeAllChildren();

      var magnifiedImageNode = new MagnifiedImageNode( image, modelViewTransform );
      rect.addChild(magnifiedImageNode);
    }.bind(this));
  }

  return inherit ( Node, MagnifierViewNode);

});
