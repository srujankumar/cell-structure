/*
  View to display subject under test ( microscope)
 */
define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle');
  var Node = require( 'SCENERY/nodes/Node');


  function MagnifierViewNode( model, options, modelViewTransform ) {

    var magnifierViewNode = this;
    var rect = new Rectangle( 20, 20, 300, 250, 5, 5, { fill: '#000000', stroke: 'orange', lineWidth:5 });

    Node.call(magnifierViewNode);

    magnifierViewNode.addChild(rect);

  }

  return inherit ( Node, MagnifierViewNode);

});