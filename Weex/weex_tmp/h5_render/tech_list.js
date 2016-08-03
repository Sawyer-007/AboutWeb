/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/97db1aa435546cd0160279c2d4fe41f5", [], function(__weex_require__, __weex_exports__, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      list: [
	        {event: 'Li Lei'},
	        {event: 'Han Meimei'},
	      ],
	      start: 0,
	      translateData: 0,
	    }},
	    methods: {
	      test: function (e) {
	        console.log(e.changedTouches[0].screenX);
	      },
	      recodePos: function (e) {
	        this.start = e.changedTouches[0].screenX;
	      },
	      translateEl: function () {

	      }
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "container",
	  "children": [
	    {
	      "type": "container",
	      "classList": [
	        "list"
	      ],
	      "repeat": function () {return this.list},
	      "children": [
	        {
	          "type": "container",
	          "events": {
	            "touchstart": "recodePos",
	            "touchmove": "test"
	          },
	          "classList": [
	            "content"
	          ],
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "text"
	              ],
	              "attr": {
	                "value": function () {return this.event}
	              }
	            },
	            {
	              "type": "container",
	              "classList": [
	                "icon"
	              ],
	              "children": [
	                {
	                  "type": "text",
	                  "attr": {
	                    "value": "Finish"
	                  }
	                }
	              ]
	            }
	          ]
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "list": {
	    "position": "relative",
	    "height": 140,
	    "width": 750,
	    "borderStyle": "solid",
	    "borderBottomWidth": 2,
	    "borderColor": "#dfdfdf",
	    "overflow": "hidden"
	  },
	  "text": {
	    "fontSize": 34,
	    "lineHeight": 138
	  },
	  "icon": {
	    "position": "absolute",
	    "right": 0,
	    "top": 10,
	    "height": 120,
	    "lineHeight": 120,
	    "borderLeftWidth": 2
	  },
	  "content": {
	    "width": 1000,
	    "transform": "scaleX(1)"
	  }
	})
	})
	;__weex_bootstrap__("@weex-component/97db1aa435546cd0160279c2d4fe41f5", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ }
/******/ ]);