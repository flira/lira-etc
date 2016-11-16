/// <reference path="definitely-typed/jquery.d.ts" />
/// <reference path="definitely-typed/rx.lite.d.ts" />
'use strict';
var ToggleItem = (function () {
    function ToggleItem() {
        this.c = $('[data-toggle-for]');
    }
    ToggleItem.prototype.init = function () {
        var source = Rx.Observable
            .fromEvent(this.c, 'click')
            .subscribe(function (e) {
            var selector = '#' + $(e.target).data('toggleFor'), model = $(selector), bool = !model.hasClass('active')
                && !($(e.target).data('toggleCloseOnly') != void 0);
            model.toggleClass('active', bool);
        });
    };
    return ToggleItem;
})();
exports.ToggleItem = ToggleItem;
