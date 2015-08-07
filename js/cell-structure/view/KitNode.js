/*
  Kit which holds animal cell, plant cell, etc
 */
define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle');
  var Node = require( 'SCENERY/nodes/Node');
  var KitObjectNode = require( 'CELL_STRUCTURE/cell-structure/view/KitObjectNode' );
  var Vector2 = require( 'DOT/Vector2' );

  function KitNode( model, options, modelViewTransform ) {

    Node.call(this);

    var rect = new Rectangle( model.location.x, model.location.y, 200, 100, 5, 5, { fill: '#ffffff', stroke: 'orange', lineWidth:5 });

    var resetChildren = function() {
      rect.removeAllChildren();
      var x = options.x || 0;
      var y = options.y || 0;
      model.children.forEach( function(child){
        child.locationProperty.set(new Vector2(x, y));
        var childNode = new KitObjectNode(child, modelViewTransform);
        rect.addChild(childNode);
        x += 100;
      }.bind(this));
    };

    this.addChild(rect);

    model.childrenProperty.link(resetChildren);

  }

  return inherit ( Node, KitNode);

});
