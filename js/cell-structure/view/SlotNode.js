define(function (require) {
    'use strict';

    // modules
    var Image = require('SCENERY/nodes/Image');
    var inherit = require('PHET_CORE/inherit');
    var Node = require('SCENERY/nodes/Node');
    var Vector2 = require('DOT/Vector2');
    var Dimension2 = require('DOT/Dimension2');
    var SimpleDragHandler = require('SCENERY/input/SimpleDragHandler');
    var Rectangle = require('SCENERY/nodes/Rectangle');
    var TextPushButton = require('SUN/buttons/TextPushButton');
    var PhetFont = require('SCENERY_PHET/PhetFont');
    var DropNode = require('CELL_STRUCTURE/cell-structure/view/DropNode');

    function SlotNode(model, modelViewTransform) {
        var pos = modelViewTransform.modelToViewPosition(model.location);

        Node.call(this, {
            cursor: 'pointer',
            x: pos.x,
            y: pos.y
        });

        model.childProperty.link(function(child) {
            this.removeAllChildren();
            if (!child) return;

            var view = CS.views[child.constructor.name];
            var viewNode = new view(child, modelViewTransform);
            this.addChild(viewNode);
        }.bind(this));

        this.scale(1, 1);

        CS.addDroppable(this);
        this.onReceiveDrop = model.setChild;
    }
    return inherit(Node, SlotNode);
});
