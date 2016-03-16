'use strict';
var ScrollNavFn = (function () {
    function ScrollNavFn() {
    }
    ScrollNavFn.prototype.bindClick = function ($sources) {
        var source = Rx.Observable.fromEvent($sources, 'click');
        var subscription = source.subscribe(function (e) {
            e.preventDefault();
            this.$target = e.target.hash;
        });
    };
    return ScrollNavFn;
})();
var ScrollNav = (function () {
    function ScrollNav(selector) {
        this.selector = !selector ? '[data-scroll-nav]' : selector;
        this.fn = new ScrollNavFn();
    }
    ScrollNav.prototype.init = function () {
        var sources = $(this.selector);
        if (sources.length) {
            this.fn.bindClick(sources);
        }
    };
    return ScrollNav;
})();
exports.ScrollNav = ScrollNav;
