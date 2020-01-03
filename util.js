/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
// @ts-nocheck
"use strict";
// Modified from tslib (https://www.npmjs.com/package/tslib)
/* eslint-disable */

var $setProto = require("es-abstract/helpers/setProto");
var assign = require("es-abstract/helpers/assign");

var getPolyfill = function() {
	var polyfill = require("./polyfill")();
	getPolyfill = function() {
		return polyfill;
	};
	return polyfill;
};

// prettier-ignore
exports.__generator = function __generator(thisArg, body) {
	var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
	return (
		// prettier-ignore
		(g = { next: verb(0), "throw": verb(1), "return": verb(2) }),
		typeof Symbol === "function" &&
			(g[Symbol.iterator] = function() {
				return this;
			}),
		getPolyfill().Iterator.prototype &&
			($setProto
				? $setProto(g, getPolyfill().Iterator.prototype)
				: assign(g, getPolyfill().Iterator.prototype)),
		g
	);
	function verb(n) { return function (v) { return step([n, v]); }; }
	function step(op) {
		if (f) throw new TypeError("Generator is already executing.");
		while (_) try {
			if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
			if (y = 0, t) op = [op[0] & 2, t.value];
			switch (op[0]) {
				case 0: case 1: t = op; break;
				case 4: _.label++; return { value: op[1], done: false };
				case 5: _.label++; y = op[1]; op = [0]; continue;
				case 7: op = _.ops.pop(); _.trys.pop(); continue;
				default:
					if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
					if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
					if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
					if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
					if (t[2]) _.ops.pop();
					_.trys.pop(); continue;
			}
			op = body.call(thisArg, _);
		} catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
		if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
	}
}

/**
 * @template V
 * @typedef {object} __await
 * @property {V} v
 */

/**
 * @template V
 * @param {V} v
 * @return {__await<V>}
 * @constructor
 */
function __await(v) {
	return this instanceof __await ? ((this.v = v), this) : new __await(v);
};
exports.__await = __await;

/**
 * @template T
 * @template {Iterator<any>} G
 *
 * @param {T} thisArg
 * @param {ArrayLike<any> | null | undefined} _arguments
 * @param {(this: T) => G} generator
 *
 * @return {G extends Iterator<infer T, infer TReturn, infer TNext> ? AsyncGenerator<T, TReturn, TNext> : AsyncGenerator}
 */
// prettier-ignore
exports.__asyncGenerator = function(thisArg, _arguments, generator) {
	if (!Symbol || !Symbol.asyncIterator) { throw new TypeError("Symbol.asyncIterator is not defined."); }
	var g = generator.apply(thisArg, _arguments || []), i, q = [];
	return (
		(i = {}),
		verb("next"),
		verb("throw"),
		verb("return"),
		(i[Symbol.asyncIterator] = function() {
			return this;
		}),
		getPolyfill().AsyncIterator.prototype &&
			($setProto
				? $setProto(g, getPolyfill().AsyncIterator.prototype)
				: assign(g, getPolyfill().AsyncIterator.prototype)),
		i
	);
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
