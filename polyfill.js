"use strict";
var ES = require("es-abstract");
var GetIntrinsic = require("es-abstract/GetIntrinsic");
var $getProto = require("es-abstract/helpers/getProto");
/** @type {typeof globalThis & {[x: string]: any}} */
var global = require("globalthis")();

var $IteratorProto = GetIntrinsic("%IteratorPrototype%", true);
var $AsyncIteratorProto = GetIntrinsic("%AsyncIteratorPrototype%", true);

var implementation = require("./implementation");

/** @typedef {NonNullable<Parameters<typeof Object.create>[0]>} obj */

/**
 * Determines whether `obj` has `proto` in its prototype chain.
 */
var hasProto = (function() {
	/**
	 * @param {obj} obj
	 * @param {obj} proto
	 *
	 * @return {boolean}
	 */
	function hasProto(obj, proto) {
		if (obj === proto) {
			return true;
		}
		if ($getProto === null) {
			// Old IE
			if (typeof proto.constructor !== "function") {
				return false;
			}
			try {
				return obj instanceof proto.constructor;
			} catch (e) {
				return false;
			}
		}
		return hasProto($getProto(obj), proto);
	}

	return /** @param {any} obj @param {any} proto */ function(obj, proto) {
		if (ES.Type(obj) !== "Object") {
			return false;
		}
		if (ES.Type(proto) !== "Object") {
			return false;
		}
		return hasProto(obj, proto);
	};
})();

/**
 * @return {typeof import('./implementation')}
 */
module.exports = function getPolyfill() {
	var Iterator, AsyncIterator;
	if (
		ES.Type($IteratorProto) === "Object" &&
		ES.Type(global.Iterator) === "Object" &&
		// According to the specification `Iterator.prototype` extends or is `%IteratorPrototype%`
		hasProto(global.Iterator.prototype, $IteratorProto)
	) {
		Iterator = global.Iterator;
	} else {
		Iterator = implementation.Iterator;
	}

	if (
		ES.Type($AsyncIteratorProto) === "Object" &&
		ES.Type(global.AsyncIterator) === "Object" &&
		// According to the specification `AsyncIterator.prototype` extends or is `%AsyncIteratorPrototype%`
		hasProto(global.AsyncIterator.prototype, $AsyncIteratorProto)
	) {
		AsyncIterator = global.AsyncIterator;
	} else {
		AsyncIterator = implementation.AsyncIterator;
	}

	return {
		Iterator: Iterator,
		AsyncIterator: AsyncIterator
	};
};
