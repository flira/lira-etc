/// <reference path="definitely-typed/jquery.d.ts" />
/// <reference path="definitely-typed/rx.lite.d.ts" />
'use strict';
export class ToggleMenu {
  c: JQuery; // Component controller
  constructor() {
    this.c = $('[data-toggle-menu-for]');
    this.toggle; // method to toggle "active" class on the controlled model
  }
  toggle($model: JQuery): void {
    $model.hasClass('active') ? $model.removeClass('active') : $model.addClass('active');
  }
  init(): void {
    const self: ToggleMenu = this,
    clickSource = Rx
      .Observable
      .fromEvent(this.c, 'click')
      .subscribe(function(e: Event) {
        const selector: string = '#' + $(e.target).attr('data-toggle-menu-for'),
          model: JQuery = $(selector);
          self.toggle(model);
      });
  }
}