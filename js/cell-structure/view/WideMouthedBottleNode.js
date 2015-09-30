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
    var TextPushButton = require('SUN/buttons/TextPushButton');
    var PhetFont = require('SCENERY_PHET/PhetFont');
    var corkImage = require('image!CELL_STRUCTURE/cork.svg');
    var blueBlackLeaf = require('image!CELL_STRUCTURE/leaf-blue-black.svg');
    var DownUpListener = require('SCENERY/input/DownUpListener');

    function WideMouthedBottleNode(model, modelViewTransform) {
        model.size = new Dimension2(98, 150);

        Node.call(this, {
            cursor: 'pointer',
            x: 0,
            y: 0
        });

        var replaceCorkImage = function( newImage) {
            this.removeChild(corkNode);

            corkNode = new Image(newImage, {
                x: 25,
                y: -30
            });
            this.addChild(corkNode);

            corkNode.addInputListener(new DownUpListener({
                up: function() {
                    model.corkOpenProperty.set(!model.corkOpen);
                }
            }));

            redraw();
        }.bind(this);

        var image = new Image(model.image, {
            x: 0,
            y: 0
        });
        //this.addChild(image);

        var removeButton = new TextPushButton("X", {
            font: new PhetFont(10),
            baseColor: 'yellow',
            x: 0,
            y: 0,
            listener: function() {
                CS.trigger('ApparatusRemoved', { model: model, node: this });
            }.bind(this)
        });
        this.addChild(removeButton);

        var corkNode = new Image(corkImage, {
            x: 25,
            y: -30
        });
        model.corkImageProperty.set(corkImage);

        var onTimeout = function() {
            replaceCorkImage(corkImage);

            model.cell.visibility = true;
            model.cell.locationProperty.set(new Vector2( model.attachedTo.slotno * 250 + 75, 400));
            model.cell.co2removed = true;
        };

        var onCorkOpen = function(corkOpen) {
            corkNode.y = corkOpen ? -30 : 10;

            if (!corkOpen && model.cell && model.liquid) {
                if (model.cell.cellTypeProperty.get() === "Leaf Cell" && model.liquid.textProperty.get() === "KOH") {
                    CS.model.experimentArea.createStopwatch(onTimeout);
                    var location = new Vector2(model.location.x + (2 * model.size.width), model.location.y - (model.size.height / 2));
                    CS.showMessageBox("Potassium hydroxide absorbs carbon dioxide", true, 2000, location);
                }
            }
        };
        model.corkOpenProperty.link( onCorkOpen);

        var liquidNode;
        var redraw = function() {
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

        model.corkImageProperty.link( replaceCorkImage);

        model.liquidProperty.link( redraw);

        this.scale(modelViewTransform.modelToViewDeltaX(model.size.width) / this.width,
            modelViewTransform.modelToViewDeltaY(model.size.height) / this.height);

        this.setLeft(50);
        this.setBottom(350);
        CS.addDropListener(this);

        this.unregisterObservers = function() {
            model.corkOpenProperty.unlink( onCorkOpen);
            model.corkImageProperty.unlink( replaceCorkImage);
            model.liquidProperty.unlink( redraw);
            CS.removeDropListener(this);
        };

        this.onReceiveDrop = model.onReceiveDrop;
        this.collidesWith = model.collidesWith;
    }

    return inherit(Node, WideMouthedBottleNode);
});
