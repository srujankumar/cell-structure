define(function(require) {
    'use strict';

    // modules
    var Image = require('SCENERY/nodes/Image');
    var inherit = require('PHET_CORE/inherit');
    var Node = require('SCENERY/nodes/Node');
    var Vector2 = require('DOT/Vector2');
    var Dimension2 = require('DOT/Dimension2');
    var SimpleDragHandler = require('SCENERY/input/SimpleDragHandler');
    var Rectangle = require('SCENERY/nodes/Rectangle');
    var kite = require('KITE/kite');
    var TextPushButton = require('SUN/buttons/TextPushButton');
    var PhetFont = require('SCENERY_PHET/PhetFont');
    var Path = require('SCENERY/nodes/Path');

    function TestTubeNode(model, modelViewTransform) {

        model.size = new Dimension2(90, 108);

        Node.call(this, {
            cursor: 'pointer',
            x: model.location.x,
            y: model.location.y
        });

        var image = new Image(model.image, {
            x: 0,
            y: 0,
            scale: 1.2
        });



        // var rectangleLiquid = new kite.Shape.rectangle(0,0,32,89);
        //this.addChild(image);

        var testTubeNodeVar = this;
        this.addInputListener(new SimpleDragHandler({

            // When dragging across it in a mobile device, pick it up
            allowTouchSnag: true,

            // Translate on drag events
            translate: function(args) {
                model.location = modelViewTransform.viewToModelPosition(args.position);
                testTubeNodeVar.translation = modelViewTransform.modelToViewPosition(model.location);
            }
        }));

        var removeButton = new TextPushButton("X", {
            font: new PhetFont(8),
            baseColor: 'yellow',
            x: 0,
            y: 0,
            listener: function() {
                CS.trigger('ApparatusRemoved', model);
            }
        });


        var liquidNode;
        var redraw = function() {
            this.removeChild(image);

            if (liquidNode) {
                this.removeChild(liquidNode);
            }

            this.removeChild(removeButton);

            if (model.liquid) {
                liquidNode = new Rectangle(0, 0, 32, 89, 10, 10, {
                    lineWidth: 0,
                    stroke: '#000',
                    fill: model.liquid.color,
                    x: 10,
                    y: 30
                });
                this.addChild(liquidNode);
            }
            this.addChild(image);
            this.addChild(removeButton);
        }.bind(this);

        model.liquidProperty.link(function() {
            redraw();
        }.bind(this));


        this.addChild(removeButton);

        this.scale(modelViewTransform.modelToViewDeltaX(model.size.width) / this.width,
            modelViewTransform.modelToViewDeltaY(model.size.height) / this.height);

    }

    return inherit(Node, TestTubeNode);
});
