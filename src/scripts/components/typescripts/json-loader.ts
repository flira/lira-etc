import * as $ from 'jquery';

export class JsonLoader {
  public jsonData;

  public  loadJson(method: Function): void {
    if (this.jsonData) {
      method();
    } else {
      $.getJSON('./content.json', (data): void => {
        this.jsonData = data;
        method();
      });
    }

    return void 0;
  };
}
