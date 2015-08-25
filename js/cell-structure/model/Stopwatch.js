define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Apparatus = require( 'CELL_STRUCTURE/cell-structure/model/Apparatus');
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );
  var stopWatchImage = require( 'image!CELL_STRUCTURE/stop-watch.svg' );

  function Stopwatch( callback ) {
    Apparatus.call( this, { location: new Vector2(300, 300), size: new Dimension2( 80, 80 ), visibility: true, liquid: null, cell: null, time: "2:00"} );
    this.image = this.kitImage = stopWatchImage;
    this.onDragEnd = function() {
      CS.onDrop(this);
    };

    this.onRemove = function() {
    };

    this.onChildRemoved = function(child) {
    };
  }

  return inherit( Apparatus, Stopwatch );
} );
