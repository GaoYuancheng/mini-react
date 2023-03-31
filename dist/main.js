/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./react/createElement.js":
/*!********************************!*\
  !*** ./react/createElement.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createElement\": () => (/* binding */ createElement)\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n/**\r\n * 创建虚拟DOM结构\r\n * @param {*} type 标签\r\n * @param {*} props 属性\r\n * @param  {...any} children 自己诶单\r\n * @returns 虚拟DOM结构\r\n */\nfunction createElement(type, props) {\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n  console.log(\"createElement\", {\n    type: type,\n    props: props,\n    children: children\n  });\n  return {\n    type: type,\n    props: _objectSpread(_objectSpread({}, props), {}, {\n      children: children.map(function (child) {\n        return _typeof(child) === \"object\" ? child : createTextElement(child);\n      } //不是对象说明是文本节点\n      )\n    })\n  };\n}\n\n/**\r\n * 当children为非对象时，创建文本节点\r\n * @param {*} text 文本值\r\n * @returns 虚拟DOM结构\r\n */\nfunction createTextElement(text) {\n  return {\n    type: \"TEXT_ELEMENT\",\n    props: {\n      nodeValue: text,\n      children: []\n    }\n  };\n}\n\n//# sourceURL=webpack://gyc-react/./react/createElement.js?");

/***/ }),

/***/ "./react/index.js":
/*!************************!*\
  !*** ./react/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _createElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createElement */ \"./react/createElement.js\");\n\nvar React = {\n  createElement: _createElement__WEBPACK_IMPORTED_MODULE_0__.createElement\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (React);\n\n//# sourceURL=webpack://gyc-react/./react/index.js?");

/***/ }),

/***/ "./react/react-dom.js":
/*!****************************!*\
  !*** ./react/react-dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// react/react-dom.js\n\nvar isProperty = function isProperty(key) {\n  return key !== \"children\";\n};\n\n/**\r\n * 将虚拟 DOM 转换为真实 DOM 并添加到容器中\r\n * @param {element} 虚拟 DOM\r\n * @param {container} 真实 DOM\r\n */\nfunction render(element, container) {\n  console.log(\"container\", container);\n  // const dom = document.createElement(element.type);\n  var dom = null;\n  if (element.type == \"TEXT_ELEMENT\") {\n    dom = document.createTextNode(\"\");\n  } else {\n    dom = document.createElement(element.type);\n    element.props.children.forEach(function (child) {\n      return render(child, dom);\n    });\n  }\n  // 为节点绑定属性\n  Object.keys(element.props).filter(isProperty).forEach(function (name) {\n    dom[name] = element.props[name];\n  });\n  container.appendChild(dom);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  render: render\n});\n\n//# sourceURL=webpack://gyc-react/./react/react-dom.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../react */ \"./react/index.js\");\n/* harmony import */ var _react_react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../react/react-dom */ \"./react/react-dom.js\");\n\n\nvar element = /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\"div\", {\n  id: \"foo\"\n}, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\"div\", null, /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\"a\", null, \"bar\")), /*#__PURE__*/_react__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement(\"b\", null));\n_react_react_dom__WEBPACK_IMPORTED_MODULE_1__[\"default\"].render(element, document.getElementById(\"root\"));\n\n//# sourceURL=webpack://gyc-react/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;