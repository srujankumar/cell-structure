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
    var corkImage = require('image!CELL_STRUCTURE/cork.svg');
    var DownUpListener = require( 'SCENERY/input/DownUpListener' );

    function WideMouthedBottleNode(model, modelViewTransform) {
        model.locationProperty.set(new Vector2(200, 343));
        model.size = new Dimension2(130, 200);

        Node.call(this, {
            cursor: 'pointer',
            x: model.location.x,
            y: model.location.y
        });

        var image = new Image(model.image, {x: 0, y: 0});
        //this.addChild(image);

        var removeButton = new TextPushButton("X", {
            font: new PhetFont(10),
            baseColor: 'yellow',
            x: 0,
            y: 0,
            listener: function () {
                CS.trigger('ApparatusRemoved', model);
            }
        });
        this.addChild(removeButton);

        var corkNode = new Image(corkImage, {x: 25, y: -30});
        corkNode.addInputListener(new DownUpListener({
            up: function() {
                model.corkOpenProperty.set(!model.corkOpen);
            }
        }));
        model.corkOpenProperty.link(function(corkOpen) {
            corkNode.y = corkOpen ? -30 : 10;
        });


        var liquidNode;
        var redraw = function () {
            this.removeChild(image);
            this.removeChild(removeButton);
            this.removeChild(corkNode);

            if (liquidNode) {
                this.removeChild(liquidNode);
            }
            if (model.liquid) {
                liquidNode = new Rectangle(5, 120, 125, 90, 5, 5, {
                    lineWidth: 0,
                    stroke: '#000',
                    fill: model.liquid.color
                });
                this.addChild(liquidNode);
            }
            this.addChild(image);
            this.addChild(removeButton);
            this.addChild(corkNode);
        }.bind(this);

        model.liquidProperty.link(function () {
            redraw();
        }.bind(this));

        this.scale(modelViewTransform.modelToViewDeltaX(model.size.width) / this.width,
                modelViewTransform.modelToViewDeltaY(model.size.height) / this.height);

    }

    return inherit(Node, WideMouthedBottleNode);
});
