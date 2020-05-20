"use strict";

var GetIntrinsic = require("es-abstract/GetIntrinsic.js");

var AdvanceStringIndex = require("es-abstract/2018/AdvanceStringIndex.js");
var Call = require("es-abstract/2018/Call.js");
var GetMethod = require("es-abstract/2018/GetMethod.js");
var GetV = require("es-abstract/2018/GetV.js");
var IsArray = require("es-abstract/2018/IsArray.js");
var IsCallable = require("es-abstract/2018/IsCallable.js");
var IteratorComplete = require("es-abstract/2018/IteratorComplete.js");
var Type = require("es-abstract/2018/Type.js");

var ES = {
	AdvanceStringIndex: AdvanceStringIndex,
	GetMethod: GetMethod,
	IsArray: IsArray,
	Type: Type
};

var callBound = require("es-abstract/helpers/callBound.js");
var getIteratorMethod = require("es-abstract/helpers/getIteratorMethod.js");

var inspect = require("object-inspect");
var hasSymbols = require("has-symbols")();

var $asyncIterator =
	/** @type {typeof Symbol.asyncIterator | undefined} */
	(GetIntrinsic("%Symbol.asyncIterator%", true));

var $TypeError = GetIntrinsic("%TypeError%");
var $Promise = GetIntrinsic("%Promise%");
var $PromiseProto_then =
	/** @type {<T, TReturn = T, TCatch = never>(
		promise: Promise<T>,
		onFulfilled?: ((value: T) => TReturn | PromiseLike<TReturn>) | null,
		onRejected?: ((reason: any) => TCatch | PromiseLike<TCatch>) | null,
	) => Promise<TReturn | TCatch>} */
	(callBound("%PromiseProto_then%"));

/** @type {undefined} */
var undefined;

/**
 * @template {Iterator<any, any, any> | AsyncIterator<any, any, any>} I
 * @typedef {import("./abstract-ops.js").IteratorRecord<I>} IteratorRecord
 */

/**
 * @template O
 * @param {O} obj
 * @return {
	O extends Iterator<any, any, any> | AsyncIterator<any, any, any>
		? IteratorRecord<O>
		: never
} */
function GetIteratorDirect(obj) {
	if (Type(obj) !== "Object") {
		throw new $TypeError("obj must be an Object, got " + Type(obj));
	}

	var nextMethod = GetV(obj, "next");
	if (!IsCallable(nextMethod)) {
		throw new $TypeError(inspect(nextMethod) + " is not a function");
	}

	// @ts-ignore
	return {
		"[[Iterator]]": obj,
		"[[NextMethod]]": nextMethod,
		"[[Done]]": false
	};
}
exports.GetIteratorDirect = GetIteratorDirect;

/**
 * @template T, TReturn, TNext
 * @param {IteratorRecord<Iterator<T, TReturn, TNext>>} iteratorRecord
 * @param {TNext} [value]
 * @return {false | IteratorYieldResult<T>}
 */
function IteratorStep(iteratorRecord, value) {
	/** @type {IteratorResult<T, TReturn>} */
	var result =
		arguments.length > 1
			? IteratorNext(iteratorRecord, value)
			: IteratorNext(iteratorRecord);
	return IteratorComplete(result) ? false : result;
}
exports.IteratorStep = IteratorStep;

/**
 * @template T, TReturn, TNext
 * @param {IteratorRecord<{ next(value?: TNext): any }>} iteratorRecord
 * @param {TNext} [value]
 * @return {IteratorResult<T, TReturn>}
 */
function IteratorNext(iteratorRecord, value) {
	/** @type {any} */
	var result = Call(
		iteratorRecord["[[NextMethod]]"],
		iteratorRecord["[[Iterator]]"],
		arguments.length < 2 ? [] : [value]
	);
	if (Type(result) !== "Object") {
		throw new $TypeError("iterator next must return an object");
	}
	return result;
}
exports.IteratorNext = IteratorNext;

/**
 * @template O
 * @template {globalThis.Iterator<any, any, any> | globalThis.AsyncIterator<any, any, any>} I
 * @param {O} obj The iterable
 * @param {"sync" | "async"} [hint] Whether to use a synchronous or asynchronous iterator.
 * @param {(this: O) => I} [method] The method to use to get the `Iterator`
 * @return {IteratorRecord<I>}
 */
