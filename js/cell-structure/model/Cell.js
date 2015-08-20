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

    CS.addDroppable(this);
    this.collidesWith = function(model) {
      if(!(model instanceof Filler)) return;
      model.collidesWith(this);
      return false;
    }

    this.onDragEnd = function() {
      CS.onDrop(this);
    }.bind(this);

    this.onDippedInLiquid = function(liquid) {
      if(liquid.text === "Iodine" && this.magnifiedImageIodine) {
        this.magnifiedImageProperty.set(this.magnifiedImageIodine);
      }
      if(liquid.text === "Janus Green B" && this.magnifiedImageJanus) {
        this.magnifiedImageProperty.set(this.magnifiedImageJanus);
      }
    }.bind(this);

    this.onLiquidDropped = this.onDippedInLiquid.bind(this);

    this.attachedToProperty.link( function(attachedTo) {
      // Increase it's size if it's floating
      if(!attachedTo) this.sizeProperty.set(new Dimension2( 100, 100 ));
    }.bind(this) );
  }

  return inherit( PropertySet, Cell );
} );
