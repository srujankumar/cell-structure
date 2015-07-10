// Copyright 2002-2015, University of Colorado Boulder

/**
 *
 * @author Srujan Kumar Bojjam <srujan@swecha.net>
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var Vector2 = require( 'DOT/Vector2' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var MicroscopeNode = require( 'CELL_STRUCTURE/cell-structure/view/MicroscopeNode' );
  var AnimalCellNode = require( 'CELL_STRUCTURE/cell-structure/view/AnimalCellNode' );
  var PlantCellNode = require( 'CELL_STRUCTURE/cell-structure/view/PlantCellNode' );
  var ObjectKit = require( 'CELL_STRUCTURE/cell-structure/view/ObjectKit');
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );
  //var Shape = require( 'KITE/Shape' );
  //var Rectangle = require( 'SCENERY/nodes/Rectangle');

  /**
   * @param {CellStructureModel} cellStructureModel
   * @constructor
   */
  function CellStructureScreenView( cellStructureModel ) {

    var cellStructureScreenView = this;
    ScreenView.call( cellStructureScreenView, { layoutBounds: new Bounds2( 0, 0, 768, 504 ) } );

    // Reset All button
    var resetAllButton = new ResetAllButton( {
      listener: function() {
        cellStructureModel.reset();
      },
      right:  this.layoutBounds.maxX - 10,
      bottom: this.layoutBounds.maxY - 10
    } );

    //var rect = Shape();
    //  rect.roundRect(100,100,50,50,5,5);

    //var rect = new Rectangle(100,100,120,120,5,5, { fill: '#ffffff', stroke: 'orange', lineWidth: 5 });

    // model-view transform
    //var modelViewTransform = ModelViewTransform2.createOffsetScaleMapping( new Vector2( cellStructureScreenView.layoutBounds.width / 2, cellStructureScreenView.layoutBounds.height / 2 ), 1 );

    var modelViewTransform = ModelViewTransform2.createOffsetScaleMapping( new Vector2( 10, 10 ), 1 );

    cellStructureScreenView.addChild( new MicroscopeNode( cellStructureModel.microscope, modelViewTransform ) );

    //cellStructureScreenView.addChild( new AnimalCellNode( cellStructureModel.animalCell, modelViewTransform ) );

    //cellStructureScreenView.addChild( new PlantCellNode( cellStructureModel.plantCell, modelViewTransform ) );
    //var animalCellNode = new AnimalCellNode(model.animalCell, modelViewTransform);

    //cellStructureScreenView.addChild(rect);

    cellStructureScreenView.addChild( new ObjectKit( cellStructureModel, { x:50, y: 350}, modelViewTransform ) );

    cellStructureScreenView.addChild( resetAllButton );
  }

  return inherit( ScreenView, CellStructureScreenView, {

    //TODO Called by the animation loop. Optional, so if your view has no animation, please delete this.
    step: function( dt ) {
      //TODO Handle view animation here.
    }
  } );
} );