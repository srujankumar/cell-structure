/**
 * Model of the Magnifier View Panel.
 * The magnet has fixed size and location.
 *
 * @author Srujan Kumar (BalaSwecha)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );

  /**
   * Create a new magnifier view model.  The panel has fixed size and location.
   *
   * @param {Vector2} location, the position of the magnifier view panel in model coordinates
   * @param {Dimension2} size, the size of the magnifier view panel in model coordinates
   * @constructor
   */
  function MagnifierView(microscope) {
    PropertySet.call( this, { location: undefined, magnifiedImage: undefined } );
    this.microscope = microscope;
    CS.addEventHandler('MagnifiedImageChanged', function(magnifiedImage){
      this.magnifiedImageProperty.set(magnifiedImage);
    }.bind(this));

    this.microscope.objectUnderLensProperty.link(function(object) {
      var image = object && object.magnifiedImage;
      if( object && !object.magnifiedImage){
        if(object.cellType === "Plant Stem Cell")
        CS.showMessageBox("Plant should be dipped in Red Water and its stem should be trimmed before placing under microscope", true, 5000);
      }
      this.magnifiedImageProperty.set(image);
    }.bind(this));
  }

  return inherit( PropertySet, MagnifierView );
} );
