'use strict';
import * as $ from 'jquery';
import { ShowProject } from './show-project';
import { CONST } from './constants';

export class LoadWorkTiles implements Component{

  private readonly CONST = {
    ELEMENTS: {
      COMPONENT: document.querySelector('[data-load-work]'),
      LOAD_MSG: document.getElementById('load-msg')
    },
    LISTENERS: {
      CLICK: this._chooseProject.bind(this),
      LOAD: this._addLoadedClass.bind(this)
    }
  };
  private _items: string = '';
  private _imgs: JQuery;
  private _anchors: JQuery;

  public init(): void {
    Object.freeze(this.CONST);
    CONST.JSON.loadJson(this._createItems.bind(this));
  }
  static template(key: string): string {
    //add srcset only if available
    const srcset: string = CONST.JSON.jsonData[key].tileSrcset
      ? `srcset="${CONST.JSON.jsonData[key].tileSrcset}"`
      : '';
    return `<li class="works-item">
              <a class="works-anc" href="${CONST.PROJECTS_PATH}${key}">
                <figure class="works-fig">
                  <img class="works-img" src="${CONST.JSON.jsonData[key].tileSrc}" ${srcset} alt="${CONST.JSON.jsonData[key].title}"/>
                  <figcaption class="works-captcha">${CONST.JSON.jsonData[key].title}</figcaption>
                </figure>
              </a>
            </li>`
  }
  private _createItems(): void {
    $.each(CONST.JSON.jsonData, (i): void =>{
      this._items += LoadWorkTiles.template(i);
    });
    this._createList();
  }
  private _addLoadedClass(e: Event): void {
    const parent = (<Node>e.currentTarget).parentElement;
    parent.className += ` ${CONST.CSS.LOADED}`;
  }
  private _chooseProject(e: Event): boolean {
    let project = new ShowProject();
    e.preventDefault();
    const href: string = (<HTMLAnchorElement>e.currentTarget).hash;
    history.pushState(CONST.HISTORY_SECTION, CONST.PAGE_TITLE, href);
    project.init();
    return false;
  }
  private _createList(): void {
    const list = $('<ul/>', {'class': 'works-list', html: this._items});
    list.replaceAll(this.CONST.ELEMENTS.COMPONENT);
    this._imgs = list.find('img');
    this._anchors = list.find('a');
    this._imgs.on('load', this.CONST.LISTENERS.LOAD);
    this._anchors.on('click', this.CONST.LISTENERS.CLICK);
  }
}