define(function (require) {
    'use strict';

    // modules
    var inherit = require('PHET_CORE/inherit');
    var Node = require('SCENERY/nodes/Node');
    var Rectangle = require('SCENERY/nodes/Rectangle');

    function SlotNode(model, modelViewTransform) {
        var pos = modelViewTransform.modelToViewPosition(model.location);

        Node.call(this, {
            cursor: 'pointer',
            x: pos.x,
            y: pos.y
        });

        var rect = new Rectangle( 0, 0, model.size.width, model.size.height, 0, 0, { fill: "transparent", lineWidth: 2, stroke: "#000000" });
        this.addChild(rect);
        model.childProperty.link(function(child) {
            rect.removeAllChildren();
            if (!child) return;

            var view = CS.views[child.constructor.name];
            var viewNode = new view(child, modelViewTransform);
            rect.addChild(viewNode);
            debugger;
            viewNode.setLeft(50);
            viewNode.setBottom(350);
        });

        this.scale(modelViewTransform.modelToViewDeltaX(model.size.width) / this.width,
          modelViewTransform.modelToViewDeltaY(model.size.height) / this.height);

        CS.addDropListener(this);
        this.onReceiveDrop = model.setChild;
    }
    return inherit(Node, SlotNode);
});
