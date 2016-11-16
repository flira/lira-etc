export class SelectiveFix {
  private readonly el: JQuery; //
  private oldY: number; // Previous window.scrollY
  private pinPoint: number;

  constructor () {
    this.el = $('[data-selective-fix]');
    this.oldY = this.pinPoint = window.scrollY;
    this.scrollUp; // Method executed when scroll up;
    this.scrollDown; // Method executed when scroll down;
  }

  private scrollUp(): void {
    this.el.removeClass('scroll-down');
    if(!this.el.hasClass('scroll-up') && window.scrollY > this.el.height()) {
      this.el.addClass('scroll-up');
    }
  }

  private scrollDown(): void {
    this.el.removeClass('scroll-up');
    if(!this.el.hasClass('scroll-down') && window.scrollY > this.el.height()) {
      this.el.addClass('scroll-down');
    }
  }

  public init(): void {
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