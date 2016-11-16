import {ScrollAddress} from 'scripts/components/typescripts/scroll-address.js';
import {ScrollNav} from 'scripts/components/scroll-nav.js';
//import {SelectiveFix} from 'scripts/components/typescripts/selective-fix.js';
import {ToggleItem} from 'scripts/components/toggle-item.js';
import {LoadWorkTiles} from 'scripts/components/typescripts/load-work-tiles.js';

(function(c: Object): void {
  $.each(c, (i, val): void => {c[i].init();});
})({
  lw: new LoadWorkTiles(),
  sa: new ScrollAddress(),
  sn: new ScrollNav(),
  //sf: new SelectiveFix(),
  ti: new ToggleItem()
});