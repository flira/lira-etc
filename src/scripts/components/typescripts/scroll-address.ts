export class ScrollAddress implements Component{
  private readonly LISTENERS = {
    resize: this._setNavigationPoints.bind(this),
    scroll: this._startScrollTimer.bind(this)
  };

  private readonly CSS = {
    active: 'active'
  };

  private _scrollMap: Object;
  private _scrollTimer: number;

  public init () {
    Object.freeze(this.LISTENERS);
    Object.freeze(this.CSS);
    this._setNavigationPoints();
    this.LISTENERS.scroll();
    window.addEventListener('scroll', this.LISTENERS.scroll);
    window.addEventListener('resize', this.LISTENERS.resize);
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
    let anchors: NodeListOf<HTMLAnchorElement> =
          document.getElementsByTagName('a');
    let validHashes: Array<HTMLAnchorElement> = [];

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
    this._scrollTimer = setTimeout(binder, 50);
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
      const n: number = parseInt(i, 10);
      if (window.scrollY >= n) {
        active = n;
      } 
    }

    if (!this._scrollMap[active].classList.contains(this.CSS.active)) {
      for (const i in this._scrollMap) {
        this._scrollMap[i].classList.remove(this.CSS.active);
      }
      this._scrollMap[active].classList.add(this.CSS.active);
    }

    return void 0;
  }
  
}