/*
export class SelectiveFix {
  el: JQuery; // 
  oldY: number; // Previous window.scrollY
  pinPoint: number; // window.scrollY when the element was fixed
  constructor () {
    this.el = $('[data-selective-fix]');
    this.oldY = this.pinPoint = window.scrollY;
    this.scrollUp; // Method executed when scroll up;
    this.scrollDown; // Method executed when scroll down;
  }
  scrollUp(): void {
    const diff: number = this.pinPoint - window.scrollY,
      transform: number = diff > this.el.height() ? this.el.height() : diff;
    if(!this.el.hasClass('scroll-up') && diff < this.el.height())  this.pinPoint = window.scrollY;
    this.el.addClass('scroll-up');
    this.el.css({
      'position': 'fixed',
      'top': - this.el.height() + "px",
      'transform': 'translateY('+transform+'px)'
    });
  }
  scrollDown(): void {
    this.el.removeClass('scroll-up');
    const diff: number  = this.pinPoint - window.scrollY;
    console.log(this.pinPoint +' e '+ window.scrollY);
    if (window.scrollY > this.el.height() && Math.abs(diff) < this.el.height()) {
      this.el.css('transform', 'translateY('+diff+'px)');
    } else {
      this.pinPoint = window.scrollY;
      this.el.css({
        'position': '',
        'top': '',
        'transform': ''
      });
    }
  }
  init(): void {
    const self: SelectiveFix = this,
      source = Rx.Observable
        .fromEvent(window, 'scroll')
        .subscribe(function(e: Event) {
          console.log(window.scrollY + ' e ' + self.oldY);
          if(self.pinPoint > self.el.height() && window.scrollY < self.oldY) {
            self.scrollUp();
          } else {
            self.scrollDown();
          }
          self.oldY = window.scrollY;
        });
  }
}*/
