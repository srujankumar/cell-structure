define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var cutterImage = require( 'image!CELL_STRUCTURE/cutter.svg' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );

  function Cutter( location, size ) {
    PropertySet.call( this, { location: new Vector2(300, 300), size: new Dimension2( 80, 80 ), visibility: true, cell: null} );
    this.image = this.kitImage = cutterImage;
    this.onDragEnd = function() {
      CS.onDrop(this);
      CS.model.apparatusKit.removeChild(this);
      CS.model.apparatusKit.addChild(this);
    };
  }

  return inherit( PropertySet, Cutter );
} );
