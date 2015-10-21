define(function(require) {
    'use strict';

    var inherit = require('PHET_CORE/inherit');
    var PropertySet = require('AXON/PropertySet');
    var Apparatus = require('CELL_STRUCTURE/cell-structure/model/Apparatus');
    var testTubeImage = require('image!CELL_STRUCTURE/test-tube.svg');
    var Dimension2 = require('DOT/Dimension2');
    var Vector2 = require('DOT/Vector2');

    function TestTube(location, size) {
        Apparatus.call(this, {
            location: new Vector2(300, 300),
            size: new Dimension2(80, 100),
            visibility: true,
            liquid: null,
            cell: null,
            tableHeight: 400
        });
        this.name = "test-tube";
        this.image = this.kitImage = testTubeImage;
        var handleLiquid = function(model) {
            if (model.type !== "liquid") return;
            this.liquidProperty.set(model);
            if (this.cell && (typeof this.cell.onDippedInLiquid == "function")) {
                this.cell.onDippedInLiquid(this.liquid);
            }
            return true;
        }.bind(this);

/*        this.collidesWith = function(model) {
            if (model.type === "liquid") {
                var dropListenLocation = new Vector2(this.location.x - 50, this.location.y - 50);
                size = new Dimension2(this.size.width, this.size.height);

                if (CS.positionDelta(model.location, dropListenLocation, size.width, size.height))
                    this.onReceiveDrop(model);
            }
        }.bind(this);*/

        this.onReceiveDrop = function(model) {
            handleLiquid(model);
        };

        this.onRemove = function() {
            this.liquidProperty.set(null);
            if (this.cell) {
                this.cell.reset();
                this.cellProperty.set(null);
            }
            this.attachedToProperty.set(null);
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

    return inherit(Apparatus, TestTube);
});
