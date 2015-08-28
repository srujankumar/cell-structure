define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  function Kit( properties ) {
    var defaults = { location: '', text: '', size: '', visibility: true, children: []};
    var values = _.merge( defaults, properties );
    PropertySet.call( this, values );
    CS.addDroppable(this);
    this.onReceiveDrop = function(model) {
      model.reset();
    };

    this.addChild = function(child){
      var newChildren = this.children.concat([child]);
      this.childrenProperty.set(newChildren);
    };

    this.removeChild = function(child) {
      var newChildren = this.children.filter(function(c) { return c !== child; });
      this.childrenProperty.set(newChildren);
    };
  }

  return inherit( PropertySet, Kit );
} );
