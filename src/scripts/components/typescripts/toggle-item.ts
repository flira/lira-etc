'use strict';
export class ToggleItem {
  c: JQuery; // Component controller
  constructor() {
    this.c = $('[data-toggle-for]');
  }
  init(): void {
    const source:Rx = Rx.Observable
        .fromEvent(this.c, 'click')
        .subscribe((e: Event) => {
          const selector: string = '#' + $(e.target).data('toggleFor'),
            model: JQuery = $(selector),
            bool: boolean = !model.hasClass('active')
              && !($(e.target).data('toggleCloseOnly') != void 0);
            model.toggleClass('active', bool);
        });
  }
}