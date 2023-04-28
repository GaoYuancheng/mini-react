import React from "../react";
import * as ReactDom from "../react/react-dom";

// import React from "react";
// import * as ReactDom from "react-dom";
// import * as ReactDom from "../react/react-dom1";
import { longTimeScript } from "../script";

// await longTimeScript(2000);
// (async () => {
//   {
//     await longTimeScript(2000);
//   }
// })();

// const element = (
//   <div id="1">
//     <div id="1-1">
//       <a id="1-1-1">bar111</a>
//       <a id="1-1-2">bar112</a>
//     </div>
//     <div id="1-2">
//       <a id="1-2-1">bar121</a>
//       <a id="1-2-2">bar122</a>
//     </div>
//     <b />
//   </div>
// );

const element1 = (
  <div id="1">
    <div id="1-1">
      <a
        id="1-1-1"
        onClick={() => {
          console.log("ss");
        }}
      >
        bars111
      </a>
      <a id="1-1-2">
        bars112
        <span>bars1121</span>
      </a>
    </div>
    <a />
  </div>
);

function App(props) {
  // const [state, setState] = React.useState(1);
  return (
    <div>
      <h1>Count: 1</h1>
      {/* <button onClick={() => setState((c) => c + 1)}>+1</button> */}
    </div>
  );
}

ReactDom.render(<App name="foo"></App>, document.getElementById("root"));

// ReactDom.render(element, document.getElementById("root"));

setTimeout(() => {
  ReactDom.render(element1, document.getElementById("root"));
}, 3000);
