'use strict';

import { ScrollNav } from './components/typescripts/scroll-nav';

(function(components: Object){
  for (const component in components) {
    (<Component>components[component]).init();
  }
}({
  scrollNav: new ScrollNav()
}));