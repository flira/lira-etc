/// <reference path="definitely-typed/jquery.d.ts" />
/// <reference path="definitely-typed/rx.lite.d.ts" />
'use strict';
export class ToggleItem {
  c: JQuery; // Component controller
  constructor() {
    this.c = $('[data-toggle-for]');
  }
  init(): void {
    const self: ToggleItem = this,
      source = Rx.Observable
        .fromEvent(self.c, 'click')
        .subscribe(function(e: Event) {
          const selector: string = '#' + $(e.target).data('toggleFor'),
            model: JQuery = $(selector),
            bool: boolean = !model.hasClass('active')
              && !($(e.target).data('toggleCloseOnly') != void 0);
            model.toggleClass('active', bool);
        });
  }
}