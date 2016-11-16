'use strict';

import { ScrollNav } from './components/typescripts/scroll-nav';

(function(componentes: Object){
  for (const componente in componentes) {
    componentes[componente].init();
  }
}({
  scrollNav: new ScrollNav()
}));