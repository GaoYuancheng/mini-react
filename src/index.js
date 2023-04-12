import React from "../react";
import * as ReactDom from "../react/react-dom";
// import * as ReactDom from "../react/react-dom1";
import { longTimeScript } from "../script";

// await longTimeScript(2000);
// (async () => {
//   {
//     await longTimeScript(2000);
//   }
// })();

const element = (
  <div id="1">
    <div id="1-1">
      <a id="1-1-1">bar111</a>
      <a id="1-1-2">bar112</a>
    </div>
    <div id="1-2">
      <a id="1-2-1">bar121</a>
      <a id="1-2-2">bar122</a>
    </div>
    <b />
  </div>
);

const element1 = (
  <div id="1">
    <div id="1-1">
      <a id="1-1-1">bars111</a>
      <a id="1-1-2">bars112</a>
    </div>
    <a />
  </div>
);

ReactDom.render(element, document.getElementById("root"));

setTimeout(() => {
  ReactDom.render(element1, document.getElementById("root"));
  console.log("window.requestIdleCallback", window.requestIdleCallback);
}, 3000);
