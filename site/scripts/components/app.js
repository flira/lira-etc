(function(ng){
    'use strict';
    ng.module('liraEtc', ['flScroller']);
    ng.element(document).ready(function(){
        ng.bootstrap(document, ['liraEtc']);
    });
}(angular));