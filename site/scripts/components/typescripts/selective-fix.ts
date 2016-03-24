/// <reference path="definitely-typed/jquery.d.ts" />
/// <reference path="definitely-typed/rx.lite.d.ts" />

export class SelectiveFix {
  el: JQuery; // 
  oldY: number; // Previous window.scrollY
  constructor () {
    this.el = $('[data-selective-fix]');
    this.oldY = this.pinPoint = window.scrollY;
    this.scrollUp; // Method executed when scroll up;
    this.scrollDown; // Method executed when scroll down;
  }
  scrollUp(): void {
    this.el.removeClass('scroll-down');
    if(!this.el.hasClass('scroll-up') && window.scrollY > this.el.height()) {
      this.el.addClass('scroll-up');
    }
  }
  scrollDown(): void {
    this.el.removeClass('scroll-up');
    if(!this.el.hasClass('scroll-down') && window.scrollY > this.el.height()) {
      this.el.addClass('scroll-down');
    }
  }
  init(): void {
    const self: SelectiveFix = this,
      source = Rx.Observable
        .fromEvent(window, 'scroll')
        .subscribe(function(e: Event) {
          console.log(self.pinPoint);
          if(window.scrollY < self.oldY) {
            self.scrollUp();
          } else {
            self.scrollDown();
          }
          self.oldY = window.scrollY;
        });
  }
}