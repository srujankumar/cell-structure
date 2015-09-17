define(function(require) {
    'use strict';

    var inherit = require('PHET_CORE/inherit');
    var PropertySet = require('AXON/PropertySet');
    var Apparatus = require('CELL_STRUCTURE/cell-structure/model/Apparatus');
    var beakerImage = require('image!CELL_STRUCTURE/beaker.svg');
    var Dimension2 = require('DOT/Dimension2');
    var Vector2 = require('DOT/Vector2');

    function Beaker(location, size) {
        Apparatus.call(this, {
            location: new Vector2(300, 400),
            size: new Dimension2(80, 80),
            visibility: true,
            liquid: null,
            cell: null
        });
        this.name = "beaker";
        this.image = this.kitImage = beakerImage;
        this.onDragEnd = function() {
            CS.onDrop(this);
            CS.addDroppable(this);
        };

        var handleLiquid = function(model) {
            if (model.type !== "liquid") return;
            this.liquidProperty.set(model);
            if (this.cell && (typeof this.cell.onDippedInLiquid == "function")) {
                this.cell.onDippedInLiquid(this.liquid);
            }
            return true;
        }.bind(this);

        var handleCell = function(model) {
            if (model.type !== "cell") return;
            if (this.cell) this.cell.reset();
            if (this.liquid && (typeof model.onDippedInLiquid == "function")) {
                if (model.onDippedInLiquid(this.liquid)) {
                    this.cellProperty.set(model);
                    model.locationProperty.set(new Vector2(260, 475));
                    model.size = new Dimension2(50, 50);
                    model.attachedToProperty.set(this);
                } else {
                    model.reset();
                    var location = new Vector2(this.location.x + this.size.width, this.location.y);
                    CS.showMessageBox(model.cellType + " does not react with " + this.liquid.text, true, 5000, location);
                }
            }
            return true;
        }.bind(this);

        this.onReceiveDrop = function(model) {
            handleLiquid(model) || handleCell(model);
        };
        this.onRemove = function() {
            this.liquidProperty.set(null);
            if (this.cell)
                this.cell.reset();
            this.cellProperty.set(null);
            CS.model.experimentArea.slots.map(function(slot) {
                if (slot.child == this) {
                    slot.child = null;
                }
            }.bind(this));
            CS.model.experimentArea.stopStopwatch();
        };

        this.onChildRemoved = function(child) {
            this.cellProperty.set(null);
        };
    }

    return inherit(Apparatus, Beaker);
});
