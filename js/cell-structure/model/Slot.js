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
            child: null
        };

        var values = _.merge(defaults, properties);
        PropertySet.call(this, values);

        var acceptChild = function(model) {
            model.locationProperty.set(new Vector2(0, model.tableHeight));
            this.childProperty.set(model);
        }.bind(this);

        this.setChild = function(model) {
            if (!this.childProperty.get())
                acceptChild(model);
            else if (_.contains(this.childProperty.get().acceptedModels, model.name))
                acceptChild(model);
            else
                return false;
            return true;
        }.bind(this);
    }

    return inherit(PropertySet, Slot);
});
