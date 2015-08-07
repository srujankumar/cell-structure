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
      this.newChildProperty.set(model);
    };
  }

  return inherit( PropertySet, ExperimentArea );
} );
