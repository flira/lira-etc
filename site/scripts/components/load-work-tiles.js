System.register([], function(exports_1) {
    /// <reference path="definitely-typed/jquery.d.ts" />
    /// <reference path="definitely-typed/fl-tile.d.ts" />
    'use strict';
    var LoadWorkTiles;
    return {
        setters:[],
        execute: function() {
            LoadWorkTiles = (function () {
                function LoadWorkTiles() {
                    this.data;
                    this.items = "";
                    this.template; //Template for the list items
                    this.createItems; //Creates list items
                    this.createList; //Creates the final list and insert it to the html
                }
                LoadWorkTiles.prototype.template = function (key) {
                    //add srcset only if available
                    var srcset = this.data[key].tileSrcset
                        ? "srcset=\"" + this.data[key].tileSrcset + "\""
                        : '';
                    return "<li class=\"works-item\">\n              <a class=\"works-anc\" href=\"#works/" + this.data[key].anchor + "\">\n                <figure class=\"works-fig\">\n                  <img class=\"works-img\" src=\"" + this.data[key].tileSrc + "\" " + srcset + " alt=\"" + this.data[key].title + "\"/>\n                  <figcaption class=\"works-captcha\">" + this.data[key].title + "</figcaption>\n                </figure>\n              </a>\n            </li>";
                };
                LoadWorkTiles.prototype.createItems = function () {
                    var _this = this;
                    $.each(this.data, function (i, val) {
                        _this.items += _this.template(i);
                    });
                    this.createList();
                };
                LoadWorkTiles.prototype.createList = function () {
                    $('<ul/>', {
                        'class': 'works-list',
                        html: this.items
                    }).replaceAll('[data-load-work]');
                    $('.works-item')
                        .find('img')
                        .on('load', function () {
                        $(this).parent().addClass('loaded');
                    });
                };
                LoadWorkTiles.prototype.init = function () {
                    var _this = this;
                    $.getJSON('scripts/components/content.json', function (data) {
                        _this.data = data.projects;
                        _this.createItems();
                    });
                };
                return LoadWorkTiles;
            })();
            exports_1("LoadWorkTiles", LoadWorkTiles);
        }
    }
});
