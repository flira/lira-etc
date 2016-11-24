import * as $ from 'jquery';

export class JsonLoader {
  protected jsonData;

  protected loadJson(method: Function): void {
    if (this.jsonData) {
      method();
    } else {
      $.getJSON('scripts/components/content.json', (data): void => {
        this.jsonData = data.projects;
        method();
      });
    }

    return void 0;
  };
}