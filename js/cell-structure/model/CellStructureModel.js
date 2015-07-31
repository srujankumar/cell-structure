/**
 *
 * @author Srujan Kumar Bojjam <srujan@swecha.net>
 */
define( function( require ) {
  'use strict';

  // modules
  var Microscope = require( 'CELL_STRUCTURE/cell-structure/model/Microscope' );
  var Cell = require( 'CELL_STRUCTURE/cell-structure/model/Cell' );
  var MagnifierView = require( 'CELL_STRUCTURE/cell-structure/model/MagnifierView' );
  var MagnifiedImage = require( 'CELL_STRUCTURE/cell-structure/model/MagnifiedImage' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );
  var inherit = require( 'PHET_CORE/inherit' );

  /**
   * @constructor
   */
  function CellStructureModel() {
    var animalCellImage = require( 'image!CELL_STRUCTURE/animal-cell-small.png' );
    var plantCellImage = require( 'image!CELL_STRUCTURE/plant-cell-small.png' );

    //models
    var plantCellMagnifiedImage = new MagnifiedImage(plantCellImage);
    var animalCellMagnifiedImage = new MagnifiedImage(animalCellImage);
    this.microscope = new Microscope( new Vector2( 600, 300 ), new Dimension2( 200, 200 ), this );
    this.animalCell = new Cell( { location: new Vector2( 50, 350 ), size: new Dimension2( 80, 80 ), image: animalCellImage, text: "Animal Cell", magnifiedImage: animalCellMagnifiedImage, parentModel: this } );
    this.plantCell = new Cell( { location: new Vector2( 150, 350 ), size: new Dimension2( 80, 80 ), image: plantCellImage, text: "Plant Cell", magnifiedImage: plantCellMagnifiedImage, parentModel: this } );
    this.magnifierView = new MagnifierView();
  }

  return inherit( Object, CellStructureModel, {

    //TODO Called by the animation loop. Optional, so if your model has no animation, please delete this.
    step: function( dt ) {
      //TODO Handle model animation here.
    },
    // Resets all model elements
    reset: function() {
      this.microscope.reset();
      this.animalCell.reset();
      this.plantCell.reset();
    }
  } );
} );
