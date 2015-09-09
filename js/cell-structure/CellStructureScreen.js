define( function( require ) {
  'use strict';

  // modules
  require( 'CELL_STRUCTURE/cell-structure/Environment' );
  var CellStructureModel = require( 'CELL_STRUCTURE/cell-structure/model/CellStructureModel' );
  var CellStructureScreenView = require( 'CELL_STRUCTURE/cell-structure/view/CellStructureScreenView' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Screen = require( 'JOIST/Screen' );

  // strings
  var cellStructureSimString = require('string!CELL_STRUCTURE/cell-structure.name');

  /**
   * @constructor
   */
  function CellStructureScreen() {

    //If this is a single-screen sim, then no icon is necessary.
    //If there are multiple screens, then the icon must be provided here.
    var icon = null;
    CS.model = new CellStructureModel();
  
    Screen.call( this, cellStructureSimString, icon,
      function() { return CS.model; },
      function( model ) { return new CellStructureScreenView( model ); },
      { backgroundColor: 'white' }
    );
  }

  return inherit(Screen, CellStructureScreen);
});
