define(function(require) {
    'use strict';

    var inherit = require('PHET_CORE/inherit');
    var PropertySet = require('AXON/PropertySet');
    var Apparatus = require('CELL_STRUCTURE/cell-structure/model/Apparatus');
    var burnerKitImage = require('image!CELL_STRUCTURE/burner-kit.svg');
    var Dimension2 = require('DOT/Dimension2');
    var Vector2 = require('DOT/Vector2');

    function BurnerKit(location, size) {
        Apparatus.call(this, {
            location: new Vector2(300, 300),
            size: new Dimension2(80, 80),
            acceptedModels: ["beaker"],
            image: burnerKitImage,
            visibility: true,
            standImage: null,
            gauzeImage: null,
            burnerImage: null,
            tableHeight: 560
        });

        this.name = "burner kit";
        this.image = this.kitImage = burnerKitImage;

        this.onReceiveDrop = function(model) {
            model.sizeProperty.set(new Dimension2(100, 100));
            model.locationProperty.set(new Vector2(this.location.x, this.location.y - 100));
        };

        this.collidesWith = function(model) {
            if (model.type === "apparatus" && model.name === "beaker") {
                var dropListenLocation = new Vector2(this.location.x - 50, this.location.y - 200);
                size = new Dimension2(this.size.width, this.size.height);
                if (CS.positionDelta(model.location, dropListenLocation, size.width, size.height))
                    this.onReceiveDrop(model);
            }
        };

        this.onRemove = function() {
            CS.model.experimentArea.slots.map(function(slot) {
                if (slot.child == this) {
                    slot.child = null;
                }
            }.bind(this));
            this.attachedToProperty.set(null);
        };
    }

    return inherit(Apparatus, BurnerKit);
});
