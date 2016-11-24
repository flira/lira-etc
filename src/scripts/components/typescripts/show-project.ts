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
      if ('credits' in this._projectData) this._appendCredits();
      this._appendAbout();
      if ('git' in this._projectData) this._appendGit();
      this._appendImages();
      document.body.insertBefore(
        this._docFrag,
        document.getElementById('main-content')
      );
      //creates a small lag to make the css animation work
      setTimeout((): void => {
        $(document.body).addClass('project-open');
      }, 10);
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

  private _appendGit(): void {
    let
      section: HTMLElement = document.createElement('section'),
      header: HTMLHeadingElement = document.createElement('h2'),
      a: HTMLAnchorElement = document.createElement('a');

    header.textContent = 'This project on GitHub';
    section.appendChild(header);
    a.href = this._projectData['git'];
    a.target = '_blank';
    a.textContent = `${this._projectData['title']}'s repository`;
    section.appendChild(a);
    this._elements.content.appendChild(section);
    return void 0;
  }

  private _appendImages(): void {
    let
      section: HTMLElement = document.createElement('section'),
      header: HTMLHeadingElement = document.createElement('h2'),
      ul: HTMLUListElement = document.createElement('ul');
    
    header.textContent = 'Images';
    section.appendChild(header);
    ul.className = 'list-img';
    section.appendChild(ul);
    for (let i = 0, l = this._projectData['images'].length; i < l; i++) {
      let
        imgData: Object = this._projectData['images'][i],
        li: HTMLLIElement = document.createElement('li'),
        img: HTMLImageElement = document.createElement('img');

      img.src = imgData['src'];
      img.alt = imgData['alt'];
      if (this._srcsetSupport && 'srcset' in imgData) {
        img.srcset = imgData['srcset'];
      }
      li.appendChild(img);
      ul.appendChild(li);      
    }
    this._elements.content.appendChild(section);
    return void 0;
  }

  static getProjectAnchor(): string {
    const stringList = location.hash.split(CONST.PROJECTS_PATH);
    return stringList[stringList.length - 1];
  }
}