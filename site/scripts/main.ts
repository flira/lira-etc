'use strict';
import {ScrollNav} from 'scripts/components/scroll-nav.js';
import {ToggleMenu} from 'scripts/components/toggle-menu.js';

interface Components {
  sn: ScrollNav;
  tm: ToggleMenu;
}

(function(c: Components):void{
  c.sn.init();
  c.tm.init();
})({
  sn: new ScrollNav(),
  tm: new ToggleMenu()
});