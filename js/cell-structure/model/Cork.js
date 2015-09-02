define(function (require) {
    'use strict';

    var inherit = require('PHET_CORE/inherit');
    var PropertySet = require('AXON/PropertySet');
    var Apparatus = require('CELL_STRUCTURE/cell-structure/model/Apparatus');
    var corkImage = require('image!CELL_STRUCTURE/cork.svg');
    var Dimension2 = require('DOT/Dimension2');
    var Vector2 = require('DOT/Vector2');

    function Cork(location, size) {
        Apparatus.call(this, {
            location: new Vector2(300, 300),
            size: new Dimension2(80, 80),
            visibility: true,
            cell: null
        });
        this.name = "cork";
        this.image = this.kitImage = corkImage;
        this.onDragEnd = function () {
            CS.onDrop(this);
        }.bind(this);

        var handleCell = function (model) {
            if (model.type !== "cell") return;
            if (this.cell) this.cell.reset();
            this.cellProperty.set(model);
            return true;
        }.bind(this);

        this.onReceiveDrop = function (model) {
            handleCell(model);
        };
        this.onRemove = function () {
            this.cell.reset();
            this.cellProperty.set(null);
        };

        this.onChildRemoved = function (child) {
            this.cellProperty.set(null);
        };
    }

    return inherit(Apparatus, Cork);
});
