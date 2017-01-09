//Imports
const
  fs = require('fs'),
  jsdom = require('jsdom'),
  assert = require ('chai').assert;

const
  html: string = fs.readFileSync('src/index.html', 'utf-8'),
  jquery: string = fs.readFileSync('node_modules/jquery/dist/jquery.js', 'utf-8');

function done (e: Error, w: Window) {
  if (!e) {
    global['window'] = w;
    global['document'] = w.document;
    global['$'] = 'jQuery' in w ? w['jQuery'] : undefined;
    run();
  } else {
    console.error(e);
  }
}

jsdom.env({html: html, src: [jquery], done: done});

describe(`ToggleItem Class`, () => {
  it('Should have no active item at start', () => {
    assert.equal($('.active[data-toggle-for]').length, 0);
  });
  it('Should have one active item after click and should be the clicked item', () => {
    let item: HTMLElement = <HTMLElement>document.querySelector('[data-toggle-for]');
    item.click();
    assert.equal($('[data-toggle-for]').eq(0).hasClass('active'), true);
  });
});