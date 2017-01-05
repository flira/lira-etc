import { CONST } from './constants';

export class ScrollAddress implements Component {
  private  CONST = {
    LISTENERS: {
      RESIZE: this._setNavigationPoints.bind(this),
      SCROLL: this._startScrollTimer.bind(this)
    }
  };

  // Map of elements and their vertical offset position, where the positions
  // are the keys and the elements the values
  private _scrollMap: Object;
  // Identical to _scrollMap keys, but ordered, to avoid bugs
  private _positionsMap: Int32Array;
  private _scrollTimer: number;

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


  static sortArray(array: Array<number>): Int32Array {
    const l: number = array.length - 1;
    let a: Int32Array = new Int32Array(array),
        i: number = 0;
    while (i < l) {
      if (a[i] > a[i + 1]) {
        const n1 = a[i], n2 = a[i + 1];
        a[i] = n2;
        a[i + 1] = n1;
        i = i - 2 > 0 ? i - 2 : 0;
      } else {
        i++;
      }
    }

    return a;
  }

  public init () {
    Object.freeze(this.CONST);
    this._setNavigationPoints();
    window.addEventListener('scroll', this.CONST.LISTENERS.SCROLL);
    window.addEventListener('resize', this.CONST.LISTENERS.RESIZE);
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
    const anchors: Array<HTMLAnchorElement> = ScrollAddress.getValidHashes(),
          positionsMap: Array<number> = [];
    let scrollMap: Object = {};
    for (let i = 0, l = anchors.length; i < l; i++) {
      const id: string = anchors[i].hash.substring(1),
            position: number = document.getElementById(id).offsetTop - 20;
      if (location.hash.substring(1) === id) {
        anchors[i].classList.add('active');
      }
      scrollMap[position] = anchors[i];
      positionsMap.push(position);
    }
    this._scrollMap = scrollMap;
    this._positionsMap = ScrollAddress.sortArray(positionsMap);

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
    const y: number = window.scrollY ? window.scrollY : window.pageYOffset;
    let active: number = 0;
    for (let i = 0, l = this._positionsMap.length; i < l; i++ ) {
      if (y > this._positionsMap[i]) {
        active = this._positionsMap[i];
      } else {
        break;
      }
    }

    if (!this._scrollMap[active].classList.contains(CONST.CSS.ACTIVE) &&
        !document.getElementsByClassName(CONST.CSS.CLICKED).length) {
      const hash = this._scrollMap[active].hash.substring(1);
      history.replaceState(
        CONST.HISTORY_SECTION,
        `${CONST.PAGE_TITLE} - ${hash}`,
        active > 0 ? `#${hash}` : '');
      for (const i in this._scrollMap) {
        if (this._scrollMap.hasOwnProperty(i)) {
          this._scrollMap[i].classList.remove(CONST.CSS.ACTIVE);
        }
      }
      this._scrollMap[active].classList.add(CONST.CSS.ACTIVE);
    }

    return void 0;
  }
}
