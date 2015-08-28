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
  var Dimension2 = require( 'DOT/Dimension2' );
  var Filler = require( 'CELL_STRUCTURE/cell-structure/model/Filler' );

  function Cell( properties ) {
    var defaults = { location: '', image: '', text: '', magnifiedImage: '', parentModel: '', size: '', visibility: true, showOutline: false, attachedTo: null };
    var values = _.merge( defaults, properties );
    values.kitImage = values.image;
    PropertySet.call( this, values );
    this.type = "cell";

    this.attachedToProperty.link( function(attachedTo) {
      // Increase it's size if it's floating
      if(!attachedTo) this.sizeProperty.reset();
    }.bind(this) );
    CS.addDroppable(this);
  }

  return inherit( PropertySet, Cell, {
    collidesWith: function(model) {
      if(model instanceof Filler) 
        model.collidesWith(this);
      return false;
    },

    onDragEnd: function() {
      CS.onDrop(this);
    },

    onDippedInLiquid: function(liquid) {
      if(liquid.text === "Iodine" && this.magnifiedImageIodine) {
        this.magnifiedImageProperty.set(this.magnifiedImageIodine);
      } else if(liquid.text === "Janus Green B" && this.magnifiedImageJanus) {
        this.magnifiedImageProperty.set(this.magnifiedImageJanus);
      } else {
        this.reset();
      }
    },

    onLiquidDropped: function(){
      return this.onDippedInLiquid;
    }
  } );
} );
