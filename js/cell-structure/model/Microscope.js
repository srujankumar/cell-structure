define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var MagnifierView = require( 'CELL_STRUCTURE/cell-structure/model/MagnifierView' );
  var MicroscopeInstrument = require( 'CELL_STRUCTURE/cell-structure/model/MicroscopeInstrument' );
  var Apparatus = require( 'CELL_STRUCTURE/cell-structure/model/Apparatus' );
  var Vector2 = require( 'DOT/Vector2' );
  var Dimension2 = require( 'DOT/Dimension2' );

  function Microscope() {
    Apparatus.call( this, {size: new Dimension2( 50, 50 ), location: new Vector2(675,365), objectUnderLens: null } );

    this.instrument = new MicroscopeInstrument( new Vector2( -200, 0 ), new Dimension2( 200, 200 ), this );
    this.magnifierView = new MagnifierView(this);

    this.kitImage = this.image = this.instrument.image;

    CS.addDroppable(this);
    this.onReceiveDrop = function(model) {
      if(model.type !== "cell") return;
      this.objectUnderLensProperty.set(model);
    };
    this.onDragEnd = function() {
      CS.model.apparatusKit.removeChild(this);
      CS.onDrop(this);
    };

    this.onRemove = function() {
      this.objectUnderLensProperty.set(null);
    };
  }

  return inherit( Apparatus, Microscope );
} );
