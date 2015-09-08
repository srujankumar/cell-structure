define(function (require) {
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
            size: new Dimension2(80, 80),
            visibility: true,
            liquid: null,
            cell: null
        });
        this.name = "test-tube";
        this.image = this.kitImage = testTubeImage;
        this.onDragEnd = function () {
            CS.addDroppable(this);
            CS.onDrop(this);
        };
        var handleLiquid = function (model) {
            if (model.type !== "liquid") return;
            this.liquidProperty.set(model);
            if (this.cell && (typeof this.cell.onDippedInLiquid == "function")) {
                this.cell.onDippedInLiquid(this.liquid);
            }
            return true;
        }.bind(this);

        this.onReceiveDrop = function (model) {
            handleLiquid(model);
        };

        this.onRemove = function () {
             this.liquidProperty.set(null);
             if(this.cell)
               this.cell.reset();
             this.cellProperty.set(null);
             CS.model.experimentArea.stopStopwatch();
        };

        this.onChildRemoved = function (child) {
            this.cellProperty.set(null);
        };
    }

    return inherit(Apparatus, TestTube);
});
