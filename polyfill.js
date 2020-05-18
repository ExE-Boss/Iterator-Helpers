"use strict";
var GetIntrinsic = require("es-abstract/GetIntrinsic.js");
var IsConstructor = require("es-abstract/2018/IsConstructor.js");
var Type = require("es-abstract/2018/Type.js");

/** @type {{[x: string]: any}} */
var global = require("globalthis")();

var $IteratorPrototype = GetIntrinsic("%IteratorPrototype%", true);
var $AsyncIteratorPrototype = GetIntrinsic("%AsyncIteratorPrototype%", true);

var implementation = require("./implementation.js");

/** @return {{
	readonly Iterator: typeof implementation.Iterator;
	readonly AsyncIterator: typeof implementation.AsyncIterator;
}} */
module.exports = function getPolyfill() {
	var Iterator = global.Iterator;
	var AsyncIterator = global.AsyncIterator;

	if (
		Type($IteratorPrototype) !== "Object" ||
		!IsConstructor(Iterator) ||
		Iterator.prototype !== $IteratorPrototype
	) {
		Iterator = implementation.Iterator;
	}

	if (
		Type($AsyncIteratorPrototype) !== "Object" ||
		!IsConstructor(AsyncIterator) ||
		AsyncIterator.prototype !== $AsyncIteratorPrototype
	) {
		AsyncIterator = implementation.AsyncIterator;
	}

	return {
		Iterator: Iterator,
		AsyncIterator: AsyncIterator
	};
};
