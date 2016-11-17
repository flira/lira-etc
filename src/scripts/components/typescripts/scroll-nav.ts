'use strict';
import * as $ from 'jquery';
import 'gsap/src/uncompressed/TweenLite.js';
import SettableValues = ScrollNavDef.SettableValues;
import TweenValues = ScrollNavDef.TweenValues;

export class ScrollNav implements Component {
  private component: JQuery; // Element containing the anchors
  private target: JQuery; // Element with ID that the animation will scroll to
  private onclick: EventListener;

  //Defaults
  private _settableValues: SettableValues = {
    ease: 'Strong.easeOut', // Tween Ease
    speed: 2500 // Tween Speed
  };

  constructor(selector? : string) {
    this.component = !selector ? $('[data-scroll-nav]') : $(selector);
  }

  /**
   * @description
   * Component initializer
   */
  public init(): void {
    this.onclick = this._triggerAnimation.bind(this);
    this.component.on('click', this.onclick);
    
    return void 0;
  }

  /**
   * @description
   * Method to animate the scroll of an ID anchor, after a click.
   *
   * @param e: Event
   * @return {boolean} Returns false to prevent default
   * @private
   */
  private _triggerAnimation(e: Event): boolean {
    const el = <Element>e.target,
          speed = parseFloat(<string>this.component.data('scrollNavSpeed'));
    
    if (el.hasAttribute('href')) {
      this._settableValues.speed = typeof speed === 'number' && speed > 0 ?
        speed : this._settableValues.speed;
      this._settableValues.ease = this.component.data('scrollNavEase') ?
        this.component.data('scrollNavEase') : this._settableValues.ease;
      this.target = $(el.getAttribute('href'));
      this.component.find('.selected').removeClass('selected');
      $(el).blur().addClass('selected');
      this._animateScroll();
    }
    
    return false;
  }

  /**
   * @description
   * Sets values to the TweenLite
   *
   * @return {TweenValues}
   * @private
   */
  private _setValues(): TweenValues {
    const i: {val:number} = {val: window.scrollY},
      f: number = this.target.length ? this.target.offset().top : 0,
      s: number = this._settableValues.speed,
      e: string = this._settableValues.ease,
      oS = (): void => {
        location.hash = f ? this.target[0].id : '';
      },
      oU = (): void => {
        window.scroll(
          window.scrollX,
          Math.round(i.val));
      };

    return {
      _i: i,
      _fe: f,
      _speed: s,
      _ease: e,
      _onStart: oS,
      _onUpdate: oU
    };
  }

  /**
   * @description
   * Creates the TweenLite animation
   *
   * @private
   */
  private _animateScroll(): void {
    const args: TweenValues = this._setValues(),
      tween: TweenLite = TweenLite.to(args._i, args._speed, {
        ease: args._ease,
        val: args._fe,
        onStart: args._onStart,
        onUpdate: args._onUpdate
      });

    console.log(args._ease);

    return void 0;
  }
}