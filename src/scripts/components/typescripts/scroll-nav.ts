'use strict';
import * as $ from 'jquery';
import { CONST } from './constants';
import SettableValues = ScrollNavDef.SettableValues;
import TweenValues = ScrollNavDef.TweenValues;


export class ScrollNav implements Component {
  private readonly CONST = {
    LISTENERS: {
      CLICK: this._triggerAnimation.bind(this)
    }
  };

  private _component: JQuery; // Element containing the anchors
  private _anchor: JQuery; // Clicked anchor
  private _target: JQuery; // Element with ID that the animation will scroll to
  // Lag to remove the 'clicked' class, to avoid conflicts between this click and the scroll address
  private _timerCss: number = 0;

  //Default values (can be overwritten by HTML attributes)
  private _settableValues: SettableValues;

  constructor(selector? : string) {
    Object.freeze(this.CONST);
    this._component = !selector ? $('[data-scroll-nav]') : $(selector);
    this._settableValues = {
      ease: this._component.data('scrollNavEase') ?
        this._component.data('scrollNavEase') : 'Strong.easeOut', // Tween Ease
      speed: this._component.data('scrollNavSpeed') &&
      parseFloat(<string>this._component.data('scrollNavSpeed')) > 0 ?
        parseFloat(<string>this._component.data('scrollNavSpeed')) : 2500 // Tween Speed
    };
  }

  /**
   * @description
   * Component initializer
   */
  public init(): void {
    Object.freeze(this.CONST);
    this._component.on('click', this.CONST.LISTENERS.CLICK);
    return void 0;
  }

  /**
   * @description
   * Animates the scroll after a click on an anchor to an ID.
   *
   * @param e: Event
   * @return {boolean} Returns false to prevent default
   * @private
   */
  private _triggerAnimation(e: Event): boolean {
    const
      el: HTMLAnchorElement = <HTMLAnchorElement>e.target,
      hash: string  = el.hash;

    if (hash && hash.length) {
      this._anchor = $(el);
      this._target = $(hash);
      this._component.find(`.${CONST.CSS.ACTIVE}`).removeClass(CONST.CSS.ACTIVE);
      this._anchor.blur().addClass(`${CONST.CSS.ACTIVE} ${CONST.CSS.CLICKED}`);
      this._animateScroll();
    }
    
    return false;
  }

  /**
   * @description
   * Sets TweenLite parameters
   *
   * @return {TweenValues}
   * @private
   */
  private _setValues(): TweenValues {

    const
      x: number = window.scrollX ? window.scrollX : window.pageXOffset,
      y: number = window.scrollY ? window.scrollY : window.pageYOffset,
      i: {val:number} = {val: y},
      f: number = this._target.length ? this._target.offset().top : 0,
      s: number = this._settableValues.speed,
      e: string = this._settableValues.ease,
      oU: () => void = (): void => {
        console.log(this._anchor.hasClass(CONST.CSS.CLICKED));
        window.scroll(x, Math.round(i.val));
        return void 0;
      },
      oC: () => void = (): void => {
        const hash: string = this._target.get(0).id;
        clearTimeout(this._timerCss);
        history.replaceState(
          CONST.HISTORY_SECTION,
          `${CONST.PAGE_TITLE} - ${hash}`,
          f > 0 ? `#${hash}` : '');
        this._timerCss = setTimeout(() => {
          console.log('removi o click!');
          this._anchor.removeClass(CONST.CSS.CLICKED);
        }, CONST.TIMER_LAG + 10);

        return void 0;
      };

    return {
      _i: i,
      _fe: f,
      _speed: s,
      _ease: e,
      _onUpdate: oU,
      _onComplete: oC
    };
  }

  /**
   * @description
   * Creates the TweenLite animation
   *
   * @private
   */
  private _animateScroll(): void {
    const
      args: TweenValues = this._setValues(),
      tween: TweenLite = TweenLite.to(args._i, args._speed, {
        ease: args._ease,
        val: args._fe,
        onUpdate: args._onUpdate,
        onComplete: args._onComplete,
      });
    return void 0;
  }
}