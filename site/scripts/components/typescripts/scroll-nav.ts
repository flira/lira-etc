'use strict';
class ScrollNavFn {
  $target: string; //original anchor target;
  constructor () {}
  bindClick($sources) {
      const source = Rx.Observable.fromEvent($sources, 'click');
      const subscription = source.subscribe(function (e) {
        e.preventDefault();
        this.$target = e.target.hash;
    });
  }
}
export class ScrollNav {
    selector: string;
    fn: ScrollNavFn; 
    constructor(selector?) {
      this.selector = !selector ? '[data-scroll-nav]' : selector;
      this.fn = new ScrollNavFn();
    }
    init() {
      const sources = $(this.selector);
      if (sources.length) {
        this.fn.bindClick(sources);
    }
  }
}