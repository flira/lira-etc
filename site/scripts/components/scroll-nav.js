var ScrollNavFn = (function () {
    function ScrollNavFn() {
    }
    ScrollNavFn.prototype.bindClick = function ($sources) {
        var click = Rx.Observable.fromEvent($sources, 'click');
        var clickFn = click.subscribe(function (e) {
            e.preventDefault;
            console.log(e.currentTarget);
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
