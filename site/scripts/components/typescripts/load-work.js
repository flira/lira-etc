System.register([], function(exports_1) {
    /// <reference path="definitely-typed/jquery.d.ts" />
    /// <reference path="definitely-typed/fl-tile.d.ts" />
    'use strict';
    var LoadWork;
    return {
        setters:[],
        execute: function() {
            LoadWork = (function () {
                function LoadWork() {
                    this.data;
                    this.items = "";
                    this.template; //Template for the list items
                    this.createItems; //Creates list items
                    this.createList; //Creates the final list and bind it to the html
                }
                LoadWork.prototype.template = function (key) {
                    //add srcset only if available
                    var srcset = this.data[key].tileSrcset
                        ? "srcset=\"" + this.data[key].tileSrcset + "\""
                        : '';
                    return "<li class=\"works-item\">\n              <a class=\"works-anc\" href=\"" + this.data[key].anchor + "\">\n                <figure class=\"works-fig\">\n                  <img class=\"works-img\" src=\"" + this.data[key].tileSrc + "\" " + srcset + " alt=\"" + this.data[key].title + "\"/>\n                  <figcaption class=\"works-captcha\">" + this.data[key].title + "</figcaption>\n                </figure>\n              </a>\n            </li>";
                };
                LoadWork.prototype.createItems = function () {
                    var self = this;
                    $.each(this.data, function (i, val) {
                        self.items += self.template(i);
                    });
                    this.createList();
                };
                LoadWork.prototype.createList = function () {
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
                LoadWork.prototype.init = function () {
                    var self = this;
                    $.getJSON('scripts/components/content.json', function (data) {
                        self.data = data;
                        self.createItems();
                    });
                };
                return LoadWork;
            })();
            exports_1("LoadWork", LoadWork);
        }
    }
});
