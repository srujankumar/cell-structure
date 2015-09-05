define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Apparatus = require( 'CELL_STRUCTURE/cell-structure/model/Apparatus');
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );
  var stopWatchImage = require( 'image!CELL_STRUCTURE/stop-watch.svg' );

  function Stopwatch( callback ) {
    Apparatus.call( this, { location: new Vector2(300, 300), size: new Dimension2( 80, 80 ), visibility: true, liquid: null, cell: null, time: 0, timeVisible: true} );
    this.image = this.kitImage = stopWatchImage;
    this.onDragEnd = function() {
      CS.onDrop(this);
    };

    this.onRemove = function() {
    };

    this.onChildRemoved = function(child) {
    };

    var blink = function() {
      this.timeVisibleProperty.set(false);
      var count = 4;
      var id = window.setInterval(function() {
        this.timeVisibleProperty.set(!this.timeVisible);
        count--;
        if(count < 0) {
          window.clearInterval(id);
          this.timeVisibleProperty.set(true);
        }
      }.bind(this), 500);
    }.bind(this);

    this.startTimer = function() {
      var oldTime = this.time;
      var ttc = 5; // completes in 5 secs
      var interval = ttc * 1000 / this.time;
      this.intervalId = window.setInterval(function() {
        this.timeProperty.set(this.time - 1);
        if(this.time < 0) {
          clearInterval(this.intervalId);
          callback();
          this.timeProperty.set(0);

          blink();
        }
      }.bind(this), interval);
    };

    this.stopTimer = function() {
      window.clearInterval(this.intervalId);
    }.bind(this);
  }

  return inherit( Apparatus, Stopwatch );
} );
