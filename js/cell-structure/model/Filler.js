define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Apparatus = require( 'CELL_STRUCTURE/cell-structure/model/Apparatus');
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );

  var fillerImage = require( 'image!CELL_STRUCTURE/filler.svg' );

  function Filler( location, size ) {
    Apparatus.call( this, { location: null, size: new Dimension2( 50, 80 ), visibility: true, liquid: null} );
    this.image = this.kitImage = fillerImage;
    this.onDragEnd = function() {
      CS.model.apparatusKit.removeChild(this);
      CS.addDroppable(this);
      CS.onDrop(this);
    };

    this.onReceiveDrop = function(model) {
      console.log('got it');
      if(model.type !== "liquid") return;
      this.liquidProperty.set(model);
    };
    this.onRemove = function() {
      this.liquidProperty.set(null);
    };

    this.collidesWith = function(model) {
      var areaUnderFiller = new Vector2(this.location.x, 330);
      var size = new Dimension2(200, 200);
      if(model.type == "liquid") {
        areaUnderFiller = new Vector2(this.location.x, this.location.y);
        size = new Dimension2(this.size.width, this.size.height);
      }
      return CS.positionDelta( model.location, areaUnderFiller, size.width, size.height)
    };
  }

  return inherit( Apparatus, Filler );
} );
