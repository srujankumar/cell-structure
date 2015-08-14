/**
 * Model of an animal cell object.
 *
 * @author Srujan Kumar (BalaSwecha)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * Create a new cell model.  The object has fixed size, and mutable location.
   *
   * @param {Vector2} location, the position of the cell in model coordinates
   * @param {Dimension2} size, the size of the cell in model coordinates
   * @constructor
   */
  function Cell( properties ) {
    var defaults = { location: '', image: '', text: '', magnifiedImage: '', parentModel: '', size: '', visibility: true, showOutline: false };
    var values = _.merge( defaults, properties );
    values.kitImage = values.image;
    PropertySet.call( this, values );
    this.type = "cell";

    this.onDragEnd = function() {
      CS.onDrop(this);
    };

    this.onDippedInLiquid = function(liquid) {
      console.log("It's a " + liquid.color + " now!");
    };
  }

  return inherit( PropertySet, Cell );
} );