// https://ecma-international.org/ecma-262/9.0/#sec-getiterator
function GetIterator(obj, hint, method) {
	var actualHint = hint;
	if (arguments.length < 2) {
		actualHint = "sync";
	}
	if (actualHint !== "sync" && actualHint !== "async") {
		// prettier-ignore
		throw new $TypeError("Assertion failed: `hint` must be one of 'sync' or 'async', got " + inspect(hint));
	}
	/** @type {*} */
	var actualMethod = method;
	if (arguments.length < 3) {
		if (actualHint === "async") {
			if (hasSymbols && $asyncIterator) {
				actualMethod = GetMethod(obj, $asyncIterator);
			}
			if (actualMethod === undefined) {
				throw new $TypeError(
					"async from sync iterators aren't currently supported"
				);
			}
		} else {
			actualMethod = getIteratorMethod(ES, obj);
		}
	}
	/** @type {I} */
	var iterator = Call(actualMethod, obj);
	if (Type(iterator) !== "Object") {
		throw new $TypeError("iterator must return an object");
	}
	/** @type {*} */
	var nextMethod = GetV(iterator, "next");
	return {
		"[[Iterator]]": iterator,
		"[[NextMethod]]": nextMethod,
		"[[Done]]": false
	};
}
exports.GetIterator = GetIterator;

/**
 * @typedef {(value: any) => any} promiseThenChain.ExecutorCallbackFunction
 * @typedef {{
    onFulfilled?(value: any): any;
    onRejected?(value: any): any;
}} promiseThenChain.ExecutorCallbackInterface
 * @typedef {
    | promiseThenChain.ExecutorCallbackFunction
    | promiseThenChain.ExecutorCallbackInterface
} promiseThenChain.ExecutorCallback
 */
/**
 * @param {() => any} [executor]
 * @param {promiseThenChain.ExecutorCallback[]} thens
 * @type {(
    executor: () => any,
    ...thens: promiseThenChain.ExecutorCallback[]
) => Promise<any>} */
function promiseThenChain(executor) {
	var length = arguments.length;
	var promise = new $Promise(function (resolve) {
		var result;
		if (IsCallable(executor)) {
			result = executor();
		}
		resolve(result);
	});
	for (var i = 1; i < length; i++) {
		/** @type {promiseThenChain.ExecutorCallback} */
		var thens = arguments[i];
		if (IsCallable(thens)) {
			promise = $PromiseProto_then(promise, thens);
		} else {
			promise = $PromiseProto_then(
				promise,
				thens.onFulfilled,
				thens.onRejected
			);
		}
	}
	return promise;
}
exports.promiseThenChain = promiseThenChain;

/**
 * @template T
 * @param {
    | IteratorRecord<globalThis.Iterator<any, any, any>>
    | IteratorRecord<globalThis.AsyncIterator<any, any, any>>} iteratorRecord
 * @param {() => T | PromiseLike<T>} completion
 * @return {Promise<T>}
 */
// https://ecma-international.org/ecma-262/9.0/#sec-asynciteratorclose
function AsyncIteratorClose(iteratorRecord, completion) {
	var iterator = iteratorRecord["[[Iterator]]"];
	if (Type(iterator) !== "Object") {
		throw new $TypeError(
			"Assertion failed: Type(iteratorRecord.[[Iterator]]) is not Object"
		);
	}
	if (!IsCallable(completion)) {
		throw new $TypeError(
			"Assertion failed: completion is not a thunk for a Completion Record"
		);
	}
	return promiseThenChain(function () {
		var iteratorReturn =
			/** @type {NonNullable<typeof iterator.return>} */
			(GetMethod(iterator, "return"));
		if (iteratorReturn === undefined) {
			return completion();
		}

		return promiseThenChain(
			function executor() {
				return Call(iteratorReturn, iterator, []);
			},
			{
				/** @param {IteratorResult<any>} innerResult */
				onFulfilled: function onFulfilled(innerResult) {
					// if innerResult worked, then throw if the completion does
					var completionRecord = completion();
					if (Type(innerResult) !== "Object") {
						throw new $TypeError(
							"iterator .return must return an object"
						);
					}
					return completionRecord;
				},
				/** @param {any} err */
				onRejected: function onRejected(err) {
					// if we hit here, then "e" is the innerResult completion that needs re-throwing
					// if the completion is of type "throw", this will throw.
					completion();
					// if not, then return the innerResult completion
					throw err;
				}
			}
		);
	});
}
exports.AsyncIteratorClose = AsyncIteratorClose;
