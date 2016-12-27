import { ToggleItem } from './units/ToggleItem';
import { DOMinate } from './components/dom-loader';
const expect = require ('chai').expect;

DOMinate(
  function ():void {
    const toggleItem = new ToggleItem;
    console.log(toggleItem);
    return void 0;
  }
);