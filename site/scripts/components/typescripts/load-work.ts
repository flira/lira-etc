/// <reference path="definitely-typed/jquery.d.ts" />
/// <reference path="definitely-typed/fl-tile.d.ts" />
'use strict';
export class LoadWork {
  data: FLTile;
  items: string;
  constructor() {
    this.data;
    this.items = "";
    this.template; //Template for the list items
    this.createItems; //Creates list items
    this.createList; //Creates the final list and bind it to the html
  }
  template(key: string): string {
    //add srcset only if available
    const srcset: string = this.data[key].tileSrcset
      ? `srcset="${this.data[key].tileSrcset}"`
      : '';
    return `<li class="works-item">
              <a class="works-anc" href="${this.data[key].anchor}">
                <figure class="works-fig">
                  <img class="works-img" src="${this.data[key].tileSrc}" ${srcset} alt="${this.data[key].title}"/>
                  <figcaption class="works-captcha">${this.data[key].title}</figcaption>
                </figure>
              </a>
            </li>`
  }
  createItems(): void {
    const self: LoadWork = this;
    $.each(this.data, function(i, val){
      self.items += self.template(i);
    });
    this.createList();
  }
  createList(): void {
      $('<ul/>', {
        'class': 'works-list',
        html: this.items
      }).replaceAll('[data-load-work]');
      $('.works-item')
        .find('img')
        .on('load', function(){
          $(this).parent().addClass('loaded');
        });
  }
  init(): void {
    var self: LoadWork = this;
    $.getJSON('scripts/components/content.json', function(data) {
        self.data = data;
        self.createItems();
    });
  }
}