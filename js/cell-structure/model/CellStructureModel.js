// Copyright 2002-2015, University of Colorado Boulder

/**
 *
 * @author Srujan Kumar Bojjam <srujan@swecha.net>
 */
define( function( require ) {
  'use strict';

  // modules
  var Microscope = require( 'CELL_STRUCTURE/cell-structure/model/Microscope' );
  var AnimalCell = require( 'CELL_STRUCTURE/cell-structure/model/AnimalCell' );
  var PlantCell = require( 'CELL_STRUCTURE/cell-structure/model/PlantCell' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );
  var inherit = require( 'PHET_CORE/inherit' );
  //var PropertySet = require( 'AXON/PropertySet' );

  /**
   * @constructor
   */
  function CellStructureModel() {

    //PropertySet.call( this, {} );

    //models
    this.microscope = new Microscope( new Vector2( 600, 300 ), new Dimension2( 200, 200 ), 0 );
    this.animalCell = new AnimalCell( new Vector2( 50, 350 ), new Dimension2( 80, 80 ));
    this.plantCell = new PlantCell( new Vector2( 150, 350 ), new Dimension2( 80, 80 ));

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