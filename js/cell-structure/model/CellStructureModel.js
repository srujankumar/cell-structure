/**
 *
 * @author Srujan Kumar Bojjam <srujan@swecha.net>
 */
define( function( require ) {
  'use strict';

  // modules
  var Cell = require( 'CELL_STRUCTURE/cell-structure/model/Cell' );
  var PlantRootCell = require( 'CELL_STRUCTURE/cell-structure/model/PlantRootCell' );
  var MagnifiedImage = require( 'CELL_STRUCTURE/cell-structure/model/MagnifiedImage' );
  var Microscope = require( 'CELL_STRUCTURE/cell-structure/model/Microscope' );
  var Beaker = require( 'CELL_STRUCTURE/cell-structure/model/Beaker' );
  var Filler = require( 'CELL_STRUCTURE/cell-structure/model/Filler' );
  var Cutter = require( 'CELL_STRUCTURE/cell-structure/model/Cutter' );
  var ExperimentArea = require( 'CELL_STRUCTURE/cell-structure/model/ExperimentArea' );
  var Stopwatch = require( 'CELL_STRUCTURE/cell-structure/model/Stopwatch' );
  var Liquid = require( 'CELL_STRUCTURE/cell-structure/model/Liquid' );
  var Overlay = require( 'CELL_STRUCTURE/cell-structure/model/Overlay' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Kit = require( 'CELL_STRUCTURE/cell-structure/model/Kit');
  var WideMouthedBottle = require( 'CELL_STRUCTURE/cell-structure/model/WideMouthedBottle');

  /**
   * @constructor
   */
  function CellStructureModel() {
    var animalCellIcon = require( 'image!CELL_STRUCTURE/meat.svg' );
    var plantCellIcon = require( 'image!CELL_STRUCTURE/leaf.svg' );
    var animalCellImage = require( 'image!CELL_STRUCTURE/animal-cell-big.png' );
    var plantCellImage = require( 'image!CELL_STRUCTURE/plant-cell-big.png' );
    var onionCellImage = require( 'image!CELL_STRUCTURE/onion-peel-big.jpg' );
    var onionCellImageJanus = require( 'image!CELL_STRUCTURE/onion-peel-big-janus.jpg' );
    var plantCellImageIodine = require( 'image!CELL_STRUCTURE/plant-cell-big-iodine.png' );
    var roughEndoplasmicReticulumImage = require( 'image!CELL_STRUCTURE/rough-endoplasmic-reticulum.jpg' );
    var golgiApparatusImage = require( 'image!CELL_STRUCTURE/golgi-apparatus.png' );
    var onionCellIcon = require( 'image!CELL_STRUCTURE/onion.svg' );

    //models
    var animalCellMagnifiedImage = new MagnifiedImage(animalCellImage, [new Overlay(10, new Vector2(0,0), undefined, this)]);
    var onionCellMagnifiedImage = new MagnifiedImage(onionCellImage, []);
    var roughERMagnifiedImage = new MagnifiedImage(roughEndoplasmicReticulumImage, []);
    var golgiApparatusMagnifiedImage = new MagnifiedImage(golgiApparatusImage, []);

    var plantCellMagnifiedImageIodine = new MagnifiedImage(plantCellImageIodine, []);
    var onionCellMagnifiedImageJanus = new MagnifiedImage(onionCellImageJanus, []);

    var plantCellMagnifiedImage = new MagnifiedImage(plantCellImage, [new Overlay(20, new Vector2(522,490), roughERMagnifiedImage, "Rough ER Magnified Image is rough. <br/>Second line"), new Overlay(30, new Vector2(449,478), golgiApparatusMagnifiedImage)]);

    var animalCell = new Cell( { location: new Vector2( 330, 10 ), size: new Dimension2( 80, 80 ), image: animalCellIcon, magnifiedImage: animalCellMagnifiedImage, parentModel: this } );
    var onionCell = new Cell( { location: new Vector2( 530, 10 ), size: new Dimension2( 80, 80 ), image: onionCellIcon, magnifiedImage: onionCellMagnifiedImage, parentModel: this, magnifiedImageJanus: onionCellMagnifiedImageJanus } );
    var plantCell = new Cell( { location: new Vector2( 430, 10 ), size: new Dimension2( 80, 80 ), image: plantCellIcon, magnifiedImage: plantCellMagnifiedImage, parentModel: this, magnifiedImageIodine: plantCellMagnifiedImageIodine } );
    var plantWithRoots = new PlantRootCell({ location: new Vector2(330, 110), size: new Dimension2( 80, 80 ), magnifiedImage: null, parentModel: this});
    this.objectKit = new Kit({ location: new Vector2(330,10), size: new Dimension2(300,200), children: [ animalCell, plantCell, onionCell, plantWithRoots ]});

    var microscope = new Microscope();
    var beaker = new Beaker();
    var filler = new Filler();
    var cutter = new Cutter();
    var wideMouthedBottle = new WideMouthedBottle();
    this.apparatusKit = new Kit({ location: new Vector2(660,10), size: new Dimension2(300,200), children: [ microscope, beaker, filler, cutter, wideMouthedBottle ]});

    var ammoniaBottle = new Liquid({ location: new Vector2(10,10), text: "Ammonia", color: '#ffff00'});
    var iodineBottle = new Liquid({ location: new Vector2(110,10), text: "Iodine", color: "brown"});
    var janusBottle = new Liquid({ location: new Vector2(210,10), text: "Janus Green B", color: "green"});
    var redWaterBottle = new Liquid({ location: new Vector2(10,110), text: "Red Water", color: "red"});
    this.liquidKit = new Kit({ location: new Vector2(10,10), size: new Dimension2(300,200), children: [ ammoniaBottle, iodineBottle, janusBottle, redWaterBottle ]});
    this.experimentArea = new ExperimentArea({location: new Vector2(10,200), size: new Dimension2(1000,568)});

  }

  return inherit( Object, CellStructureModel, {

    //TODO Called by the animation loop. Optional, so if your model has no animation, please delete this.
    step: function( dt ) {
      //TODO Handle model animation here.
    },
    // Resets all model elements
    reset: function() {
      var children = CS.model.experimentArea.children.map(function(c) { return c;});
      children.forEach( function( model){
        CS.trigger('ApparatusRemoved', model);
      });
    }
  } );
} );
