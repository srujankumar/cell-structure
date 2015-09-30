define(function (require) {
    'use strict';

    // modules
    var inherit = require('PHET_CORE/inherit');
    var Node = require('SCENERY/nodes/Node');
    var Rectangle = require('SCENERY/nodes/Rectangle');

    function SlotNode(model, modelViewTransform) {

        Node.call(this, {
            cursor: 'pointer',
            x: model.location.x,
            y: model.location.y
        });

        var rect = new Rectangle( 0, 0, model.size.width, model.size.height, 0, 0, { fill: "transparent", lineWidth: 0, stroke: "#000000" });
        this.addChild(rect);
        model.childProperty.link(function(child) {
            rect.removeAllChildren();
            if (!child) return;

            var view = CS.views[child.constructor.name];
            var viewNode = new view(child, modelViewTransform);
            rect.addChild(viewNode);
            child.attachedTo = model;
        }.bind(this));

        this.scale(modelViewTransform.modelToViewDeltaX(model.size.width) / this.width,
          modelViewTransform.modelToViewDeltaY(model.size.height) / this.height);

        CS.addDropListener(this);
        this.onReceiveDrop = model.setChild;
    }
    return inherit(Node, SlotNode);
});
