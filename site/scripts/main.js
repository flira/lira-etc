/// <reference path="definitely-typed/jquery.d.ts" />
'use strict';
//var scroll_address_js_1 = require('scripts/components/typescripts/scroll-address.js');
var scroll_nav_js_1 = require('scripts/components/scroll-nav.js');
//import {SelectiveFix} from 'scripts/components/typescripts/selective-fix.js';
var toggle_item_js_1 = require('scripts/components/toggle-item.js');
var load_work_tiles_js_1 = require('scripts/components/typescripts/load-work-tiles.js');
(function (c) {
    $.each(c, function (i, val) { c[i].init(); });
})({
    lw: new load_work_tiles_js_1.LoadWorkTiles(),
   // sa: new scroll_address_js_1.ScrollAddress(),
    sn: new scroll_nav_js_1.ScrollNav(),
    //sf: new SelectiveFix(),
    ti: new toggle_item_js_1.ToggleItem()
});
