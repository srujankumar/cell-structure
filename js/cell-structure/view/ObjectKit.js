/**
 * Created by srujan on 8/7/15.
 */
define( function( require ) {
  'use strict';
  var HBox = require( 'SCENERY/nodes/HBox');
  var inherit = require( 'PHET_CORE/inherit' );
  var Panel = require( 'SUN/Panel' );
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton');
  var AnimalCellNode = require( 'CELL_STRUCTURE/cell-structure/view/AnimalCellNode');
  var PlantCellNode = require( 'CELL_STRUCTURE/cell-structure/view/PlantCellNode');
  //var Image = require( 'SCENERY/nodes/Image' );
  //var ObjectNode = require( 'CELL_STRUCTURE/cell-structure/view/ObjectNode');
  var Rectangle = require( 'SCENERY/nodes/Rectangle');
  var Node = require( 'SCENERY/nodes/Node');


  function ObjectKit( model, options, modelViewTransform ) {
    //options = _.extend( {
    //    xMargin: 10,
    //    yMargin: 10,
    //    stroke: 'orange',
    //    lineWidth: 3
    //  },
    //  options );

    var objectKit = this;

    //var animalCellIcon = require( 'image!CELL_STRUCTURE/animal-cell-small.png');
    //var animalCellIconNode = new ObjectNode(animalCellIcon);

    //var animalCellNode = new AnimalCellNode(model.animalCell, modelViewTransform);
    var plantCellNode = new PlantCellNode(model.plantCell, modelViewTransform);
    var animalCellNode = new AnimalCellNode(model.animalCell, modelViewTransform);

    var rect = new Rectangle( options.x, options.y, 200, 100, 5, 5, { fill: '#ffffff', stroke: 'orange', lineWidth:5 });


    //var resetAllButton = new ResetAllButton( { listener: function() { model.reset(); } } );

    // The contents of the object kit
    //var content = new HBox( { align: 'center', spacing: 10, children: [ animalCellNode, plantCellNode ] } );

    rect.addChild(animalCellNode);
    rect.addChild(plantCellNode);
    //Panel.call( this, content, options );
    Node.call(objectKit);
    objectKit.addChild(rect);

    // Scale it so it matches the model width and height
    //animalCellNode.scale( modelViewTransform.modelToViewDeltaX( animalCell.size.width ) / this.width,
    //  modelViewTransform.modelToViewDeltaY( animalCell.size.height ) / this.height );

  }

  //return inherit( Panel, ObjectKit );
  return inherit ( Node, ObjectKit);

});