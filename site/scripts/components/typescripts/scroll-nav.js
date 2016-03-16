'use strict';
var ScrollNavFn = (function () {
    function ScrollNavFn($anchor) {
        this.anchor = $anchor;
    }
    ScrollNavFn.prototype.animateScroll = function () {
        var value = { yPos: window.scrollY }, _fn = function () {
            window.scroll(window.scrollX, Math.round(value.yPos));
        }, tween = TweenLite.to(value, .25, {
            yPos: this.anchor.offset().top,
            onUpdate: _fn
        });
    };
    return ScrollNavFn;
})();
var ScrollNav = (function () {
    function ScrollNav(selector) {
        this.selector = !selector ? '[data-scroll-nav]' : selector;
    }
    ScrollNav.prototype.init = function () {
        var clickSource = Rx.Observable.fromEvent($(this.selector), 'click'), clickSubscribe = clickSource.subscribe(function (e) {
            e.preventDefault();
            $(e.target).blur();
            var scroller = new ScrollNavFn($(e.target.hash));
            scroller.animateScroll();
        });
    };
    return ScrollNav;
})();
exports.ScrollNav = ScrollNav;
