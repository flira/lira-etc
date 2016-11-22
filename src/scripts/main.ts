'use strict';

import { ScrollNav } from './components/typescripts/scroll-nav';
import { ToggleItem } from './components/typescripts/toggle-item';
import { ScrollAddress } from './components/typescripts/scroll-address';

(function(components: Object){
  for (const component in components) {
    (<Component>components[component]).init();
  }
}({
  scrollAddress: new ScrollAddress,
  scrollNav: new ScrollNav(), // Animate ID anchors scroll
  toggleItem: new ToggleItem()
}));