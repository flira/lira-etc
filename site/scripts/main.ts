'use strict';
import {ScrollNav} from 'scripts/components/typescripts/scroll-nav.js';

interface Components {
  sn: ScrollNav;
}

(function(c: Components):void{
  c.sn.init();
})({
  sn: new ScrollNav()
});