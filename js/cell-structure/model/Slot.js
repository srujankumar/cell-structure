define(function(require) {
    'use strict';

    // modules
    var inherit = require('PHET_CORE/inherit');
    var PropertySet = require('AXON/PropertySet');
    var Vector2 = require('DOT/Vector2');

    function Slot(properties) {
        var defaults = {
            location: '',
            size: '',
            visibility: true,
            child: null,
            slotno: 0
        };

        var values = _.merge(defaults, properties);
        PropertySet.call(this, values);

        var acceptChild = function(model) {
            if (model.type !== "apparatus") return;
            this.childProperty.set(model);
            CS.model.apparatusKit.removeChild(model);
        }.bind(this);

        this.setChild = function(model) {
            if (!this.childProperty.get())
                acceptChild(model);
            else
                return false;
            return true;
        }.bind(this);
    }

    return inherit(PropertySet, Slot);
});
