define( function( require ) {
  'use strict';
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node');
  var MicroscopeInstrumentNode = require( 'CELL_STRUCTURE/cell-structure/view/MicroscopeInstrumentNode' );
  var MagnifierViewNode = require( 'CELL_STRUCTURE/cell-structure/view/MagnifierViewNode' );

  function MicroscopeNode( model, options, modelViewTransform ) {

    Node.call(this);

    var instrumentNode = new MicroscopeInstrumentNode(model.instrument, {}, modelViewTransform);
    var magnifierViewNode = new MagnifierViewNode(model.magnifierView, {}, modelViewTransform);

    this.addChild(instrumentNode);
    this.addChild(magnifierViewNode);

  }
  return inherit( Node, MicroscopeNode );
});
