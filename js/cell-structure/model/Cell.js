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

  function Cell( properties ) {
    var defaults = { location: '', image: '', text: '', magnifiedImage: '', parentModel: '', size: '', visibility: true, showOutline: false };
    var values = _.merge( defaults, properties );
    values.kitImage = values.image;
    PropertySet.call( this, values );
    this.type = "cell";

    this.onDragEnd = function() {
      CS.onDrop(this);
    }.bind(this);

    this.onDippedInLiquid = function(liquid) {
      if(liquid.text === "Iodine") {
        this.magnifiedImageProperty.set(this.magnifiedImageIodine);
      }
    }.bind(this);
  }

  return inherit( PropertySet, Cell );
} );
