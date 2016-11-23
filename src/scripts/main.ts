'use strict';

import { ScrollNav } from './components/typescripts/scroll-nav';
import { ToggleItem } from './components/typescripts/toggle-item';
import { ScrollAddress } from './components/typescripts/scroll-address';
import { CONST } from './components/typescripts/constants';
import { LoadWorkTiles } from './components/typescripts/load-work-tiles';

(function(components: Object){
  Object.freeze(CONST);
  for (const component in components) {
    if ('init' in components[component]) {
      (<Component>components[component]).init();
    }
  }
}({
  loadWorkTiles: new LoadWorkTiles,
  scrollAddress: new ScrollAddress,
  scrollNav: new ScrollNav, // Animate ID anchors scroll
  toggleItem: new ToggleItem
}));