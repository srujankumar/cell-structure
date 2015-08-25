define( function( require ) {
  'use strict';

  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Apparatus = require( 'CELL_STRUCTURE/cell-structure/model/Apparatus');
  var Drop = require( 'CELL_STRUCTURE/cell-structure/model/Drop');
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );

  var fillerImage = require( 'image!CELL_STRUCTURE/filler.svg' );

  function Filler( location, size ) {
    Apparatus.call( this, { location: null, size: new Dimension2( 50, 80 ), visibility: true, liquid: null, cell: null} );
    this.image = this.kitImage = fillerImage;
    CS.addDroppable(this);
    this.onDragEnd = function() {
      CS.onDrop(this);
    };

    var handleLiquid = function(model) {
      if(model.type !== "liquid") return;
      console.log('liquid:');
      this.liquidProperty.set(model);
      this.drop.colorProperty.set(model.color);
      return true;
    }.bind(this);

    var handleCell = function(model) {
      if(model.type !== "cell") return;
      console.log('cell');
      this.cellProperty.set(model);
      model.attachedToProperty.set(this);
      return true;
    }.bind(this);

    this.onReceiveDrop = function(model) {
      handleLiquid(model) || handleCell(model);
    };
    this.onRemove = function() {
      this.liquidProperty.set(null);
    };

    this.collidesWith = function(model) {
      var areaUnderFiller = new Vector2(this.location.x, 430);
      var size = new Dimension2(200, 200);
      if(model.type == "liquid") {
        areaUnderFiller = new Vector2(this.location.x, this.location.y);
        size = new Dimension2(this.size.width, this.size.height);
      }
      if(CS.positionDelta( model.location, areaUnderFiller, size.width, size.height))
        this.onReceiveDrop(model);
    };

    this.drop = new Drop({location: new Vector2(50, 200)});

    this.onKnobPressed = function() {
      var intervalId = window.setInterval(function() {
        if(!(this.cell && this.liquid)) {
          window.clearInterval(intervalId);
          this.drop.locationProperty.set(new Vector2(50, 300));
          return;
        }
        if(this.drop.location.y + 160 > this.cell.location.y) {
          window.clearInterval(intervalId);
          this.drop.locationProperty.set(new Vector2(50, 300));
          if(typeof this.cell.onLiquidDropped == "function") {
            this.cell.onLiquidDropped(this.liquid);
          }
          return;
        }
        this.drop.locationProperty.set(new Vector2(this.drop.location.x, this.drop.location.y + 10));
      }.bind(this), 100);
    }.bind(this);

    this.onChildRemoved = function(child) {
      this.cellProperty.set(null);
    };
  }

  return inherit( Apparatus, Filler );
} );
