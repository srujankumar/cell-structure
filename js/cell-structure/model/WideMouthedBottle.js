define(function(require) {
    'use strict';

    var inherit = require('PHET_CORE/inherit');
    var PropertySet = require('AXON/PropertySet');
    var Apparatus = require('CELL_STRUCTURE/cell-structure/model/Apparatus');
    var bottleImage = require('image!CELL_STRUCTURE/wide-mouthed-bottle.svg');
    var corkWithLeafImage = require('image!CELL_STRUCTURE/cork-with-leaf.svg');
    var Dimension2 = require('DOT/Dimension2');
    var Vector2 = require('DOT/Vector2');

    function WideMouthedBottle(location, size) {
        Apparatus.call(this, {
            location: new Vector2(300, 300),
            size: new Dimension2(80, 80),
            visibility: true,
            liquid: null,
            cell: null,
            corkOpen: true,
            corkImage: null,
            tableHeight: 507
        });

        this.name = "wide-mouthed-bottle";
        this.image = this.kitImage = bottleImage;

        this.collidesWith = function( model, node, dropListener) {
            if (model.type === "liquid" || (model.type === "cell" && model.cellType === 'Leaf Cell')) {
                var dropListenerBounds = dropListener.getGlobalBounds();
                var nodeBounds = node.getGlobalBounds();
                var locationOffset = 20;
                var nodeLocation = new Vector2( nodeBounds.minX, nodeBounds.minY );
                var dropListenLocation = new Vector2( dropListenerBounds.minX - locationOffset, dropListenerBounds.minY );
                size = new Dimension2( dropListenerBounds.maxX - dropListenerBounds.minX, dropListenerBounds.maxY - dropListenerBounds.minY);

                if (CS.positionDelta( nodeLocation, dropListenLocation, size.width, size.height))
                    this.onReceiveDrop(model);
            }
        };

        var handleLiquid = function(model) {
            if (model.type !== "liquid") return;
            if (!this.corkOpen) return;
            this.liquidProperty.set(model);
            if (this.cell && (typeof this.cell.onDippedInLiquid == "function")) {
                this.cell.onDippedInLiquid(this.liquid);
            }
            return true;
        }.bind(this);

        var handleCell = function(model) {
            if (model.type !== "cell") return;

            if (model.cellType == "Leaf Cell") {
                this.corkImageProperty.set(corkWithLeafImage);
                this.cellProperty.set(model);
                model.visibility = false;
                var location = new Vector2(this.location.x + this.size.width, this.location.y);
                CS.showMessageBox( "Click on the cork for the reaction to take place", true, 5000, location);
            }

            return true;
        }.bind(this);

        this.onReceiveDrop = function(model) {
            handleLiquid(model) || handleCell(model);
        };
        this.onRemove = function() {
            if (this.liquid) this.liquidProperty.set(null);
            if (this.cell) this.cell.reset();
            this.cellProperty.set(null);
            this.corkOpenProperty.set(true);
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

    return inherit(Apparatus, WideMouthedBottle);
});
