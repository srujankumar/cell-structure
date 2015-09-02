define(function (require) {
    'use strict';

    var inherit = require('PHET_CORE/inherit');
    var PropertySet = require('AXON/PropertySet');
    var Apparatus = require('CELL_STRUCTURE/cell-structure/model/Apparatus');
    var beakerImage = require('image!CELL_STRUCTURE/wide-mouthed-bottle.svg');
    var Dimension2 = require('DOT/Dimension2');
    var Vector2 = require('DOT/Vector2');

    function WideMouthedBottle(location, size) {
        Apparatus.call(this, {
            location: new Vector2(300, 300),
            size: new Dimension2(80, 80),
            visibility: true,
            liquid: null,
            cell: null,
            cork: null
        });
        this.name = "wide-mouthed-bottle";
        this.image = this.kitImage = beakerImage;
        this.onDragEnd = function () {
            CS.onDrop(this);
            CS.addDroppable(this);

        };

        var handleLiquid = function (model) {
            if (model.type !== "liquid") return;
            this.liquidProperty.set(model);
            if (this.cell && (typeof this.cell.onDippedInLiquid == "function")) {
                this.cell.onDippedInLiquid(this.liquid);
            }
            return true;
        }.bind(this);

        var handleCell = function (model) {
            if (model.type !== "cell") return;
            if (this.cell) this.cell.reset();
            if (this.liquid && (typeof model.onDippedInLiquid == "function")) {
                if(model.onDippedInLiquid(this.liquid)) {
                    this.cellProperty.set(model);
                    model.locationProperty.set(new Vector2(260, 475));
                    model.size = new Dimension2(50, 50);
                    model.attachedToProperty.set(this);
                }else {
                    model.reset();
                }
            }
            return true;
        }.bind(this);

        var handleCork = function(cork) {
            if(cork.name !== "cork") return;
            this.corkProperty.set(cork);
            console.log('hello');
            cork.locationProperty.set(new Vector2(300, 300));
        }.bind(this);

        this.onReceiveDrop = function (model) {
            handleLiquid(model) || handleCell(model) || handleCork(model);
        };
        this.onRemove = function () {
            this.liquidProperty.set(null);
            this.cell.reset();
            this.cellProperty.set(null);
            CS.model.experimentArea.stopStopwatch();
        };

        this.onChildRemoved = function (child) {
            this.cellProperty.set(null);
        };
    }

    return inherit(Apparatus, WideMouthedBottle);
});
