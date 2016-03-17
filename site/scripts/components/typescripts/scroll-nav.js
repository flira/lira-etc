'use strict';
var ScrollNavFn = (function () {
    function ScrollNavFn($anchor) {
        this.anchor = $anchor;
    }
    ScrollNavFn.prototype.getSpeed = function (attr) {
        // Get animation speed on the html attribute, if there is any.
        attr = parseFloat(attr);
        attr = attr > 0 ? attr : 1750;
        return attr;
    };
    ScrollNavFn.prototype.animateScroll = function ($speed) {
        // all those vars are TweenLite arguments.
        var self = this, _arg = {
            yPos: window.scrollY
        }, _dest = self.anchor.length ? self.anchor.offset().top : 0, _speed = (_dest - window.scrollY) / $speed, _onStart = function () {
            location.hash = self.anchor.length ? self.anchor[0].id : '/';
        }, _onUpdate = function () {
            window.scroll(window.scrollX, Math.round(_arg.yPos));
        }, tween = TweenLite.to(_arg, _speed, {
            yPos: _dest,
            onStart: _onStart,
            onUpdate: _onUpdate
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
            var scroller = new ScrollNavFn($(e.target.hash)), speed = scroller.getSpeed($(e.currentTarget).attr("data-scroll-nav-speed"));
            e.preventDefault();
            $(e.target).blur();
            scroller.animateScroll(speed);
        });
    };
    return ScrollNav;
})();
exports.ScrollNav = ScrollNav;
