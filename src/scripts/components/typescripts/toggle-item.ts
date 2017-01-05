'use strict';
import * as $ from 'jquery';

export class ToggleItem implements Component {
  readonly C: JQuery = $('[data-toggle-for]'); // Component controller
  readonly CLICK: EventListener = this._toggle.bind(this);
  readonly CONST = {
    ACTIVE: 'active',
    TOGGLE_FOR: 'toggleFor',
    CLOSE_ONLY: 'toggleCloseOnly'
  };

  public init(): void {
    Object.freeze(this.CONST);
    this.C.on('click', this.CLICK);
  }


  /**
   * @description
   * Toggle CSS class "active" for the element with ID equal to
   * "data-toggle-for" attribute on the html
   *
   * @param e: Event
   * @return {any}
   * @private
   */
  private _toggle (e: Event): void {
    const
      selector: string = '#' + $(e.target).data(this.CONST.TOGGLE_FOR),
      model: JQuery = $(selector),
      bool: boolean = !model.hasClass(this.CONST.ACTIVE)
        && !($(e.target).data(this.CONST.CLOSE_ONLY) != void 0);

    model.toggleClass(this.CONST.ACTIVE, bool);
    return void 0;
  }
}