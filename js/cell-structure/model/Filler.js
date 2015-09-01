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
      this.liquidProperty.set(model);
      this.drop.colorProperty.set(model.color);
      return true;
    }.bind(this);

    var handleCell = function(model) {
      if(model.type !== "cell") return;
      if(this.cell){
        this.cell.reset();
      }
      this.cellProperty.set(model);
      model.attachedToProperty.set(this);
      model.sizeProperty.set(new Dimension2(50,50));
      model.locationProperty.set( new Vector2(50,495));
      return true;
    }.bind(this);

    this.onReceiveDrop = function(model) {
      handleLiquid(model) || handleCell(model);
    };
    this.onRemove = function() {
      this.liquidProperty.set(null);
      this.drop.reset();
      this.cell.reset();
      this.cellProperty.set(null);
    };

    this.collidesWith = function(model) {
      //Filler's listening area should start from 100points left from the beginning of
      //Filler
      var locationOffset = 100;
      var dropListenLocation = new Vector2(this.location.x - locationOffset, 430);
      var size = new Dimension2(200, 200);
      if(model.type == "liquid") {
        dropListenLocation = new Vector2(this.location.x - 20, this.location.y);
        size = new Dimension2(this.size.width, this.size.height);
      }
      if(CS.positionDelta( model.location, dropListenLocation, size.width, size.height))
        this.onReceiveDrop(model);
    };

    this.drop = new Drop({location: new Vector2(15, 120)});

    this.onKnobPressed = function() {
      var intervalId = window.setInterval(function() {
        if(!(this.cell && this.liquid)) {
          window.clearInterval(intervalId);
          this.drop.locationProperty.set(new Vector2(15, 120));
          return;
        }
        if(this.drop.location.y + 295 > this.cell.location.y) {
          window.clearInterval(intervalId);
          this.drop.locationProperty.set(new Vector2(15, 120));
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
