'use strict';
class ScrollNavFn {
  anchor: any;
  constructor ($anchor) {
    this.anchor = $anchor;
  }
  animateScroll() {
    const value = {yPos: window.scrollY},
      _fn = function (){
            window.scroll(
              window.scrollX,
              Math.round(value.yPos));
      },
      tween = TweenLite.to(value, .25, {
      yPos: this.anchor.offset().top,
      onUpdate: _fn;
    })
  }
}
export class ScrollNav {
  selector: string;
  constructor(selector?) {
    this.selector = !selector ? '[data-scroll-nav]' : selector;
  }
  init() {
    const clickSource = Rx.Observable.fromEvent($(this.selector), 'click'),
    clickSubscribe = clickSource.subscribe(function(e) {
      e.preventDefault();
      $(e.target).blur();
      const scroller = new ScrollNavFn($(e.target.hash));
      scroller.animateScroll();
    });
  }
}