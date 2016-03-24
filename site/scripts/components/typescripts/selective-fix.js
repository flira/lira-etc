/// <reference path="definitely-typed/jquery.d.ts" />
/// <reference path="definitely-typed/rx.lite.d.ts" />
var SelectiveFix = (function () {
    function SelectiveFix() {
        this.el = $('[data-selective-fix]');
        this.oldY = this.pinPoint = window.scrollY;
        this.scrollUp; // Method executed when scroll up;
        this.scrollDown; // Method executed when scroll down;
    }
    SelectiveFix.prototype.scrollUp = function () {
        this.el.removeClass('scroll-down');
        if (!this.el.hasClass('scroll-up') && window.scrollY > this.el.height()) {
            this.el.addClass('scroll-up');
        }
    };
    SelectiveFix.prototype.scrollDown = function () {
        this.el.removeClass('scroll-up');
        if (!this.el.hasClass('scroll-down') && window.scrollY > this.el.height()) {
            this.el.addClass('scroll-down');
        }
    };
    SelectiveFix.prototype.init = function () {
        var self = this, source = Rx.Observable
            .fromEvent(window, 'scroll')
            .subscribe(function (e) {
            console.log(self.pinPoint);
            if (window.scrollY < self.oldY) {
                self.scrollUp();
            }
            else {
                self.scrollDown();
            }
            self.oldY = window.scrollY;
        });
    };
    return SelectiveFix;
})();
exports.SelectiveFix = SelectiveFix;
