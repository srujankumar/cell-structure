define( function(require) {

  CS.utils = {
    slice: function(ary, n) {
      r = [];
      subAry = [];
      ary.forEach(function(el, i) {
        if(i && i % n == 0) {
          r.push(subAry);
          subAry = [el];
        } else {
          subAry.push(el);
        }
      });
      r.push(subAry);
      return r;
    }
  };

});
