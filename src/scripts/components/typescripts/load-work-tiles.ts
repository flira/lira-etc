'use strict';
import * as $ from 'jquery';
import { JsonLoader } from './json-loader';

export class LoadWorkTiles extends JsonLoader implements Component{

  private readonly CONST = {
    CSS: {
      LOADED: 'loaded'
    },
    LISTENERS: {
      LOAD: this._addLoadedClass.bind(this)
    }
  };
  private _component: Element = document.querySelector('[data-load-work]');
  private _items: string = '';
  private _imgs: JQuery;
  constructor() {super();}

  public init(): void {
    Object.freeze(this.CONST);
    this.loadJson(this._createItems.bind(this));
  }
  private _template(key: string): string {
    //add srcset only if available
    const srcset: string = this.jsonData[key].tileSrcset
      ? `srcset="${this.jsonData[key].tileSrcset}"`
      : '';
    return `<li class="works-item">
              <a class="works-anc" href="#/works/${this.jsonData[key].anchor}">
                <figure class="works-fig">
                  <img class="works-img" src="${this.jsonData[key].tileSrc}" ${srcset} alt="${this.jsonData[key].title}"/>
                  <figcaption class="works-captcha">${this.jsonData[key].title}</figcaption>
                </figure>
              </a>
            </li>`
  }
  private _createItems(): void {
    $.each(this.jsonData, (i): void =>{
      this._items += this._template(i);
    });
    this._createList();
  }
  private _addLoadedClass(e: Event): void {
    const parent = (<Node>e.target).parentElement;
    parent.className += ` ${this.CONST.CSS.LOADED}`;
  }
  private _createList(): void {
    const list = $('<ul/>', {'class': 'works-list', html: this._items});
    list.replaceAll(this._component);
    this._imgs = list.find('img');
    this._imgs.on('load', this.CONST.LISTENERS.LOAD);
  }
}