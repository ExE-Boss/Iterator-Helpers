"use strict";
var define = require("define-properties");
var assign = require("es-abstract/helpers/assign.js");

var implementation = require("./implementation.js");
var getPolyfill = require("./polyfill.js");
var shim = require("./shim.js");

assign(exports, getPolyfill());

define(exports, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});
