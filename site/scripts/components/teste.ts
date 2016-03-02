export class Test {
    msg: string;
    constructor (m: string) {
      this.msg = m;
    }
    print () {
      console.log(this.msg); 
    }
}