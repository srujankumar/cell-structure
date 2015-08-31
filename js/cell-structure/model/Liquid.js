define(function (require) {
    'use strict';

    // modules
    var inherit = require('PHET_CORE/inherit');
    var PropertySet = require('AXON/PropertySet');

    function Liquid(properties) {
        var defaults = {location: '', text: '', size: '', visibility: true, color: '#fff'};
        var values = _.merge(defaults, properties);
        PropertySet.call(this, values);
        this.type = "liquid";

        this.onDragEnd = function () {
            //CS.model.liquidKit.removeChild(this);

            CS.onDrop(this);
            this.reset();
        };
    }

    return inherit(PropertySet, Liquid);
});
