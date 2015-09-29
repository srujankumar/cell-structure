define(function(require) {
    'use strict';

    var inherit = require('PHET_CORE/inherit');
    var PropertySet = require('AXON/PropertySet');
    var MagnifierView = require('CELL_STRUCTURE/cell-structure/model/MagnifierView');
    var MicroscopeInstrument = require('CELL_STRUCTURE/cell-structure/model/MicroscopeInstrument');
    var Apparatus = require('CELL_STRUCTURE/cell-structure/model/Apparatus');
    var Vector2 = require('DOT/Vector2');
    var Dimension2 = require('DOT/Dimension2');

    function Microscope() {
        Apparatus.call(this, {
            size: new Dimension2(80, 80),
            location: new Vector2(200, 500),
            objectUnderLens: null,
            tableHeight: 440
        });

        this.instrument = new MicroscopeInstrument(new Vector2(0, 50), new Dimension2(150, 150), this);
        this.magnifierView = new MagnifierView(this);

        this.kitImage = this.image = this.instrument.image;

//        CS.addDroppable(this);
        this.onReceiveDrop = function(model) {
            if (model.type !== "cell") return;
            model.attachedToProperty.set(this);
            if (this.objectUnderLens)
                this.objectUnderLens.reset();
            //CS.model.objectKit.addChild(this.objectUnderLens);
            //CS.model.objectKit.removeChild(model);
            this.objectUnderLensProperty.set(model);
        }.bind(this);
        this.onDragEnd = function() {
            CS.onDrop(this);
        };

        this.onRemove = function() {
            CS.model.experimentArea.slots.map(function(slot) {
                if (slot.child == this) {
                    slot.child = null;
                }
            }.bind(this));
            if (!this.objectUnderLens) return;
            this.objectUnderLens.reset();
            this.objectUnderLensProperty.set(null);
        };

        this.onChildRemoved = function(child) {
            this.objectUnderLensProperty.set(null);
        };
    }

    return inherit(Apparatus, Microscope);
});
