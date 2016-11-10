/// <reference path="definitely-typed/jquery.d.ts" />
'use strict';
import {ScrollAddress} from 'scripts/components/typescripts/scroll-address.js';
import {ScrollNav} from 'scripts/components/scroll-nav.js';
//import {SelectiveFix} from 'scripts/components/typescripts/selective-fix.js';
import {ToggleItem} from 'scripts/components/toggle-item.js';
import {LoadWorkTiles} from 'scripts/components/typescripts/load-work-tiles.js';

interface Components {
  lw: LoadWorkTiles;
  sa: ScrollAddress;
  sn: ScrollNav;
  //sf: SelectiveFix;
  ti: ToggleItem;
}

(function(c: Components): void {
  $.each(c, (i, val): void => {c[i].init();});
})({
  lw: new LoadWorkTiles(),
  sa: new ScrollAddress(),
  sn: new ScrollNav(),
  //sf: new SelectiveFix(),
  ti: new ToggleItem()
});