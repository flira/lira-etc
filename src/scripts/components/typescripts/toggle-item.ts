'use strict';
import * as $ from 'jquery';

export class ToggleItem implements Component {
  private readonly C: JQuery = $('[data-toggle-for]'); // Component controller
  private readonly CLICK: EventListener = this._toggle.bind(this);

  public init(): void {
    this.C.on('click', this.CLICK);
  }

  private _toggle (e: Event): void {
    const selector: string = '#' + $(e.target).data('toggleFor'),
          model: JQuery = $(selector),
          bool: boolean = !model.hasClass('active')
            && !($(e.target).data('toggleCloseOnly') != void 0);
    model.toggleClass('active', bool);
    return void 0;
  }
}