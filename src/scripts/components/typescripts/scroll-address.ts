import { CONST } from './constants';

export class ScrollAddress implements Component{
  private readonly CONST = {
    LISTENERS: {
      RESIZE: this._setNavigationPoints.bind(this),
      SCROLL: this._startScrollTimer.bind(this)
    }
  };

  private _scrollMap: Object;
  private _scrollTimer: number;

  public init () {
    Object.freeze(this.CONST);
    this._setNavigationPoints();
    this.CONST.LISTENERS.SCROLL();
    window.addEventListener('scroll', this.CONST.LISTENERS.SCROLL);
    window.addEventListener('resize', this.CONST.LISTENERS.RESIZE);
  }

  /**
   * @description
   * Returns an array with anchors that have a hash referring to an existing
   * element
   *
   * @return {Array<HTMLAnchorElement>}
   * @static
   */
  static getValidHashes(): Array<HTMLAnchorElement> {
    let
      anchors: NodeListOf<HTMLAnchorElement> =
          document.getElementsByTagName('a'),
      validHashes: Array<HTMLAnchorElement> = [];

    for (const anchor in anchors) {
      const isValid: boolean =
        typeof anchors[anchor] === 'object' &&
        'hash' in anchors[anchor] &&
        !!document.getElementById(anchors[anchor].hash.substring(1));

      if (isValid) {
        validHashes.push(anchors[anchor]);
      }
    }

    return validHashes;
  };

  // todo: Finish this method to use in "checkPosition"

  static sortArray(array: Array<number>): Int32Array {
    const length: number = array.length;
    let IntArray: Int32Array = new Int32Array(length);

    return IntArray;
  }

  /**
   * @description
   * Returns an object with vertical offset positions as keys and their respective
   * elements as values.
   *
   *
   * @return {Object} {offsetTop: HTMLElement}
   * @private
   */
  private _setNavigationPoints(): void {
    const anchors: Array<HTMLAnchorElement> = ScrollAddress.getValidHashes();
    let positionsMap: Object= {};
    for (let i = 0, l = anchors.length; i < l; i++) {
      const id: string = anchors[i].hash.substring(1);
      if (location.hash.substring(1) === id) {
        anchors[i].classList.add('active');
      }
      positionsMap[document.getElementById(id).offsetTop] = anchors[i];
    }
    this._scrollMap = positionsMap;
    
    return void 0;
  };

  /**
   * @description
   * Creates a small lag before calling the _scrollTimer method,
   * so it will not trigger multiples times unnecessarily
   * 
   * @private
   */
  private _startScrollTimer(): void {
    const binder: Function = this._checkPosition.bind(this);
    window.clearTimeout(<number>this._scrollTimer);
    this._scrollTimer = setTimeout(binder, CONST.TIMER_LAG);
  }

  /**
   * @description
   * Adds a CSS class for the anchor referring to the element
   * that is being displayed in the window
   *
   * @return {void}
   * @private
   */
  private _checkPosition(): void {
    let active: number = 0;
    for (const i in this._scrollMap) {
      const
        n: number = parseInt(i, 10),
        y: number = window.scrollY ? window.scrollY : window.pageYOffset;

      if (y >= n) {
        active = n;
      } 
    }

    if (!this._scrollMap[active].classList.contains(CONST.CSS.ACTIVE) &&
        !document.getElementsByClassName(CONST.CSS.CLICKED).length) {
      console.log('mudei por scroll!');
      const hash = this._scrollMap[active].hash.substring(1);
      history.replaceState(
        CONST.HISTORY_SECTION,
        `${CONST.PAGE_TITLE} - ${hash}`,
        active > 0 ? `#${hash}` : '');
      for (const i in this._scrollMap) {
        this._scrollMap[i].classList.remove(CONST.CSS.ACTIVE);
      }
      this._scrollMap[active].classList.add(CONST.CSS.ACTIVE);
    }

    return void 0;
  }
  
}