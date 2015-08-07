define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );

  function ExperimentArea( properties ) {
    var defaults = { location: '', size: '', visibility: true, children: [], newChild: undefined};
    var values = _.merge( defaults, properties );
    PropertySet.call( this, values );

    CS.addDroppable(this);
    this.onReceiveDrop = function(model) {
      this.children.push(model);

      if(typeof this.onAddChild == "function") {
        this.onAddChild(model);
      }
    };

    CS.addEventHandler('ApparatusRemoved', function(model){
      CS.model.apparatusKit.addChild(model);
      this.removeChild(model);
    }.bind(this));

    this.removeChild = function(child) {
      var childIndex = this.children.indexOf(child);
      if (childIndex == -1) return;
      this.children.splice(childIndex, 1);
      if(typeof this.onRemoveChild == "function") {
        this.onRemoveChild(childIndex);
      }
    };
  }

  return inherit( PropertySet, ExperimentArea );
} );
