define(function(require) {
    'use strict';

    // modules
    var Image = require('SCENERY/nodes/Image');
    var inherit = require('PHET_CORE/inherit');
    var Node = require('SCENERY/nodes/Node');
    var Display = require('SCENERY/display/Display');
    var Vector2 = require('DOT/Vector2');
    var Dimension2 = require('DOT/Dimension2');
    var SimpleDragHandler = require('SCENERY/input/SimpleDragHandler');
    var Rectangle = require('SCENERY/nodes/Rectangle');
    var TextPushButton = require('SUN/buttons/TextPushButton');
    var PhetFont = require('SCENERY_PHET/PhetFont');
    var standImage = require('image!CELL_STRUCTURE/stand.svg');
    var gauzeImage = require('image!CELL_STRUCTURE/gauze.svg');
    var burnerImage = require('image!CELL_STRUCTURE/burner-kit.svg');

    function BurnerKitNode(model, modelViewTransform) {
        model.size = new Dimension2(200, 200);
        model.standImage = new Image(standImage, {
            x: 10,
            y: 10,
            scale: 0.2
        });
        model.gauzeImage = new Image(gauzeImage, {
            x: 10,
            y: 0
        });
        model.gauzeImage.scale(0.25, 0.2);
        model.standImage.scale(0.5, 0.6);
        model.burnerImage = new Image(burnerImage, {
            x: 35,
            y: 30
        });
        model.burnerImage.scale(0.5,0.5);
        Node.call(this, {
            cursor: 'pointer',
            x: model.location.x,
            y: model.location.y
        });

        var image = new Image(model.image, {
            x: 0,
            y: 0
        });

        function makeDraggable(image) {
            image.addInputListener(new SimpleDragHandler({
                allowTouchSnag: true,

                translate: function(args) {
                    model.location = modelViewTransform.viewToModelPosition(args.position);
                    var newPositionVector = modelViewTransform.modelToViewPosition(model.location);
                    image.translation = newPositionVector;
                    if (model.standImage === image) {
                        removeButton.translation = new Vector2(newPositionVector.x - 10, newPositionVector.y - 10);
                    }
                }
            }));
        }

        //makeDraggable(model.standImage);
        //makeDraggable(model.burnerImage);
        //makeDraggable(model.gauzeImage);
        this.addChild(model.standImage);
        this.addChild(model.gauzeImage);
        this.addChild(model.burnerImage);

        var removeButton = new TextPushButton("X", {
            font: new PhetFont(12),
            baseColor: 'yellow',
            x: 0,
            y: 0,
            listener: function() {
                CS.trigger('ApparatusRemoved', model);
            }
        });
        this.addChild(removeButton);

        //this.scale(modelViewTransform.modelToViewDeltaX(model.size.width) / this.width,
        //  modelViewTransform.modelToViewDeltaY(model.size.height) / this.height);
    }

    return inherit(Node, BurnerKitNode);
});
