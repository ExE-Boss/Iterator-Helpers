"use strict";
var GetIntrinsic = require("es-abstract/GetIntrinsic.js");
var DefinePropertyOrThrow = require("es-abstract/2018/DefinePropertyOrThrow.js");
var IsExtensible = require("es-abstract/2018/IsExtensible.js");
var OrdinaryGetOwnProperty = require("es-abstract/2018/OrdinaryGetOwnProperty.js");

var OwnPropertyKeys = require("es-abstract/helpers/OwnPropertyKeys.js");
var forEach = require("es-abstract/helpers/forEach.js");

/** @type {{[x: string]: any}} */
var global = require("globalthis")();
var define = require("define-properties");
var has = require("has");

var $IteratorPrototype = GetIntrinsic("%IteratorPrototype%", true);
var $AsyncIteratorPrototype = GetIntrinsic("%AsyncIteratorPrototype%", true);

var getPolyfill = require("./polyfill");

/**
 * Copies all own properties from `target` to `source`
 * that don't exist on `target`.
 *
 * @template {object} T
 * @template {object} S
 * @param {T} target
 * @param {S} source
 * @return {T & Omit<S, keyof T>}
 */
function CopyOwnProperties(target, source) {
	if (!IsExtensible(target)) {
		return /** @type {*} */ (source);
	}
	forEach(OwnPropertyKeys(target), function (key) {
		var desc = OrdinaryGetOwnProperty(source, key);
		if (desc && !has(target, key)) {
			DefinePropertyOrThrow(target, key, desc);
		}
		// @ts-ignore
		delete source[key];
	});
	return /** @type {*} */ (target);
}

module.exports = function shimIteratorHelpers() {
	var polyfill = getPolyfill();
	var forceSync = false;
	var forceAsync = false;
	var IteratorPolyfill = polyfill.Iterator;
	var IteratorPolyfillPrototype = IteratorPolyfill.prototype;
	var AsyncIteratorPolyfill = polyfill.AsyncIterator;
	var AsyncIteratorPolyfillPrototype = AsyncIteratorPolyfill.prototype;

	if (has(global, "Iterator") && global.Iterator !== IteratorPolyfill) {
		forceSync = true;
	}
	if (has(global, "AsyncIterator") && global.AsyncIterator !== AsyncIteratorPolyfill) {
		forceAsync = true;
	}

	// Make `Iterator.prototype` point to the correct prototype.
	if (
		$IteratorPrototype &&
		$IteratorPrototype !== IteratorPolyfillPrototype
	) {
		DefinePropertyOrThrow(IteratorPolyfill, "prototype", {
			"[[Value]]": CopyOwnProperties(
				$IteratorPrototype,
				IteratorPolyfillPrototype
			),
			"[[Writable]]": false
		});
	}

	// Make `AsyncIterator.prototype` point to the correct prototype.
	if (
		$AsyncIteratorPrototype &&
		$AsyncIteratorPrototype !== AsyncIteratorPolyfillPrototype
	) {
		DefinePropertyOrThrow(AsyncIteratorPolyfill, "prototype", {
			"[[Value]]": CopyOwnProperties(
				$AsyncIteratorPrototype,
				AsyncIteratorPolyfillPrototype
			),
			"[[Writable]]": false
		});
	}

	define(global, polyfill, {
		Iterator: function () {
			return forceSync;
		},
		AsyncIterator: function () {
			return forceAsync;
		}
	});

	return polyfill;
};
