'use strict';

import { ScrollNav } from './components/typescripts/scroll-nav';
import { ToggleItem } from './components/typescripts/toggle-item';

(function(components: Object){
  for (const component in components) {
    (<Component>components[component]).init();
  }
}({
  scrollNav: new ScrollNav(), // Animate ID anchors scroll
  toggleItem: new ToggleItem()
}));