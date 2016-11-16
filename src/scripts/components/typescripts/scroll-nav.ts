'use strict';
import * as $ from 'jquery';
import * as Rx from 'rx-lite';
import 'gsap/src/uncompressed/TweenLite.js';

interface TweenValues {
  _i: {val:number}; //Tween initialization
  _fe: number; //Final expression
  _speed: number; //Tween Speed
  _ease: string // Tween ease
  _onStart: () => void; //Function called when Tween starts
  _onUpdate: () => void; //Function called each Tween update
}
export class ScrollNav {
  component: JQuery; // Element that the component will be applied with an optional selector;
  target: JQuery; // The element that the animation will scroll to
  speed: number; //Tween Speed
  setEase: string; // Ease
  constructor(selector ? : string) {
    this.component = !selector ? $('[data-scroll-nav]') : $(selector);
  }

  static setSpeed(attr: string): number {
    // Get animation speed on the html attribute, if there is any.
    let _attr = parseInt(attr, 10);
    _attr = _attr > 0 ? _attr : 2500;
    return _attr;
  }
  setValues(): TweenValues {
    const i: {val:number} = {val: window.scrollY},
      f: number = this.target.length ? this.target.offset().top : 0,
      s: number = Math.abs(f - window.scrollY) / this.speed,
      e: string = "Strong.easeOut",
      oS = (): void => {
        location.hash = f ? this.target[0].id : '';
      },
      oU = (): void => {
        window.scroll(
          window.scrollX,
          Math.round(i.val));
      };
    return {_i: i, _fe: f, _speed: s,_ease: e, _onStart: oS, _onUpdate: oU};
  }
  animateScroll(): void {
    const args: TweenValues = this.setValues(),
      tween: TweenLite = TweenLite.to(args._i, args._speed, {
        ease: "Strong.easeOut",
        val: args._fe,
        onStart: args._onStart,
        onUpdate: args._onUpdate
      });
  }
  init(): void {
    const source: Rx = Rx.Observable
        .fromEvent(this.component, 'click')
        .subscribe((e: Event): void => {
          const el = <Element>e.target;
          if (el.hasAttribute('href')) {
            this.speed = ScrollNav.setSpeed($(e.currentTarget).data("scrollNavSpeed"));
            this.target = $(el.getAttribute('href'));
            e.preventDefault();
            this.component.find('.selected').removeClass('selected');
            $(el).blur().addClass('selected');
            this.animateScroll();
          }
      });
  }
}