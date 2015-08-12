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

  function KitNode( model, options, modelViewTransform, childNode ) {

    Node.call(this);

    var rect = new Rectangle( model.location.x, model.location.y, model.size.width, model.size.height, 5, 5, { fill: '#ffffff', stroke: 'orange', lineWidth:5 });

    var resetChildren = function() {
      rect.removeAllChildren();
      var x = options.x || 0;
      var initialX = x;
      var y = options.y || 0;
      childNode = childNode || KitObjectNode;
      CS.utils.slice(model.children, 2).forEach( function(childRows){
        childRows.forEach(function(child) {
          child.locationProperty.set(new Vector2(x, y));
          var childNodeObj = new childNode(child, modelViewTransform);
          rect.addChild(childNodeObj);
          x += 100;
        });
        x = initialX;
        y += 100;
      }.bind(this));
    };

    this.addChild(rect);

    model.childrenProperty.link(resetChildren);

  }

  return inherit ( Node, KitNode);

});
