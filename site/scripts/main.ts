'use strict';
import {ScrollNav} from 'scripts/components/scroll-nav.js';
//import {SelectiveFix} from 'scripts/components/typescripts/selective-fix.js';
import {ToggleItem} from 'scripts/components/toggle-item.js';
import {LoadWorkTiles} from 'scripts/components/typescripts/load-work-tiles.js';

interface Components {
  lw: LoadWorkTiles;
  sn: ScrollNav;
  //sf: SelectiveFix;
  ti: ToggleItem;
}

(function(c: Components): void {
  $.each(c, (i, val): void => {c[i].init();});
})({
  lw: new LoadWorkTiles(),
  sn: new ScrollNav(),
  //sf: new SelectiveFix(),
  ti: new ToggleItem()
});