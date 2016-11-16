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
  component: JQuery; // Element that the component will be applied with an optional selector;
  target: JQuery; // The element that the animation will scroll to
  speed: number; //Tween Speed
  constructor(selector ? : string) {
    this.component = !selector ? $('[data-scroll-nav]') : $(selector);
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
    const i: {val:number} = {val: window.scrollY},
      f: number = this.target.length ? this.target.offset().top : 0,
      s: number = Math.abs(f - window.scrollY) / this.speed,
      oS = (): void => {
        location.hash = f ? this.target[0].id : '';
      },
      oU = (): void => {
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
    const source = Rx.Observable
        .fromEvent(this.component, 'click')
        .subscribe((e: Event): void => {
          const el = <Element>e.target;
          if (el.hasAttribute('href')) {
            this.speed = this.setSpeed($(e.currentTarget).data("scrollNavSpeed"));
            this.target = $(el.getAttribute('href'));
            e.preventDefault();
            this.component.find('.selected').removeClass('selected');
            $(el).blur().addClass('selected');
            this.animateScroll();
          }
      });
  }
}