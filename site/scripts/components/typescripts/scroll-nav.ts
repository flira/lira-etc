/// <reference path="definitely-typed/jquery.d.ts" />
/// <reference path="definitely-typed/rx.lite.d.ts" />
/// <reference path="definitely-typed/greensock.d.ts" />

'use strict';
interface TweenValues {
  _i: {val:number}; //Tween initialization
  _fe: number; //Final expression
  _speed: number; //Tween Speed
  _onStart: () => void; //Function called when Tween starts
  _onUpdate: () => void; //Function called each Tween update
}
export class ScrollNav {
  selector: string; //Optional selector for the menu where the component will be applied;
  target: JQuery; // The element that the animation will scroll to
  speed: number; //Tween Speed
  constructor(selector ? : string) {
    this.selector = !selector ? '[data-scroll-nav]' : selector;
    this.target; //defined @ init();
    this.speed; //defined @ init();
    this.setSpeed; //Method to set tween speed
    this.setValues; //Method to set TweenValues (See TweenValues interface)
    this.animateScroll; //Method to call Tween
  }
  setSpeed(attr: any): number {
    // Get animation speed on the html attribute, if there is any.
    attr = parseFloat(attr);
    attr = attr > 0 ? attr : 2500;
    return attr;
  }
  setValues(): TweenValues {
    const self = this,
      i: {val:number} = {val: window.scrollY},
      f: number = self.target.length ? self.target.offset().top : 0,
      s: number = (f - window.scrollY) / self.speed,
      oS = function(): void {
        location.hash = f ? self.target[0].id : '/';
      },
      oU = function(): void {
        window.scroll(
          window.scrollX,
          Math.round(i.val));
      }
    return {_i: i, _fe: f, _speed: s, _onStart: oS, _onUpdate: oU};
  }
  animateScroll(): void {
    const args: TweenValues = this.setValues(),
      tween: TweenLite = TweenLite.to(args._i, args._speed, {
        val: args._fe,
        onStart: args._onStart,
        onUpdate: args._onUpdate
      });
  }
  init(): void {
    const self: ScrollNav = this,
      clickSource = Rx
        .Observable
        .fromEvent($(this.selector), 'click')
        .subscribe(function(e: Event): void {
          self.speed = self.setSpeed($(e.currentTarget).attr("data-scroll-nav-speed"));
          self.target = $(e.target.hash);
          e.preventDefault();
          $(e.target).blur();
          self.animateScroll();
      });
  }
}