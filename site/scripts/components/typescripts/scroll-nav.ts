'use strict';
class ScrollNavFn { //Suport class for ScrollNav class.
  anchor: any; //The target element.
  constructor($anchor) {
    this.anchor = $anchor;
  }
  getSpeed(attr: any): number {
    // Get animation speed on the html attribute, if there is any.
    attr = parseFloat(attr);
    attr = attr > 0 ? attr : 1750;
    return attr;
  }
  animateScroll($speed): void {
    // all those vars are TweenLite arguments.
    const self = this,
      _arg = {
        yPos: window.scrollY
      },
      _dest = self.anchor.length ? self.anchor.offset().top : 0,
      _speed = (_dest - window.scrollY) / $speed,
      _onStart = function() {
        location.hash = self.anchor.length ? self.anchor[0].id : '/';
      },
      _onUpdate = function() {
        window.scroll(
          window.scrollX,
          Math.round(_arg.yPos));
      },
      tween = TweenLite.to(_arg, _speed, {
        yPos: _dest,
        onStart: _onStart,
        onUpdate: _onUpdate;
      });
  }
}
export class ScrollNav {
  selector: string; //Optional selector for the menu where the component will be applied;
  constructor(selector) {
    this.selector = !selector ? '[data-scroll-nav]' : selector;
  }
  init(): void {
    const clickSource = Rx.Observable.fromEvent($(this.selector), 'click'),
      clickSubscribe = clickSource.subscribe(function(e) {
        const scroller = new ScrollNavFn($(e.target.hash)),
          speed = scroller.getSpeed($(e.currentTarget).attr("data-scroll-nav-speed"));
        e.preventDefault();
        $(e.target).blur();
        scroller.animateScroll(speed);
      });
  }
}