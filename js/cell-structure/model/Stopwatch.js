define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Apparatus = require( 'CELL_STRUCTURE/cell-structure/model/Apparatus');
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );
  var stopWatchImage = require( 'image!CELL_STRUCTURE/stop-watch.svg' );

  function Stopwatch( callback ) {
    Apparatus.call( this, { location: new Vector2(300, 300), size: new Dimension2( 80, 80 ), visibility: true, liquid: null, cell: null, time: 120} );
    this.image = this.kitImage = stopWatchImage;
    this.onDragEnd = function() {
      CS.onDrop(this);
    };

    this.onRemove = function() {
    };

    this.onChildRemoved = function(child) {
    };

    this.startTimer = function() {
      var oldTime = this.time;
      var ttc = 5; // completes in 5 secs
      var interval = ttc * 1000 / this.time;
      var id = window.setInterval(function() {
        this.timeProperty.set(this.time - 1);
        if(this.time < 0) {
          clearInterval(id);
          callback();
          this.timeProperty.set(oldTime);
        }
      }.bind(this), interval);
    };
    this.startTimer();
  }

  return inherit( Apparatus, Stopwatch );
} );
