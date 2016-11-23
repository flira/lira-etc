'use strict';
import * as $ from 'jquery';

export class LoadWorkTiles {
  data: FLTile;
  items: string;
  constructor() {
    this.data;
    this.items = "";
    this.template; //Template for the list items
    this.createItems; //Creates list items
    this.createList; //Creates the final list and insert it to the html
  }
  template(key: string): string {
    //add srcset only if available
    const srcset: string = this.data[key].tileSrcset
      ? `srcset="${this.data[key].tileSrcset}"`
      : '';
    return `<li class="works-item">
              <a class="works-anc" href="#/works/${this.data[key].anchor}">
                <figure class="works-fig">
                  <img class="works-img" src="${this.data[key].tileSrc}" ${srcset} alt="${this.data[key].title}"/>
                  <figcaption class="works-captcha">${this.data[key].title}</figcaption>
                </figure>
              </a>
            </li>`
  }
  createItems(): void {
    $.each(this.data, (i): void =>{
      this.items += this.template(i);
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
    $.getJSON('scripts/components/content.json', (data): void => {
        this.data = data.projects;
        this.createItems();
    });
  }
}