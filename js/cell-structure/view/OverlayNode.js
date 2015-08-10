define( function( require ) {
  'use strict';

  var Image = require( 'SCENERY/nodes/Image' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var DownUpListener = require( 'SCENERY/input/DownUpListener' );
  var ButtonListener = require( 'SCENERY/input/ButtonListener' );
  var HTMLText = require( 'SCENERY/nodes/HTMLText' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var VBox = require( 'SCENERY/nodes/VBox' );

  function OverlayNode( model, modelViewTransform ) {

    Node.call( this, {
      cursor: 'pointer'
    } );

    // Scale it so it matches the model width and height
    //this.scale( modelViewTransform.modelToViewDeltaX( microscope.size.width ) / this.width,
    //  modelViewTransform.modelToViewDeltaY( microscope.size.height ) / this.height );
    //// Register for synchronization with model.
    //microscope.locationProperty.link( function( location ) {
    //  this.translation = modelViewTransform.modelToViewPosition( location );
    //}.bind(this) );

    var circle = new Circle(model.radius, {x: model.location.x, y: model.location.y, fill: 'transparent', stroke: 'black', lineWidth:3 });
    circle.addInputListener( new DownUpListener( {
      up: function( event ) {
        CS.trigger('MagnifiedImageChanged', model.magnifiedImage);
      }
    } ) );
    var tooltip = new Rectangle(0,-250, 900, 200, 5, 5, {stroke: 'orange', fill: 'white', lineWidth: 5});
    var tooltipText = new HTMLText( model.tooltip, { font: new PhetFont(30), fill: 'orange'});

    var tooltipBox = new VBox( { x: 10, y: -240, align: 'center', spacing: 10, children: [ tooltipText ] } );
    tooltip.addChild(tooltipBox);

    circle.addInputListener( new ButtonListener( {
      over: function(event) {
        if(model.tooltip) {
          this.addChild(tooltip);
        }
      }.bind(this),
      up: function(event) {
        if(model.tooltip) {
          this.removeChild(tooltip);
        }
      }.bind(this)
    } ) );
    this.addChild(circle);
  }

  return inherit( Node, OverlayNode );
} );
