"use strict";
var define = require("define-properties");
var assign = require("es-abstract/helpers/assign");

var implementation = require("./implementation");
var getPolyfill = require("./polyfill");
var shim = require("./shim");

assign(exports, getPolyfill());

define(exports, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

if (define.supportsDescriptors && Object.defineProperty) {
	// @ts-ignore
	Object.defineProperty(exports, "__esModule", { value: true });
} else {
	// @ts-ignore
	exports.__esModule = true;
}
