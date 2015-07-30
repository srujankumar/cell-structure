/**
 *
 * @author Srujan Kumar Bojjam ( BalaSwecha )
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
  var MagnifierViewNode = require( 'CELL_STRUCTURE/cell-structure/view/MagnifierViewNode' );
  var ObjectKit = require( 'CELL_STRUCTURE/cell-structure/view/ObjectKit');
  var ResetAllButton = require( 'SCENERY_PHET/buttons/ResetAllButton' );

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

    var modelViewTransform = ModelViewTransform2.createOffsetScaleMapping( new Vector2( 10, 10 ), 1 );

    cellStructureScreenView.addChild( new MicroscopeNode( cellStructureModel.microscope, modelViewTransform ) );
    cellStructureScreenView.addChild( new ObjectKit( cellStructureModel, { x:50, y: 350}, modelViewTransform ) );
    cellStructureScreenView.addChild( new MagnifierViewNode());


    cellStructureScreenView.addChild( resetAllButton );
  }

  return inherit( ScreenView, CellStructureScreenView, {

    //TODO Called by the animation loop. Optional, so if your view has no animation, please delete this.
    step: function( dt ) {
      //TODO Handle view animation here.
    }
  } );
} );