// "use strict";
// const


// export class LoadDom {
//   private HTML: string = fs.readFileSync('src/index.html', 'utf-8');
//   private JQUERY: string = fs.readFileSync('node_modules/jquery/dist/jquery.js', 'utf-8');
//   protected assets;

//   public test() {}

//   public start(): void {
//     jsdom.env({html: this.HTML, src: [this.JQUERY], done: this.done});
//     console.log(typeof this.test + '1');
//   }

//   private done(error: Error, window: Window): void {
//     if (!error) {
//       this.assets = new Map([
//         ['window', window],
//         ['document', window.document]
//       ]);
//       for (var i in this) console.log(i);
//       this.test();
//     } else {
//       console.warn(error);
//     }

//     return void 0;
//   }
// }
