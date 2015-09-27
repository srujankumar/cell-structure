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
        var tmpSize = this.size;
        this.onDragEnd = function () {
            //CS.model.liquidKit.removeChild(this);
/*
            CS.onDrop(this);
            tmpSize = this.size;
            this.reset();
            this.size = tmpSize;*/
        };
    }

    return inherit(PropertySet, Liquid);
});
