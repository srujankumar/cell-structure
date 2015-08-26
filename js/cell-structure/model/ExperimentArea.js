define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var Vector2 = require( 'DOT/Vector2' );
  var Stopwatch = require( 'CELL_STRUCTURE/cell-structure/model/Stopwatch' );

  function ExperimentArea( properties ) {
    var defaults = { location: '', size: '', visibility: true, children: [], newChild: undefined, stopwatch: null};
    var values = _.merge( defaults, properties );
    PropertySet.call( this, values );

    var addChild = function(model) {
      if(model.type !== "apparatus") return;

      // Do not add duplicates
      var childIndex = this.children.indexOf(model);
      if (childIndex !== -1) return;

      this.children.push(model);

      if(typeof this.onAddChild == "function") {
        this.onAddChild(model);
      }
    }.bind(this);

    CS.addDroppable(this);
    this.onReceiveDrop = function(model) {
      addChild(model);
      CS.model.apparatusKit.removeChild(model);
    };

    CS.addEventHandler('ApparatusRemoved', function(child){
      CS.model.apparatusKit.addChild(child);
      this.removeChild(child);
      if(typeof child.onRemove == "function") {
        child.onRemove();
      }
    }.bind(this));

    this.removeChild = function(child) {
      var childIndex = this.children.indexOf(child);
      if (childIndex == -1) return;
      this.children.splice(childIndex, 1);
      if(typeof this.onRemoveChild == "function") {
        this.onRemoveChild(childIndex);
      }
    };

    this.createStopwatch = function(callback) {
      if(this.stopwatch) return;
      this.stopwatchProperty.set(new Stopwatch(callback));
    };
  }

  return inherit( PropertySet, ExperimentArea );
} );
