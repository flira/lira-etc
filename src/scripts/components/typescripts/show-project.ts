import { CONST } from './constants';
import * as $ from 'jquery';

export class ShowProject implements Component {

  readonly CONST = {
    CSS: {
      SHOW: 'project-open'
    },
    LISTENERS: {
      CLICK: this._closeProject.bind(this),
      LOAD: this._imageLoaded.bind(this),
      RESIZE: this._removeBodyWidth.bind(this)
    },
    ELEMENTS: {
      MAIN_HEADER: document.getElementById('main-menu')
    }
  };

  // Project key on the json
  private _projectKey: string;
  // Document fragment, where the component will be built before being
  // appended to the DOM
  private _docFrag: DocumentFragment = document.createDocumentFragment();
  // Object with properties to build the project page
  private _projectData;
  // Test if browser have support to srcset
  private _srcsetSupport: boolean =
            ('srcset' in document.createElement('img'));
  // Elements accessed on more than one method
  private _elements = {
    project: document.createElement('article'),
    closeBtn: document.createElement('a'),
    content: document.createElement('div'),
    encap: document.createElement('div'),
    hero: document.createElement('div')
  };

  /**
   * @description
   * Returns a possible project key from the address bar
   *
   * @return {string}
   * @static
   */
  static getProjectAnchor(): string {
    const regex: RegExp = new RegExp(CONST.PROJECTS_PATH);

    return regex.test(location.hash) ?
      location.hash.split(CONST.PROJECTS_PATH).pop() : '';
  }

  public init () {
    this._projectKey = ShowProject.getProjectAnchor();
    if (this._projectKey.length) {
      CONST.JSON.loadJson(this._mountProject.bind(this));
    }
  }

  /**
   * @description
   * Mounts projects pages
   * 
   * @private
   */
  private _mountProject(): void {
    if (this._projectKey in CONST.JSON.jsonData) {
      this._docFrag.textContent = '';
      this._projectData = CONST.JSON.jsonData[this._projectKey];
      this._elements.project.id = 'project';
      this._docFrag.appendChild(this._elements.project);
      this._appendBasicElements();
      this._appendHeader();
      if ('credits' in this._projectData) this._appendCredits();
      this._appendAbout();
      if ('url' in this._projectData) this._appendUrl();
      if ('git' in this._projectData) this._appendGit();
      this._appendImages();
      document.body.insertBefore(
        this._docFrag,
        document.getElementById('main-content')
      );
      this._elements.project.style.top =  window.pageYOffset + 'px';
      // This is added to avoid a small screen that occur when the body scroll is removed
      document.body.style.width = this.CONST.ELEMENTS.MAIN_HEADER.style.width =
        document.body.offsetWidth + 'px';
      window.addEventListener('resize', this.CONST.LISTENERS.RESIZE);
      // creates a small lag to make the css animation work
      setTimeout((): void => {
        $(document.body).addClass(this.CONST.CSS.SHOW);
      }, 10);
    } else {
      console.warn('Sorry, project not found');
    }

    return void 0;
  }

  /**
   * @description
   * Appends structural elements and add a click event to the area
   * outside the project to close it
   *
   * @private
   */
  private _appendBasicElements(): void {
    this._elements.closeBtn.className = 'project-ctrl';
    this._elements.project.addEventListener('click', this.CONST.LISTENERS.CLICK);
    this._elements.encap.className = 'project-encap';
    this._elements.project.appendChild(this._elements.closeBtn);
    this._elements.project.appendChild(this._elements.encap);

    return void 0;
  }

  /**
   * @description
   * Appends hero image and the project title
   * 
   * @private
   */
  private _appendHeader(): void {
    let
      header: HTMLHeadingElement = document.createElement('h1');
      // img: HTMLImageElement = document.createElement('img');

    this._elements.hero.className = 'hero';
    // img.src = this._projectData['heroSrc'];
    // if (this._srcsetSupport && 'heroSrcset' in this._projectData) {
    //   img.srcset = this._projectData['heroSrcset'];
    // }
    // img.alt = this._projectData['title'];
    // img.addEventListener('load', this.CONST.LISTENERS.LOAD);
    this._elements.hero.style.backgroundImage =
      `url(${this._projectData['heroSrc']})`;
    // this._elements.hero.appendChild(img);
    this._elements.encap.appendChild(this._elements.hero);
    this._elements.content.className = 'content';
    this._elements.encap.appendChild(this._elements.content);
    header.textContent = this._projectData['title'];
    this._elements.content.appendChild(header);

    return void 0;
  }

  /**
   * @description
   * Appends the project credits section
   * 
   * @private
   */
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

  /**
   * @description
   * Appends the project about section
   *
   * @private
   */
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

  /**
   * @description
   * Appends a link to the original work
   *
   * @private
   */
  private _appendUrl(): void {
    let
      section: HTMLElement = document.createElement('section'),
      header: HTMLHeadingElement = document.createElement('h2'),
      a: HTMLAnchorElement = document.createElement('a');

    header.textContent = 'URL';
    section.appendChild(header);
    a.href = this._projectData['url'];
    a.target = '_blank';
    a.textContent = `${this._projectData['url']}`;
    section.appendChild(a);
    this._elements.content.appendChild(section);

    return void 0;
  }

  /**
   * @description
   * Appends a link to the project github's repository
   *
   * @private
   */
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

  /**
   * @description
   * Appends the project images
   *
   * @private
   */
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
      if ('shadow' in imgData) {
        img.className = 'no-shadow';
      }
      img.addEventListener('load', this.CONST.LISTENERS.LOAD);
      li.appendChild(img);
      ul.appendChild(li);
    }
    this._elements.content.appendChild(section);

    return void 0;
  }

  /**
   * @description
   * Adds a CSS class to loaded images
   *
   * @param e: Event
   * @private
   */
  private _imageLoaded(e: Event): void {
    const target: EventTarget = e.currentTarget;

    (<HTMLElement>target).className += ` ${CONST.CSS.LOADED}`;
    target.removeEventListener('load', this.CONST.LISTENERS.LOAD);

    return void 0;
  }

  /**
   * @description
   * Resets body width
   *
   * @private
   */
  private _removeBodyWidth(): void {
    document.body.style.width = this.CONST.ELEMENTS.MAIN_HEADER.style.width = '';

    return void 0;
  }

  /**
   * @description
   * Hides and removes the project from the DOM
   *
   * @param e: Event
   * @private
   */
  private _closeProject(e: Event): void {
    if (e.target === e.currentTarget || e.target === this._elements.closeBtn) {
      history.pushState(CONST.HISTORY_SECTION, CONST.PAGE_TITLE, '');
      document.body.style.overflow = 'hidden';
      $(document.body).removeClass(this.CONST.CSS.SHOW);
      this._elements.closeBtn.removeEventListener('click', this.CONST.LISTENERS.CLICK);
      setTimeout((): void => {
        document.body.style.overflow = '';
        if (document.body.contains(this._elements.project)) {
          document.body.removeChild(this._elements.project);
          this._removeBodyWidth();
        }
      }, 500);
    } else {
      e.stopImmediatePropagation();
    }
  }
}
