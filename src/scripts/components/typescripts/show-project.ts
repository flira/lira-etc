import { CONST } from './constants';
import * as $ from 'jquery';

export class ShowProject {

  private _projectKey: string;
  private _docFrag: DocumentFragment = document.createDocumentFragment();
  private _projectData;
  private _srcsetSupport: boolean =
            ('srcset' in document.createElement('img'));
  private _elements = {
    project: document.createElement('article'),
    closeBtn: document.createElement('a'),
    content: document.createElement('div'),
    encap: document.createElement('div'),
  };

  public showProject () {
    this._projectKey = ShowProject.getProjectAnchor();
    CONST.JSON.loadJson(this._mountProject.bind(this));
  }

  private _mountProject() {
    if (this._projectKey in CONST.JSON.jsonData) {
      this._docFrag.textContent = '';
      this._projectData = CONST.JSON.jsonData[this._projectKey];
      this._elements.project.id = 'project';
      this._docFrag.appendChild(this._elements.project);
      this._appendBasicElements();
      this._appendHeader();
      if ("credits" in this._projectData) {
        this._appendCredits();
      }
      this._appendAbout();
    } else {
      console.warn('Sorry, project not found');
    }
  }

  private _appendBasicElements(): void {
    this._elements.closeBtn.className = 'project-ctrl';
    this._elements.encap.className = 'project-encap';
    this._elements.project.appendChild(this._elements.closeBtn);
    this._elements.project.appendChild(this._elements.encap);
    return void 0;
  }

  private _appendHeader(): void {
    let
      header: HTMLHeadingElement = document.createElement('h1'),
      div: HTMLDivElement = document.createElement('div'),
      img: HTMLImageElement = document.createElement('img');
    div.className = 'hero';
    img.src = this._projectData['heroSrc'];
    if (this._srcsetSupport && 'heroSrcset' in this._projectData) {
      img.srcset = this._projectData['heroSrcset'];
    }
    img.alt = this._projectData['title'];
    div.appendChild(img);
    this._elements.encap.appendChild(div);
    this._elements.content.className = 'content';
    this._elements.encap.appendChild(this._elements.content);
    header.textContent = this._projectData['title'];
    this._elements.content.appendChild(header);
    return void 0;
  }

  private _appendCredits(): void {
    let
      section: HTMLElement = document.createElement('section'),
      header: HTMLHeadingElement = document.createElement('h2'),
      dl: HTMLDListElement = document.createElement('dl');
    header.textContent = 'Credits';
    section.appendChild(header);
    $.each(this._projectData['credits'], (key, value): void =>  {
      let
        dt: HTMLElement = document.createElement('dt'),
        dd: HTMLElement = document.createElement('dd');
      dt.textContent = key;
      dd.textContent = value;
      dl.appendChild(dt);
      dl.appendChild(dd);
  } );


    section.appendChild(dl);
    this._elements.content.appendChild(section);

    return void 0;
  }

  private _appendAbout(): void {
    let
      section: HTMLElement = document.createElement('section'),
      header: HTMLHeadingElement = document.createElement('h2');
    header.textContent = 'About';
    section.appendChild(header);
    section.appendChild($('<div/>', {
      'class': 'fluid-txt',
      html: this._projectData['description']
    }).get(0));

    this._elements.content.appendChild(section);
    return void 0;
  }

  static getProjectAnchor(): string {
    const stringList = location.hash.split(CONST.PROJECTS_PATH);
    return stringList[stringList.length - 1];
  }
}