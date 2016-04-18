/// <reference path="definitely-typed/jquery.d.ts" />
/// <reference path="definitely-typed/rx.lite.d.ts" />
/// <reference path="definitely-typed/greensock.d.ts" />
'use strict';
var ScrollNav = (function () {
    function ScrollNav(selector) {
        this.selector = !selector ? '[data-scroll-nav]' : selector;
        this.target; //defined @ init();
        this.speed; //defined @ init();
        this.setSpeed; //Method to set tween speed
        this.setValues; //Method to set TweenValues (See TweenValues interface)
        this.animateScroll; //Method to call Tween
    }
    ScrollNav.prototype.setSpeed = function (attr) {
        // Get animation speed on the html attribute, if there is any.
        attr = parseFloat(attr);
        attr = attr > 0 ? attr : 2500;
        return attr;
    };
    ScrollNav.prototype.setValues = function () {
        var _this = this;
        var i = { val: window.scrollY }, f = this.target.length ? this.target.offset().top : 0, s = Math.abs(f - window.scrollY) / this.speed, oS = function () {
            location.hash = f ? _this.target[0].id : '';
        }, oU = function () {
            window.scroll(window.scrollX, Math.round(i.val));
        };
        return { _i: i, _fe: f, _speed: s, _onStart: oS, _onUpdate: oU };
    };
    ScrollNav.prototype.animateScroll = function () {
        var args = this.setValues(), tween = TweenLite.to(args._i, args._speed, {
            val: args._fe,
            onStart: args._onStart,
            onUpdate: args._onUpdate
        });
    };
    ScrollNav.prototype.init = function () {
        var _this = this;
        var source = Rx
            .Observable
            .fromEvent($(this.selector), 'click')
            .subscribe(function (e) {
            var el = e.target;
            if (el.hasAttribute('href')) {
                _this.speed = _this.setSpeed($(e.currentTarget)
                    .data("scrollNavSpeed"));
                _this.target = $(el.getAttribute('href'));
                e.preventDefault();
                $(el).blur();
                _this.animateScroll();
            }
        });
    };
    return ScrollNav;
})();
exports.ScrollNav = ScrollNav;
