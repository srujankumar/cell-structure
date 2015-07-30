/*
  Kit which holds animal cell, plant cell, etc
 */
define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var AnimalCellNode = require( 'CELL_STRUCTURE/cell-structure/view/AnimalCellNode');
  var PlantCellNode = require( 'CELL_STRUCTURE/cell-structure/view/PlantCellNode');
  var Rectangle = require( 'SCENERY/nodes/Rectangle');
  var Node = require( 'SCENERY/nodes/Node');


  function ObjectKit( model, options, modelViewTransform ) {

    var objectKit = this;
    var plantCellNode = new PlantCellNode(model, modelViewTransform);
    var animalCellNode = new AnimalCellNode(model, modelViewTransform);
    var rect = new Rectangle( options.x, options.y, 200, 100, 5, 5, { fill: '#ffffff', stroke: 'orange', lineWidth:5 });

    rect.addChild(animalCellNode);
    rect.addChild(plantCellNode);

    Node.call(objectKit);

    objectKit.addChild(rect);

  }

  return inherit ( Node, ObjectKit);

});
