"use strict";
const
  fs = require('fs'),
  jsdom = require('jsdom');

export const DOMinate: (method: () => void) => void =
  function (method: () => void): void {
    const
      html: string = fs.readFileSync('src/index.html', 'utf-8'),
      jQuery: string = fs.readFileSync('node_modules/jquery/dist/jquery.js', 'utf-8'),
      done: (error: any, window: any) => void =
        function (error: Error, window: Window): void {
          if (!error) {
            global['document'] = window.document;
            global['$'] = window.hasOwnProperty('jQuery') ? window['jQuery'] : undefined;
            method();
          } else {
            console.warn(error);
          }
          return void 0;
        };
    jsdom.env({html: html, src: [jQuery], done: done});
    return void 0;
  };