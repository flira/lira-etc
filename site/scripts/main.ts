'use strict';
import {ScrollNav} from 'scripts/components/scroll-nav.js';
//import {SelectiveFix} from 'scripts/components/typescripts/selective-fix.js';
import {ToggleItem} from 'scripts/components/toggle-item.js';
import {LoadWork} from 'scripts/components/typescripts/load-work.js';

interface Components {
  lw: LoadWork;
  sn: ScrollNav;
  //sf: SelectiveFix;
  ti: ToggleItem;
}

(function(c: Components): void{
  $.each(c, function(i, val){c[i].init();});
})({
  lw: new LoadWork(),
  sn: new ScrollNav(),
  //sf: new SelectiveFix(),
  ti: new ToggleItem()
});