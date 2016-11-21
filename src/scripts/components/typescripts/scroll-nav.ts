'use strict';
import * as $ from 'jquery';
import SettableValues = ScrollNavDef.SettableValues;
import TweenValues = ScrollNavDef.TweenValues;

export class ScrollNav implements Component {
  private component: JQuery; // Element containing the anchors
  private target: JQuery; // Element with ID that the animation will scroll to
  private onclick: EventListener;

  //Default values (can be overwritten by HTML attributes)
  private _settableValues: SettableValues;

  constructor(selector? : string) {
    this.component = !selector ? $('[data-scroll-nav]') : $(selector);
    this._settableValues = {
      ease: this.component.data('scrollNavEase') ?
        this.component.data('scrollNavEase') : 'Strong.easeOut', // Tween Ease
      speed: this.component.data('scrollNavSpeed') &&
      parseFloat(<string>this.component.data('scrollNavSpeed')) > 0 ?
        parseFloat(<string>this.component.data('scrollNavSpeed')) : 2500 // Tween Speed
    };
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
   * Animates the scroll after a click on an anchor to an ID.
   *
   * @param e: Event
   * @return {boolean} Returns false to prevent default
   * @private
   */
  private _triggerAnimation(e: Event): boolean {
    const el: HTMLAnchorElement = <HTMLAnchorElement>e.target,
          hash: string  = el.hash;
    
    if (hash.length) {
      this.target = $(hash);
      this.component.find('.selected').removeClass('selected');
      $(el).blur().addClass('selected');
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
    const i: {val:number} = {val: window.scrollY},
      f: number = this.target.length ? this.target.offset().top : 0,
      s: number = this._settableValues.speed,
      e: string = this._settableValues.ease,
      oS: () => void = (): void => {
        location.hash = f ? this.target.get(0).id : '';
        return void 0;
      },
      oU: () => void = (): void => {
        window.scroll(window.scrollX, Math.round(i.val));
        return void 0;
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

    return void 0;
  }
}