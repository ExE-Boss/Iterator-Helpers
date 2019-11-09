"use strict";
var ES2018 = require("es-abstract/es2018");
var GetIntrinsic = require("es-abstract/GetIntrinsic");
var forEach = require("es-abstract/helpers/forEach");
/** @type {typeof globalThis & {[x: string]: any}} */
var global = require("globalthis")();
var define = require("define-properties");

var $IteratorProto = GetIntrinsic("%IteratorPrototype%", true);
var $AsyncIteratorProto = GetIntrinsic("%AsyncIteratorPrototype%", true);

var getPolyfill = require("./polyfill");

/** @typedef {NonNullable<Parameters<typeof Object.create>[0]>} obj */

/**
 * Copies all own properties from `target` to `source`
 * that don't exist on `target`.
 *
 * @template {obj} T
 * @template {obj} S
 * @param {T} target
 * @param {S} source
 * @return {T & Omit<S, keyof T>}
 */
function CopyOwnProperties(target, source) {
	forEach(ES2018.GetOwnPropertyKeys(source, "String"), function(key) {
		var desc = ES2018.OrdinaryGetOwnProperty(source, key);
		if (desc && !ES2018.HasOwnProperty(target, key)) {
			ES2018.OrdinaryDefineOwnProperty(target, key, desc);
		}
		// @ts-ignore
		delete source[key];
	});
	forEach(ES2018.GetOwnPropertyKeys(source, "Symbol"), function(key) {
		var desc = ES2018.OrdinaryGetOwnProperty(source, key);
		if (desc && !ES2018.HasOwnProperty(target, key)) {
			ES2018.OrdinaryDefineOwnProperty(target, key, desc);
		}
		// @ts-ignore
		delete source[key];
	});
	return /** @type {*} */ (target);
}

module.exports = function shimIteratorHelpers() {
	var polyfill = getPolyfill(),
		forceSync = false,
		forceAsync = false,
		IteratorPolyfill = polyfill.Iterator,
		IteratorPolyfillProto = IteratorPolyfill.prototype,
		AsyncIteratorPolyfill = polyfill.AsyncIterator,
		AsyncIteratorPolyfillProto = AsyncIteratorPolyfill.prototype;

	if ("Iterator" in global && global.Iterator !== IteratorPolyfill) {
		forceSync = true;
	}
	if ("AsyncIterator" in global && global.AsyncIterator !== AsyncIteratorPolyfill) {
		forceAsync = true;
	}

	// Make `Iterator.prototype` point to the correct prototype.
	if (
		$IteratorProto &&
		$IteratorProto !== IteratorPolyfillProto
	) {
		// @ts-ignore
		IteratorPolyfill.prototype = CopyOwnProperties(
			$IteratorProto,
			IteratorPolyfillProto
		);
	}

	// Make `AsyncIterator.prototype` point to the correct prototype.
	if (
		$AsyncIteratorProto &&
		$AsyncIteratorProto !== AsyncIteratorPolyfillProto
	) {
		// @ts-ignore
		AsyncIteratorPolyfill.prototype = CopyOwnProperties(
			$AsyncIteratorProto,
			AsyncIteratorPolyfillProto
		);
	}

	define(global, polyfill, {
		Iterator: function() {
			return forceSync;
		},
		AsyncIterator: function() {
			return forceAsync;
		}
	});

	return polyfill;
};
