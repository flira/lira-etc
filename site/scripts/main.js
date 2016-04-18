System.register(['scripts/components/scroll-nav.js', 'scripts/components/toggle-item.js', 'scripts/components/typescripts/load-work-tiles.js'], function(exports_1) {
    'use strict';
    var scroll_nav_js_1, toggle_item_js_1, load_work_tiles_js_1;
    return {
        setters:[
            function (scroll_nav_js_1_1) {
                scroll_nav_js_1 = scroll_nav_js_1_1;
            },
            function (toggle_item_js_1_1) {
                toggle_item_js_1 = toggle_item_js_1_1;
            },
            function (load_work_tiles_js_1_1) {
                load_work_tiles_js_1 = load_work_tiles_js_1_1;
            }],
        execute: function() {
            (function (c) {
                $.each(c, function (i, val) { c[i].init(); });
            })({
                lw: new load_work_tiles_js_1.LoadWorkTiles(),
                sn: new scroll_nav_js_1.ScrollNav(),
                //sf: new SelectiveFix(),
                ti: new toggle_item_js_1.ToggleItem()
            });
        }
    }
});
