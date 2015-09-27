/*
 Kit which holds animal cell, plant cell, etc
 */
define(function(require) {
    'use strict';
    var inherit = require('PHET_CORE/inherit');
    var Rectangle = require('SCENERY/nodes/Rectangle');
    var Image = require('SCENERY/nodes/Image');
    var Node = require('SCENERY/nodes/Node');
    var table = require('image!CELL_STRUCTURE/table.svg');
    var StopwatchNode = require('CELL_STRUCTURE/cell-structure/view/StopwatchNode');
    var SlotNode = require('CELL_STRUCTURE/cell-structure/view/SlotNode');

    function ExperimentAreaNode(model, modelViewTransform) {
        Node.call(this, {
            x: modelViewTransform.modelToViewDeltaX(model.location.x),
            y: modelViewTransform.modelToViewDeltaY(model.location.y)
        } );

        var image = new Image(table, {
            left: 0,
            bottom: modelViewTransform.modelToViewDeltaY(model.size.height)
//            x: model.location.x,
 //           y: model.location.y
        });
        image.scale(modelViewTransform.modelToViewDeltaX(model.size.width) / image.width,
            modelViewTransform.modelToViewDeltaY( 118) / image.height);
        this.addChild(image);

        this.scale(1, 1);

        model.slots.forEach(function(slot) {
            this.addChild(new SlotNode(slot, modelViewTransform));
        }.bind(this));

        model.onRemoveChild = function(index) {
            this.removeChildAt(index + 1);
        }.bind(this);

        var stopwatchNode;
        model.stopwatchProperty.link(function(stopwatch) {
            if (!stopwatch) {
                if (stopwatchNode) {
                    this.removeChild(stopwatchNode);
                }
                return;
            }
            stopwatchNode = new StopwatchNode(stopwatch, modelViewTransform);
            this.addChild(stopwatchNode);
        }.bind(this));
    }


    return inherit(Node, ExperimentAreaNode);

});
