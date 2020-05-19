/// <reference lib="es2018"/>
"use strict";
declare function require<T = any>(id: string): T;

const tslib_1: typeof import("../util.js") = require("./util.js"),
	{ __generator, __await, __asyncGenerator } = tslib_1;

import type {
	Iterator as $IteratorPolyfill,
	AsyncIterator as $AsyncIteratorPolyfill,
} from "../implementation.js";

import GetIntrinsic = require("es-abstract/GetIntrinsic.js");

import AdvanceStringIndex = require("es-abstract/2018/AdvanceStringIndex.js");
import Call = require("es-abstract/2018/Call.js");
import CreateMethodProperty = require("es-abstract/2018/CreateMethodProperty.js");
import DefinePropertyOrThrow = require("es-abstract/2018/DefinePropertyOrThrow.js");
import GetMethod = require("es-abstract/2018/GetMethod.js");
import GetV = require("es-abstract/2018/GetV.js");
import Invoke = require("es-abstract/2018/Invoke.js");
import IsArray = require("es-abstract/2018/IsArray.js");
import IsCallable = require("es-abstract/2018/IsCallable.js");
import IteratorClose = require("es-abstract/2018/IteratorClose.js");
import IteratorComplete = require("es-abstract/2018/IteratorComplete.js");
import IteratorValue = require("es-abstract/2018/IteratorValue.js");
import OrdinaryHasInstance = require("es-abstract/2018/OrdinaryHasInstance.js");
import OrdinaryObjectCreate = require("es-abstract/2018/ObjectCreate.js");
import ToBoolean = require("es-abstract/2018/ToBoolean.js");
import ToInteger = require("es-abstract/2018/ToInteger.js");
import Type = require("es-abstract/2018/Type.js");

const ES = {
	AdvanceStringIndex,
	GetMethod,
	IsArray,
	Type,
};

import callBound = require("es-abstract/helpers/callBound.js");
import getIteratorMethod = require("es-abstract/helpers/getIteratorMethod.js");
import $setProto = require("es-abstract/helpers/setProto.js");

import bind = require("function-bind");
import define = require("define-properties");
import hasOwnProperty = require("has");
import inspect = require("object-inspect");
import SLOT = require("internal-slot");

const hasSymbols: boolean = require("has-symbols")();

/** @type {typeof Symbol.iterator | undefined} */
// prettier-ignore
const $iterator: typeof Symbol.iterator | undefined = (GetIntrinsic("%Symbol.iterator%", true)) as typeof Symbol.iterator | undefined;
const $IteratorProto = GetIntrinsic("%IteratorPrototype%", true);

/** @type {typeof Symbol.asyncIterator | undefined} */
// prettier-ignore
const $asyncIterator: typeof Symbol.asyncIterator | undefined = (GetIntrinsic("%Symbol.asyncIterator%", true)) as typeof Symbol.asyncIterator | undefined;
const $AsyncIteratorProto = GetIntrinsic("%AsyncIteratorPrototype%", true);

/** @type {typeof Symbol.toStringTag | undefined} */
// prettier-ignore
const $toStringTag: typeof Symbol.toStringTag | undefined = (GetIntrinsic("%Symbol.toStringTag%", true)) as typeof Symbol.toStringTag | undefined;

const $RangeError = GetIntrinsic("%RangeError%");
const $TypeError = GetIntrinsic("%TypeError%");
const $Promise = GetIntrinsic("%Promise%");
/** @type {<T, TReturn = T, TCatch = never>(
	promise: Promise<T>,
	onFulfilled?: ((value: T) => TReturn | PromiseLike<TReturn>) | null,
	onRejected?: ((reason: any) => TCatch | PromiseLike<TCatch>) | null,
) => Promise<TReturn | TCatch>} */
// prettier-ignore
const $PromiseProto_then: <T, TReturn = T, TCatch = never>(
	promise: Promise<T>,
	onFulfilled?: ((value: T) => TReturn | PromiseLike<TReturn>) | null,
	onRejected?: ((reason: any) => TCatch | PromiseLike<TCatch>) | null
) => Promise<TReturn | TCatch> = (callBound("%PromiseProto_then%")) as any;

/** @type {undefined} */
var undefined: undefined;

// prettier-ignore
type IteratorLike<T, TReturn = any, TNext = unknown> = globalThis.Iterator<T, TReturn, TNext>;
// prettier-ignore
type AsyncIteratorLike<T, TReturn = any, TNext = unknown> = globalThis.AsyncIterator<T, TReturn, TNext>;

interface IteratorRecord<
	I extends IteratorLike<any, any, any> | AsyncIteratorLike<any, any, any>
> {
	"[[Iterator]]": I;
	"[[NextMethod]]": I["next"];
	"[[Done]]": boolean;
}

function GetIterator<I extends IteratorLike<unknown, unknown, unknown>>(obj: {
	[Symbol.iterator](): I;
}): IteratorRecord<I>;
function GetIterator<I extends IteratorLike<unknown, unknown, unknown>>(
	obj: { [Symbol.iterator](): I },
	hint: "sync",
): IteratorRecord<I>;
function GetIterator<O, I extends IteratorLike<unknown, unknown, unknown>>(
	obj: O,
	hint: "sync",
	method: (this: O) => I,
): IteratorRecord<I>;
function GetIterator<
	// prettier-ignore
	O extends
		| { [Symbol.asyncIterator](): AsyncIteratorLike<unknown, unknown, unknown> }
		| { [Symbol.iterator](): IteratorLike<unknown, unknown, unknown> }
>(
	obj: O,
	hint: "async",
): IteratorRecord<
	O extends { [Symbol.asyncIterator](): infer I }
		? I
		: O extends {
				[Symbol.iterator](): IteratorLike<
					infer T,
					infer TReturn,
					infer TNext
				>;
		  }
		? AsyncIteratorLike<T, TReturn, TNext>
		: AsyncIteratorLike<unknown, unknown, unknown>
>;
function GetIterator<
	O,
	I extends
		| IteratorLike<unknown, unknown, unknown>
		| AsyncIteratorLike<unknown, unknown, unknown>
>(
	obj: O,
	hint: "async",
	method: (this: O) => I,
): IteratorRecord<
	I extends IteratorLike<infer T, infer TReturn, infer TNext>
		? AsyncIteratorLike<T, TReturn, TNext>
		: I
>;

/**
 * @template T, F
 * @typedef {F extends (...args: infer A) => infer R ? (this: T, ...args: A) => R : F} SetThisType
 */

/**
 * @template {globalThis.Iterator<any, any, any> | globalThis.AsyncIterator<any, any, any>} I
 * @typedef {{"[[Iterator]]": I, "[[NextMethod]]": SetThisType<I, I["next"]>, "[[Done]]": boolean}} IteratorRecord
 */

/**
 * @template O
 * @template {globalThis.Iterator<any, any, any> | globalThis.AsyncIterator<any, any, any>} I
 * @param {O} obj The iterable
 * @param {"sync" | "async"} [hint] Whether to use a synchronous or asynchronous iterator.
 * @param {(this: O) => I} [method] The method to use to get the `Iterator`
 * @return {IteratorRecord<I>}
 */
// https://ecma-international.org/ecma-262/9.0/#sec-getiterator
function GetIterator<
	O extends object,
	I extends IteratorLike<any, any, any> | AsyncIteratorLike<any, any, any>
>(obj: O, hint?: "sync" | "async", method?: (this: O) => I): IteratorRecord<I> {
	var actualHint: "sync" | "async" = hint!;
	if (arguments.length < 2) {
		actualHint = "sync";
	}
	if (actualHint !== "sync" && actualHint !== "async") {
		// prettier-ignore
		throw new $TypeError("Assertion failed: `hint` must be one of 'sync' or 'async', got " + inspect(hint));
	}

	/** @type {*} */
	var actualMethod: any = method;
	if (arguments.length < 3) {
		if (actualHint === "async") {
			if (hasSymbols && $asyncIterator) {
				actualMethod = GetMethod(obj, $asyncIterator);
			}
			if (actualMethod === undefined) {
				throw new $TypeError(
					"async from sync iterators aren't currently supported",
				);
			}
		} else {
			actualMethod = getIteratorMethod(ES, obj);
		}
	}

	/** @type {I} */
	var iterator: I = Call(actualMethod, obj);
	if (Type(iterator) !== "Object") {
		throw new $TypeError("iterator must return an object");
	}

	/** @type {*} */
	var nextMethod: any = GetV(iterator, "next");
	return {
		"[[Iterator]]": iterator,
		"[[NextMethod]]": nextMethod,
		"[[Done]]": false,
	};
}

namespace promiseThenChain {
	export type ExecutorCallbackFunction<T, TReturn> = (
		value: T,
	) => TReturn | PromiseLike<TReturn>;
	export interface ExecutorCallbackInterface<T, TReturn, TCatch> {
		onFulfilled?(value: T): TReturn | PromiseLike<TReturn>;
		onRejected?(value: any): TCatch | PromiseLike<TCatch>;
	}

	export type ExecutorCallback<T = any, TReturn = any, TCatch = any> =
		| ExecutorCallbackFunction<T, TReturn>
		| ExecutorCallbackInterface<T, TReturn, TCatch>;
}

function promiseThenChain<T>(executor?: () => T | PromiseLike<T>): Promise<T>;
function promiseThenChain<T, T1R = T, T1C = never>(
	executor: () => T | PromiseLike<T>,
	then1: promiseThenChain.ExecutorCallback<T, T1R, T1C>,
): Promise<T1R | T1C>;
function promiseThenChain<
	T,
	T1R = T,
	T1C = never,
	T2R = T1R | T1C,
	T2C = never
>(
	executor: () => T | PromiseLike<T>,
	then1: promiseThenChain.ExecutorCallback<T, T1R, T1C>,
	then2: promiseThenChain.ExecutorCallback<T1R | T1C, T2R, T2C>,
): Promise<T2R | T2C>;
function promiseThenChain<
	T,
	T1R = T,
	T1C = never,
	T2R = T1R | T1C,
	T2C = never,
	T3R = T2R | T2C,
	T3C = never
>(
	executor: () => T | PromiseLike<T>,
	then1: promiseThenChain.ExecutorCallback<T, T1R, T1C>,
	then2: promiseThenChain.ExecutorCallback<T1R | T1C, T2R, T2C>,
	then3: promiseThenChain.ExecutorCallback<T1R | T1C, T2R, T2C>,
): Promise<T3R | T3C>;
function promiseThenChain(
	executor: () => any,
	...thens: promiseThenChain.ExecutorCallback[]
): Promise<any>;

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
function promiseThenChain(executor?: () => any): Promise<any> {
	const { length } = arguments;
	let promise: Promise<any> = new $Promise(resolve => {
		let result;
		if (IsCallable(executor)) {
			result = executor();
		}
		resolve(result);
	});

	for (let i = 1; i < length; i++) {
		/** @type {promiseThenChain.ExecutorCallback} */
		const thens: promiseThenChain.ExecutorCallback<any, any, any> =
			arguments[i];
		if (IsCallable(thens)) {
			promise = $PromiseProto_then(promise, thens);
		} else {
			promise = $PromiseProto_then(
				promise,
				thens.onFulfilled,
				thens.onRejected,
			);
		}
	}

	return promise;
}

/**
 * @template T
 * @param {
	| IteratorRecord<globalThis.Iterator<any, any, any>>
	| IteratorRecord<globalThis.AsyncIterator<any, any, any>>} iteratorRecord
 * @param {() => T | PromiseLike<T>} completion
 * @return {Promise<T>}
 */
// https://ecma-international.org/ecma-262/9.0/#sec-asynciteratorclose
function AsyncIteratorClose<T>(
	iteratorRecord:
		| IteratorRecord<IteratorLike<any, any, any>>
		| IteratorRecord<AsyncIteratorLike<any, any, any>>,
	completion: () => T | PromiseLike<T>,
): Promise<T> {
	/** @type {globalThis.Iterator<any, any, unknown> | globalThis.AsyncIterator<any, any, unknown>} */
	let iterator:
		| IteratorLike<any, any, unknown>
		| AsyncIteratorLike<any, any, unknown>;

	if (hasOwnProperty(iteratorRecord, "[[Iterator]]")) {
		if (Type(iteratorRecord["[[Iterator]]"]) !== "Object") {
			throw new $TypeError(
				"Assertion failed: Type(iteratorRecord.[[Iterator]]) is not Object",
			);
		}
		iterator = iteratorRecord["[[Iterator]]"];
	} else {
		iterator = iteratorRecord;
	}

	if (!IsCallable(completion)) {
		throw new $TypeError(
			"Assertion failed: completion is not a thunk for a Completion Record",
		);
	}

	return promiseThenChain(() => {
		let iteratorReturn = GetMethod(iterator, "return")!;
		if (iteratorReturn === void 0) {
			return completion();
		}

		return promiseThenChain(() => Call(iteratorReturn, iterator, []), {
			/** @param {IteratorResult<any>} innerResult */
			onFulfilled(innerResult: IteratorResult<any>) {
				// if innerResult worked, then throw if the completion does
				const completionRecord = completion();

				if (Type(innerResult) !== "Object") {
					throw new $TypeError(
						"iterator .return must return an object",
					);
				}

				return completionRecord;
			},
			onRejected(e) {
				// if we hit here, then "e" is the innerResult completion that needs re-throwing

				// if the completion is of type "throw", this will throw.
				completion();

				// if not, then return the innerResult completion
				throw e;
			},
		});
	});
}

function GetIteratorDirect<O extends object>(
	obj: O,
): O extends IteratorLike<any, any, any> | AsyncIteratorLike<any, any, any>
	? IteratorRecord<O>
	: never;
function GetIteratorDirect<O extends object>(
	obj: O,
	useIteratorRecord: false,
): O extends IteratorLike<any, any, any> | AsyncIteratorLike<any, any, any>
	? O
	: never;

/**
 * @template O
 * @param {O} obj
 * @param {boolean} [useIteratorRecord]
 */
function GetIteratorDirect<O extends object>(
	obj: O,
	useIteratorRecord: boolean = true,
) {
	if (Type(obj) !== "Object") {
		throw new $TypeError("obj must be an Object, got " + Type(obj));
	}
	const nextMethod = GetV(obj, "next");
	if (!IsCallable(nextMethod)) {
		throw new $TypeError(inspect(nextMethod) + " is not a function");
	}
	// prettier-ignore
	return useIteratorRecord
		? {
			"[[Iterator]]": obj,
			"[[NextMethod]]": nextMethod,
			"[[Done]]": false,
		}
		: obj;
}

function IteratorStep<T>(
	iterator: IteratorLike<T> | IteratorRecord<IteratorLike<T>>,
): IteratorYieldResult<T> | false;
function IteratorStep<T, TNext = undefined>(
	iterator:
		| IteratorLike<T, any, TNext>
		| IteratorRecord<IteratorLike<T, any, TNext>>,
	value: TNext,
): IteratorYieldResult<T> | false;

/**
 * @template T, TReturn, TNext
 * @param {globalThis.Iterator<T, TReturn, TNext> | IteratorRecord<globalThis.Iterator<T, TReturn, TNext>>} iterator
 * @param {TNext} [value]
 * @return {false | IteratorYieldResult<T>}
 */
function IteratorStep<T, TReturn, TNext>(
	iterator:
		| IteratorLike<T, TReturn, TNext>
		| IteratorRecord<IteratorLike<T, TReturn, TNext>>,
	value?: TNext,
): false | IteratorYieldResult<T> {
	/** @type {IteratorResult<T, TReturn>} */
	let result: IteratorResult<T, TReturn>;
	let iteratorRecord = iterator;
	if (!hasOwnProperty(iteratorRecord, "[[Iterator]]")) {
		iteratorRecord = GetIteratorDirect(iterator);
	}

	if (arguments.length > 1) {
		result = IteratorNext(iteratorRecord, value);
	} else {
		result = IteratorNext(iteratorRecord);
	}
	let done = IteratorComplete(result);
	return done === true ? false : (result as IteratorYieldResult<T>);
}

function IteratorNext<T, TReturn = unknown, TNext = undefined>(
	iteratorRecord: IteratorRecord<IteratorLike<T, TReturn, TNext>>,
	value?: TNext,
): IteratorResult<T, TReturn>;
function IteratorNext<T, TReturn = unknown, TNext = undefined>(
	iteratorRecord:
		| IteratorRecord<IteratorLike<T, TReturn, TNext>>
		| IteratorRecord<AsyncIteratorLike<T, TReturn, TNext>>,
	value?: TNext,
): IteratorResult<T, TReturn> | Promise<IteratorResult<T, TReturn>>;

/**
 * @template T, TReturn, TNext
 * @param {{ next(value?: TNext): any } | IteratorRecord<{ next(value?: TNext): any }>} iterator
 * @param {TNext} [value]
 * @return {IteratorResult<T, TReturn>}
 */
function IteratorNext<T, TReturn = unknown, TNext = undefined>(
	iterator: IteratorRecord<{ next(value?: TNext): any }>,
	value: TNext,
): IteratorResult<T, TReturn> | Promise<IteratorResult<T, TReturn>> {
	/** @type {any} */
	let result: any = Call(
		iterator["[[NextMethod]]"],
		iterator["[[Iterator]]"],
		arguments.length < 2 ? [] : [value],
	);
	if (Type(result) !== "Object") {
		throw new $TypeError("iterator next must return an object");
	}
	return result;
}

function noop() {}

const Iterator = (() => {
	// @ts-ignore
	/** @type {typeof import("./implementation.js").Iterator} */
	// prettier-ignore
	const IteratorConstructor: typeof $IteratorPolyfill = (
		/** @constructor */
		function Iterator() {
			if (new.target === undefined || new.target === Iterator) {
				throw new $TypeError(
					"Abstract class constructor Iterator cannot be invoked without 'super()'",
				);
			}
		}
	) as any;

	const IteratorPrototype = IteratorConstructor.prototype;
	define(IteratorConstructor, {
		/**
		 * @template T
		 * @param {Iterable<T> | globalThis.Iterator<T>} O
		 * @return {import("./implementation.js").Iterator<T>}
		 */
		from<T>(O: Iterable<T> | IteratorLike<T>): $IteratorPolyfill<T> {
			let usingIterator = getIteratorMethod(ES, O);
			let iteratorRecord: IteratorRecord<IteratorLike<T>>;
			if (usingIterator !== undefined) {
				iteratorRecord = GetIterator<Iterable<T>, IteratorLike<T>>(
					O as Iterable<T>,
					"sync",
					usingIterator,
				);
				let hasInstance = OrdinaryHasInstance(
					IteratorConstructor,
					iteratorRecord["[[Iterator]]"],
				);
				if (hasInstance) {
					// prettier-ignore
					return /** @type {import("./implementation.js").Iterator<T>} */ (
						iteratorRecord["[[Iterator]]"]
					) as $IteratorPolyfill<T>;
				}
			} else {
				iteratorRecord = GetIteratorDirect(O);
			}

			/** @type {import("./implementation.js").Iterator<T>} */
			let wrapper: $IteratorPolyfill<T> = OrdinaryObjectCreate(
				WrapForValidIteratorPrototype,
				// « [[Iterated]] »
			);
			SLOT.set(wrapper, "[[Iterated]]", iteratorRecord);
			return wrapper;
		},
	});

	define(IteratorPrototype, {
		/**
		 * @template T, U
		 * @this {globalThis.Iterator<T>}
		 * @param {(value: T) => U} mapper
		 * @return {Generator<U, void>}
		 */
		*map<T, U>(
			this: IteratorLike<T>,
			mapper: (value: T) => U,
		): Generator<U, void> {
			let iterated = GetIteratorDirect(this, false);
			if (!IsCallable(mapper)) {
				throw new $TypeError(inspect(mapper) + " is not a function");
			}

			/** @type {unknown} */
			let lastValue: unknown; // = function.sent;
			/** @type {false | IteratorYieldResult<any>}  */
			let next: false | IteratorYieldResult<any>;
			while ((next = IteratorStep(iterated, lastValue))) {
				/** @type {T} */
				let value: T = IteratorValue(next);

				try {
					lastValue = yield Call(mapper, undefined, [value]);
				} catch (e) {
					return IteratorClose(iterated, () => {
						throw e;
					});
				}
			}
		},

		/**
		 * @template T
		 * @this {globalThis.Iterator<T>}
		 * @param {(value: T) => unknown} filterer
		 * @return {Generator<T, void>}
		 */
		*filter<T>(
			this: IteratorLike<T>,
			filterer: (value: T) => unknown,
		): Generator<T, void> {
			let iterated = GetIteratorDirect(this, false);
			if (!IsCallable(filterer)) {
				throw new $TypeError(inspect(filterer) + " is not a function");
			}

			/** @type {unknown} */
			let lastValue: unknown;
			/** @type {false | IteratorYieldResult<any>}  */
			let next: false | IteratorYieldResult<any>;
			while ((next = IteratorStep(iterated, lastValue))) {
				/** @type {T} */
				let value: T = IteratorValue(next);

				try {
					if (Call(filterer, undefined, [value])) {
						lastValue = yield value;
					}
				} catch (e) {
					return IteratorClose(iterated, () => {
						throw e;
					});
				}
			}
		},

		/**
		 * @template T
		 * @this {globalThis.Iterator<T>}
		 * @param {number} limit
		 * @return {Generator<T, void>}
		 */
		*take<T>(this: IteratorLike<T>, limit: number): Generator<T, void> {
			let iterated = GetIteratorDirect(this, false);
			let remaining = ToInteger(limit);
			if (remaining < 0) {
				throw new $RangeError("limit must be >= 0");
			}

			/** @type {unknown} */
			let lastValue: unknown;
			while (remaining > 0) {
				remaining -= 1;

				let next = IteratorStep(iterated, lastValue);
				if (next === false) break;

				try {
					lastValue = yield IteratorValue(next);
				} catch (e) {
					return IteratorClose(iterated, () => {
						throw e;
					});
				}
			}

			return IteratorClose(iterated, noop);
		},

		/**
		 * @template T
		 * @this {globalThis.Iterator<T>}
		 * @param {number} limit
		 * @return {Generator<T, void>}
		 */
		*drop<T>(this: IteratorLike<T>, limit: number): Generator<T, void> {
			let iterated = GetIteratorDirect(this, false);
			let remaining = ToInteger(limit);
			if (remaining < 0) {
				throw new $RangeError("limit must be >= 0");
			}

			/** @type {false | IteratorYieldResult<any>}  */
			let next: false | IteratorYieldResult<any>;
			while (remaining > 0) {
				remaining -= 1;
				next = IteratorStep(iterated);
				if (next === false) {
					return;
				}
			}

			/** @type {unknown} */
			let lastValue: unknown;
			while ((next = IteratorStep(iterated, lastValue))) {
				try {
					lastValue = yield IteratorValue(next);
				} catch (e) {
					return IteratorClose(iterated, () => {
						throw e;
					});
				}
			}
		},

		/**
		 * @template T
		 * @this {globalThis.Iterator<T>}
		 * @return {Generator<[number, T], undefined>}
		 */
		*asIndexedPairs<T>(
			this: IteratorLike<T>,
		): Generator<[number, T], undefined> {
			let iterated = GetIteratorDirect(this, false);
			let index = 0;

			/** @type {unknown} */
			let lastValue: unknown;

			/** @type {false | IteratorYieldResult<T>}  */
			let next: false | IteratorYieldResult<T>;
			while ((next = IteratorStep(iterated, lastValue))) {
				/** @type {T} */
				let value: T = IteratorValue(next);

				let pair: [number, T] = [index, value];
				index += 1;

				try {
					lastValue = yield pair;
				} catch (e) {
					return IteratorClose(iterated, () => {
						throw e;
					});
				}
			}
		},

		/**
		 * @template T, U
		 * @this {globalThis.Iterator<T>}
		 * @param {(value: T) => Iterable<U>} mapper
		 * @return {Generator<U, void>}
		 */
		*flatMap<T, U>(
			this: IteratorLike<T>,
			mapper: (value: T) => Iterable<U>,
		): Generator<U, void> {
			let iterated = GetIteratorDirect(this, false);
			if (!IsCallable(mapper)) {
				throw new $TypeError(inspect(mapper) + " is not a function");
			}

			/** @type {false | IteratorYieldResult<T>}  */
			let next: false | IteratorYieldResult<T>;
			while ((next = IteratorStep(iterated))) {
				/** @type {T} */
				let value: T = IteratorValue(next);

				try {
					const mapped = Call(mapper, undefined, [value]);
					const innerIterator = GetIterator(mapped);

					/** @type {false | IteratorYieldResult<U>} */
					let innerNext: false | IteratorYieldResult<U>;
					while ((innerNext = IteratorStep(innerIterator))) {
						yield IteratorValue(innerNext);
					}
				} catch (e) {
					return IteratorClose(iterated, () => {
						throw e;
					});
				}
			}
		},

		/**
		 * @template T, U
		 * @this {globalThis.Iterator<T>}
		 * @param {(accumulator: U, value: T) => U} reducer
		 * @param {U} [initialValue]
		 * @return {U}
		 * @type {{
			<T>(
				this: globalThis.Iterator<T>,
				reducer: (accumulator: T, value: T) => T,
			): T;
			<T, U>(
				this: globalThis.Iterator<T>,
				reducer: (accumulator: U, value: T) => U,
				initialValue: U,
			): U;
		}} */
		reduce<T, U>(
			this: IteratorLike<T>,
			reducer: (accumulator: U, value: T) => U,
		): U {
			/** @type {U} */
			const initialValue: U = arguments[1];
			const iterated = GetIteratorDirect(this, false);

			if (!IsCallable(reducer)) {
				throw new $TypeError(inspect(reducer) + " is not a function");
			}

			/** @type {U} */
			let accumulator: U;
			/** @type {false | IteratorYieldResult<T>}  */
			let next: false | IteratorYieldResult<T>;

			if (arguments.length < 2) {
				next = IteratorStep(iterated);
				if (next === false) {
					throw new $TypeError(
						"reduce of empty iterator with no initial value",
					);
				}
				accumulator = IteratorValue(next) as any;
			} else {
				accumulator = initialValue!;
			}

			while ((next = IteratorStep(iterated))) {
				/** @type {T} */
				let value: T = IteratorValue(next);

				let result: any;
				try {
					result = Call(reducer, undefined, [accumulator, value]);
				} catch (e) {
					return IteratorClose(iterated, () => {
						throw e;
					});
				}
				accumulator = result;
			}

			return accumulator;
		},

		/**
		 * @template T
		 * @this {globalThis.Iterator<T>}
		 * @return {T[]}
		 */
		toArray<T>(this: IteratorLike<T>): T[] {
			let iterated = GetIteratorDirect(this, false);
			/** @type {T[]} */
			let items: T[] = [];

			/** @type {false | IteratorYieldResult<T>}  */
			let next: false | IteratorYieldResult<T>;
			while ((next = IteratorStep(iterated))) {
				items.push(IteratorValue(next));
			}

			return items;
		},

		/**
		 * @template T
		 * @this {globalThis.Iterator<T>}
		 * @param {(value: T) => void} fn
		 */
		forEach<T>(this: IteratorLike<T>, fn: (value: T) => void): void {
			let iterated = GetIteratorDirect(this, false);
			if (!IsCallable(fn)) {
				throw new $TypeError(inspect(fn) + " is not a function");
			}

			/** @type {false | IteratorYieldResult<T>}  */
			let next: false | IteratorYieldResult<T>;
			while ((next = IteratorStep(iterated))) {
				/** @type {T} */
				let value: T = IteratorValue(next);

				try {
					Call(fn, undefined, [value]);
				} catch (e) {
					return IteratorClose(iterated, () => {
						throw e;
					});
				}
			}
		},

		/**
		 * @template T
		 * @this {globalThis.Iterator<T>}
		 * @param {(value: T) => unknown} fn
		 * @return {boolean}
		 */
		some<T>(this: IteratorLike<T>, fn: (value: T) => unknown): boolean {
			let iterated = GetIteratorDirect(this, false);
			if (!IsCallable(fn)) {
				throw new $TypeError(inspect(fn) + " is not a function");
			}

			/** @type {false | IteratorYieldResult<T>}  */
			let next: false | IteratorYieldResult<T>;
			while ((next = IteratorStep(iterated))) {
				/** @type {T} */
				let value: T = IteratorValue(next);

				let result;
				try {
					result = Call(fn, undefined, [value]);
				} catch (e) {
					return IteratorClose(iterated, () => {
						throw e;
					});
				}
				if (result) {
					return true;
				}
			}

			return false;
		},

		/**
		 * @template T
		 * @this {globalThis.Iterator<T>}
		 * @param {(value: T) => unknown} fn
		 * @return {boolean}
		 */
		every<T>(this: IteratorLike<T>, fn: (value: T) => unknown): boolean {
			let iterated = GetIteratorDirect(this, false);
			if (!IsCallable(fn)) {
				throw new $TypeError(inspect(fn) + " is not a function");
			}

			/** @type {false | IteratorYieldResult<T>}  */
			let next: false | IteratorYieldResult<T>;
			while ((next = IteratorStep(iterated))) {
				/** @type {T} */
				let value: T = IteratorValue(next);

				let result;
				try {
					result = Call(fn, undefined, [value]);
				} catch (e) {
					return IteratorClose(iterated, () => {
						throw e;
					});
				}
				if (!result) {
					return false;
				}
			}

			return true;
		},

		/**
		 * @template T
		 * @this {globalThis.Iterator<T>}
		 * @param {(value: T) => unknown} fn
		 * @return {T | undefined}
		 */
		find<T>(
			this: IteratorLike<T>,
			fn: (value: unknown) => unknown,
		): T | undefined {
			let iterated = GetIteratorDirect(this, false);
			if (!IsCallable(fn)) {
				throw new $TypeError(inspect(fn) + " is not a function");
			}

			/** @type {false | IteratorYieldResult<T>}  */
			let next: false | IteratorYieldResult<T>;
			while ((next = IteratorStep(iterated))) {
				/** @type {T} */
				let value: T = IteratorValue(next);

				let result;
				try {
					result = Call(fn, undefined, [value]);
				} catch (e) {
					return IteratorClose(iterated, () => {
						throw e;
					});
				}
				if (result) {
					return value;
				}
			}
		},
	});

	if ($toStringTag) {
		try {
			DefinePropertyOrThrow(IteratorPrototype, $toStringTag, {
				"[[Value]]": "Iterator",
				"[[Configurable]]": true,
			});
		} catch {}
	}

	if ($IteratorProto) {
		$setProto!(IteratorPrototype, $IteratorProto);

		CreateMethodProperty(
			IteratorPrototype,
			$iterator!,
			// @ts-ignore
			$IteratorProto[$iterator!],
		);
	} else if ($iterator) {
		// This probably can't occur in a real environment

		var func;
		CreateMethodProperty(
			IteratorPrototype,
			$iterator,
			(func = function Symbol_iterator(this: any) {
				return this;
			}),
		);

		try {
			DefinePropertyOrThrow(func, "name", {
				"[[Value]]": "[Symbol.iterator]",
				"[[Configurable]]": true,
			});
		} catch {}
	}

	return IteratorConstructor;
})();

/** @type {import("./implementation.js").Iterator<*>} */
// prettier-ignore
const WrapForValidIteratorPrototype: $IteratorPolyfill<any> = OrdinaryObjectCreate(Iterator.prototype);
define(WrapForValidIteratorPrototype, {
	/**
	 * @param {any} [value]
	 * @return {IteratorResult<any>}
	 */
	next(value?: any): IteratorResult<any> {
		const O = this;
		SLOT.assert(O, "[[Iterated]]");
		/** @type {IteratorRecord<globalThis.Iterator<any>>} */
		// prettier-ignore
		let iterated: IteratorRecord<IteratorLike<any>>
			= SLOT.get(O, "[[Iterated]]");
		if (arguments.length > 0) {
			return IteratorNext(iterated, value);
		} else {
			return IteratorNext(iterated);
		}
	},

	/**
	 * @template TReturn
	 * @param {TReturn} [v]
	 * @return {IteratorResult<any, TReturn>}
	 */
	return<TReturn>(v?: TReturn): IteratorResult<any, TReturn> {
		const O = this;
		SLOT.assert(O, "[[Iterated]]");
		return IteratorClose(
			SLOT.get(O, "[[Iterated]]")["[[Iterator]]"],
			() => ({
				done: true,
				value: v!,
			}),
		);
	},

	/**
	 * @param {any} [v]
	 * @return {IteratorResult<any>}
	 */
	throw(v?: any): IteratorResult<any> {
		const O = this;
		SLOT.assert(O, "[[Iterated]]");
		/** @type {globalThis.Iterator<any>} */
		// prettier-ignore
		const iterator: IteratorLike<any> = SLOT.get(O, "[[Iterated]]")["[[Iterator]]"];
		const _throw = GetMethod(iterator, "throw");
		if (_throw === undefined) {
			throw v;
		}
		return Call(_throw, iterator, [v]);
	},
});

const AsyncIterator = (() => {
	// @ts-ignore
	/** @type {typeof import("./implementation.js").AsyncIterator} */
	// prettier-ignore
	const AsyncIterator: typeof $AsyncIteratorPolyfill = (
		/** @constructor */
		function AsyncIterator() {
			if (new.target === undefined || new.target === AsyncIterator) {
				throw new $TypeError("Abstract class constructor AsyncIterator cannot be invoked without 'super()'",);
			}
		}
	) as any;

	const AsyncIteratorPrototype = AsyncIterator.prototype;
	define(AsyncIterator, {
		/**
		 * @template T
		 * @param {Iterable<T> | globalThis.Iterator<T> | AsyncIterable<T> | globalThis.AsyncIterator<T>} O
		 * @return {import("./implementation.js").AsyncIterator<T>}
		 */
		from<T>(
			O:
				| Iterable<T>
				| IteratorLike<T>
				| AsyncIterable<T>
				| AsyncIteratorLike<T>,
		): $AsyncIteratorPolyfill<T> {
			/** @type {(() => globalThis.Iterator<T> | globalThis.AsyncIterator<T>) | undefined} */
			let usingIterator:
				| (() => IteratorLike<T> | AsyncIteratorLike<T>)
				| undefined = $asyncIterator
				? (GetMethod(O, $asyncIterator) as
						| (() => AsyncIteratorLike<T>)
						| undefined)
				: undefined;
			let iteratorRecord:
				| IteratorRecord<IteratorLike<T>>
				| IteratorRecord<AsyncIteratorLike<T>>
				| undefined;
			if (usingIterator !== undefined) {
				iteratorRecord = GetIterator(O, "async", usingIterator);
				let hasInstance = OrdinaryHasInstance(
					AsyncIterator,
					iteratorRecord["[[Iterator]]"],
				);
				if (hasInstance) {
					// prettier-ignore
					return /** @type {import("./implementation.js").AsyncIterator<T>} */ (
						iteratorRecord["[[Iterator]]"]
					) as $AsyncIteratorPolyfill<T>;
				}
			}

			if (iteratorRecord === undefined) {
				usingIterator = getIteratorMethod(ES, O);
				if (usingIterator !== undefined) {
					throw new $TypeError(
						"async from sync iterators aren't currently supported",
					);
					// let syncIteratorRecord = GetIterator(O, "sync", usingIterator as () => Iterator<T>);
				}
			}

			if (iteratorRecord === undefined) {
				iteratorRecord = GetIteratorDirect(O);
			}

			/** @type {import("./implementation.js").AsyncIterator<T>} */
			let wrapper: $AsyncIteratorPolyfill<T> = OrdinaryObjectCreate(
				WrapForValidAsyncIteratorPrototype,
				// « [[AsyncIterated]] »
			);
			SLOT.set(wrapper, "[[AsyncIterated]]", iteratorRecord);
			return wrapper;
		},
	});

	define<ThisType<AsyncIteratorLike<any>>>(AsyncIteratorPrototype, {
		/**
		 * @template T, U
		 * @this {globalThis.Iterator<T> | globalThis.AsyncIterator<T>}
		 * @param {(value: T) => U | PromiseLike<U>} mapper
		 * @return {AsyncGenerator<U, void>}
		 */
		async *map<T, U>(
			this: IteratorLike<T> | AsyncIteratorLike<T>,
			mapper: (value: T) => U | PromiseLike<U>,
		): AsyncGenerator<U, void> {
			let iterated = GetIteratorDirect(this);
			if (!IsCallable(mapper)) {
				throw new $TypeError(inspect(mapper) + " is not a function");
			}

			/** @type {unknown} */
			let lastValue: unknown;
			/** @type {IteratorResult<T>} */
			let next: IteratorResult<T>;
			while (
				(next = await IteratorNext(iterated, lastValue)) &&
				!IteratorComplete(next)
			) {
				/** @type {T} */
				let value: T = IteratorValue(next);

				let mapped: U | PromiseLike<U>;
				try {
					mapped = Call(mapper, undefined, [value]);
				} catch (e) {
					return AsyncIteratorClose(iterated, () => {
						throw e;
					});
				}
				try {
					mapped = await mapped;
				} catch (e) {
					return AsyncIteratorClose(iterated, () => {
						throw e;
					});
				}
				try {
					lastValue = yield mapped;
				} catch (e) {
					return AsyncIteratorClose(iterated, () => {
						throw e;
					});
				}
			}
		},

		/**
		 * @template T
		 * @this {globalThis.Iterator<T> | globalThis.AsyncIterator<T>}
		 * @param {(value: T) => unknown | PromiseLike<unknown>} filterer
		 * @return {AsyncGenerator<T, void>}
		 */
		async *filter<T>(
			this: IteratorLike<T> | AsyncIteratorLike<T>,
			filterer: (value: T) => unknown | PromiseLike<unknown>,
		): AsyncGenerator<T, void> {
			let iterated = GetIteratorDirect(this);
			if (!IsCallable(filterer)) {
				throw new $TypeError(inspect(filterer) + " is not a function");
			}

			/** @type {unknown} */
			let lastValue: unknown;
			/** @type {IteratorResult<T>} */
			let next: IteratorResult<T>;
			while (
				(next = await IteratorNext(iterated, lastValue)) &&
				!IteratorComplete(next)
			) {
				/** @type {T} */
				let value: T = IteratorValue(next);

				let selected;
				try {
					selected = Call(filterer, undefined, [value]);
				} catch (e) {
					return AsyncIteratorClose(iterated, () => {
						throw e;
					});
				}

				try {
					selected = await selected;
				} catch (e) {
					return AsyncIteratorClose(iterated, () => {
						throw e;
					});
				}

				if (ToBoolean(selected)) {
					try {
						lastValue = yield value;
					} catch (e) {
						return AsyncIteratorClose(iterated, () => {
							throw e;
						});
					}
				}
			}
		},

		/**
		 * @template T
		 * @this {globalThis.Iterator<T> | globalThis.AsyncIterator<T>}
		 * @param {number} limit
		 * @return {AsyncGenerator<T, void>}
		 */
		async *take<T>(
			this: IteratorLike<T> | AsyncIteratorLike<T>,
			limit: number,
		): AsyncGenerator<T, void> {
			let iterated = GetIteratorDirect(this);
			let remaining = ToInteger(limit);
			if (remaining < 0) {
				throw new $RangeError("limit must be >= 0");
			}

			/** @type {unknown} */
			let lastValue: unknown;
			while (remaining > 0) {
				remaining -= 1;

				let next = await IteratorNext(iterated, lastValue);
				if (IteratorComplete(next)) {
					return;
				}

				try {
					lastValue = yield IteratorValue(next);
				} catch (e) {
					AsyncIteratorClose(iterated, () => {
						throw e;
					});
				}
			}

			return AsyncIteratorClose(iterated, noop);
		},

		/**
		 * @template T
		 * @this {globalThis.Iterator<T> | globalThis.AsyncIterator<T>}
		 * @param {number} limit
		 * @return {AsyncGenerator<T, void>}
		 */
		async *drop<T>(
			this: IteratorLike<T> | AsyncIteratorLike<T>,
			limit: number,
		): AsyncGenerator<T, void> {
			let iterated = GetIteratorDirect(this);
			let remaining = ToInteger(limit);
			if (remaining < 0) {
				throw new $RangeError("limit must be >= 0");
			}

			while (remaining > 0) {
				remaining -= 1;
				let next = await IteratorNext(iterated);
				if (IteratorComplete(next)) {
					return;
				}
			}

			/** @type {unknown} */
			let lastValue: unknown = undefined;
			/** @type {IteratorResult<T>} */
			let next: IteratorResult<T>;
			while (
				(next = await IteratorNext(iterated, lastValue)) &&
				!IteratorComplete(next)
			) {
				try {
					lastValue = yield IteratorValue(next);
				} catch (e) {
					return AsyncIteratorClose(iterated, () => {
						throw e;
					});
				}
			}
		},

		/**
		 * @template T
		 * @this {globalThis.Iterator<T> | globalThis.AsyncIterator<T>}
		 * @return {AsyncGenerator<[number, T], undefined>}
		 */
		async *asIndexedPairs<T>(
			this: IteratorLike<T> | AsyncIteratorLike<T>,
		): AsyncGenerator<[number, T], undefined> {
			let iterated = GetIteratorDirect(this);
			let index = 0;

			/** @type {unknown} */
			let lastValue: unknown;

			/** @type {IteratorResult<T>}  */
			let next: IteratorResult<T>;
			while (
				(next = await IteratorNext(iterated, lastValue)) &&
				!IteratorComplete(next)
			) {
				/** @type {T} */
				let value: T = IteratorValue(next);

				let pair: [number, T] = [index, value];
				index += 1;

				try {
					lastValue = yield pair;
				} catch (e) {
					return AsyncIteratorClose(iterated, () => {
						throw e;
					});
				}
			}
		},

		/**
		 * @template T, U
		 * @this {globalThis.Iterator<T> | globalThis.AsyncIterator<T>}
		 * @param {(value: T) => Iterable<U> | AsyncIterable<U> | Promise<Iterable<U> | AsyncIterable<U>>} mapper
		 * @return {AsyncGenerator<U, void>}
		 */
		async *flatMap<T, U>(
			this: IteratorLike<T> | AsyncIteratorLike<T>,
			mapper: (
				value: T,
			) =>
				| Iterable<U>
				| AsyncIterable<U>
				| Promise<Iterable<U> | AsyncIterable<U>>,
		): AsyncGenerator<U, void> {
			let iterated = GetIteratorDirect(this);
			if (!IsCallable(mapper)) {
				throw new $TypeError(inspect(mapper) + " is not a function");
			}

			/** @type {IteratorResult<T>} */
			let next: IteratorResult<T>;

			while (
				(next = await IteratorNext(iterated)) &&
				!IteratorComplete(next)
			) {
				/** @type {T} */
				let value: T = IteratorValue(next);

				try {
					const mapped = await Call(mapper, undefined, [value]);
					const innerIterator = GetIterator(mapped, "async");

					/** @type {IteratorResult<U>} */
					let innerNext: IteratorResult<U>;
					while (
						(innerNext = await IteratorNext(innerIterator)) &&
						!IteratorComplete(innerNext)
					) {
						yield IteratorValue(innerNext);
					}
				} catch (e) {
					return AsyncIteratorClose(iterated, () => {
						throw e;
					});
				}
			}
		},

		/**
		 * @template T, U
		 * @this {globalThis.Iterator<T> | globalThis.AsyncIterator<T>}
		 * @param {(accumulator: U, value: T) => U | PromiseLike<U>} reducer
		 * @param {U} [initialValue]
		 * @return {Promise<U>}
		 * @type {{
			<T>(
				this: globalThis.Iterator<T> | globalThis.AsyncIterator<T>,
				reducer: (accumulator: T, value: T) => T | PromiseLike<T>,
			): Promise<T>;
			<T, U>(
				this: globalThis.Iterator<T> | globalThis.AsyncIterator<T>,
				reducer: (accumulator: U, value: T) => U | PromiseLike<U>,
				initialValue: U,
			): Promise<U>;
		}} */
		reduce<T, U>(
			this: IteratorLike<T> | AsyncIteratorLike<T>,
			reducer: (accumulator: U, value: T) => U | PromiseLike<U>,
		): Promise<U> {
			const { length, 1: initialValue } = arguments;
			/** @type {U} */
			let accumulator: U;

			/** @type {IteratorRecord<globalThis.Iterator<T>> | IteratorRecord<globalThis.AsyncIterator<T>>} */
			let iterated:
				| IteratorRecord<IteratorLike<T>>
				| IteratorRecord<AsyncIteratorLike<T>>;

			return promiseThenChain(() => {
				iterated = GetIteratorDirect(this);
				if (!IsCallable(reducer)) {
					throw new $TypeError(
						inspect(reducer) + " is not a function",
					);
				}

				if (length < 2) {
					return promiseThenChain(
						() => IteratorNext(iterated),
						next => {
							if (IteratorComplete(next)) {
								throw new $TypeError(
									"reduce of empty iterator with no initial value",
								);
							}
							accumulator = IteratorValue(next) as any;
						},
					);
				} else {
					accumulator = initialValue;
				}
			}, __recursive);

			/** @return {Promise<U>} */
			function __recursive(): Promise<U> {
				return promiseThenChain(
					() => IteratorNext(iterated),
					/** @param {IteratorResult<T>} next */
					(next: IteratorResult<T>) => {
						if (IteratorComplete(next)) {
							return accumulator;
						}

						let value = IteratorValue(next);
						return promiseThenChain(
							() => {
								return Call(reducer, undefined, [
									accumulator,
									value,
								]);
							},
							{
								/** @param {U} result */
								onFulfilled(result: U) {
									accumulator = result;
									return __recursive();
								},
								onRejected(e: any) {
									return AsyncIteratorClose(iterated, () => {
										throw e;
									});
								},
							},
						);
					},
				);
			}
		},

		/**
		 * @template T
		 * @this {globalThis.Iterator<T> | globalThis.AsyncIterator<T>}
		 * @return {Promise<T[]>}
		 */
		toArray<T>(this: IteratorLike<T> | AsyncIteratorLike<T>): Promise<T[]> {
			/** @type {IteratorRecord<globalThis.Iterator<T>> | IteratorRecord<globalThis.AsyncIterator<T>>} */
			let iterated:
				| IteratorRecord<IteratorLike<T>>
				| IteratorRecord<AsyncIteratorLike<T>>;

			return promiseThenChain(() => {
				iterated = GetIteratorDirect(this);

				/** @type {T[]} */
				let items: T[] = [];
				return items;
			}, __recursive);

			/** @param {T[]} items @return {Promise<T[]>} */
			function __recursive(items: T[]): Promise<T[]> {
				return promiseThenChain(
					() => IteratorNext(iterated),
					/** @param {IteratorResult<T>} next */
					(next: IteratorResult<T>) => {
						if (IteratorComplete(next)) {
							return items;
						}

						items.push(IteratorValue(next));

						return __recursive(items);
					},
				);
			}
		},

		/**
		 * @template T
		 * @this {globalThis.Iterator<T> | globalThis.AsyncIterator<T>}
		 * @param {(value: T) => void | PromiseLike<void>} fn
		 * @return {Promise<void>}
		 */
		forEach<T>(
			this: IteratorLike<T> | AsyncIteratorLike<T>,
			fn: (value: T) => void | PromiseLike<void>,
		): Promise<void> {
			/** @type {IteratorRecord<globalThis.Iterator<T>> | IteratorRecord<globalThis.AsyncIterator<T>>} */
			let iterated:
				| IteratorRecord<IteratorLike<T>>
				| IteratorRecord<AsyncIteratorLike<T>>;

			return promiseThenChain(() => {
				iterated = GetIteratorDirect(this);
				if (!IsCallable(fn)) {
					throw new $TypeError(inspect(fn) + " is not a function");
				}
			}, __recursive);

			/** @return {Promise<void>} */
			function __recursive(): Promise<void> {
				return promiseThenChain(
					() => IteratorNext(iterated),
					/** @param {IteratorResult<T>} next */
					(next: IteratorResult<T>) => {
						if (IteratorComplete(next)) {
							return;
						}

						/** @type {T} */
						let value: T = IteratorValue(next);

						/** @type {void | PromiseLike<void>} */
						let r: void | PromiseLike<void>;

						try {
							r = Call(fn, undefined, [value]);
						} catch (e) {
							return AsyncIteratorClose(iterated, () => {
								throw e;
							});
						}

						return promiseThenChain(() => r, {
							onFulfilled: __recursive,
							onRejected(e) {
								return AsyncIteratorClose(iterated, () => {
									throw e;
								});
							},
						});
					},
				);
			}
		},

		/**
		 * @template T
		 * @this {globalThis.Iterator<T> | globalThis.AsyncIterator<T>}
		 * @param {(value: T) => unknown} fn
		 * @return {Promise<boolean>}
		 */
		some<T>(
			this: IteratorLike<T> | AsyncIteratorLike<T>,
			fn: (value: T) => unknown,
		): Promise<boolean> {
			/** @type {IteratorRecord<globalThis.Iterator<T>> | IteratorRecord<globalThis.AsyncIterator<T>>} */
			let iterated:
				| IteratorRecord<IteratorLike<T>>
				| IteratorRecord<AsyncIteratorLike<T>>;

			return promiseThenChain(() => {
				iterated = GetIteratorDirect(this);
				if (!IsCallable(fn)) {
					throw new $TypeError(inspect(fn) + " is not a function");
				}
			}, __recursive);

			/** @return {Promise<boolean>} */
			function __recursive(): Promise<boolean> {
				return promiseThenChain(
					() => IteratorNext(iterated),
					/** @param {IteratorResult<T>} next */
					(next: IteratorResult<T>) => {
						if (IteratorComplete(next)) {
							return false;
						}

						/** @type {T} */
						let value: T = IteratorValue(next);

						/** @type {unknown} */
						let result: unknown;
						try {
							result = Call(fn, undefined, [value]);
						} catch (e) {
							return AsyncIteratorClose(iterated, () => {
								throw e;
							});
						}

						return promiseThenChain(() => result, {
							onFulfilled(result) {
								return ToBoolean(result) ? true : __recursive();
							},
							onRejected(e) {
								return AsyncIteratorClose(iterated, () => {
									throw e;
								});
							},
						});
					},
				);
			}
		},

		/**
		 * @template T
		 * @this {globalThis.Iterator<T> | globalThis.AsyncIterator<T>}
		 * @param {(value: T) => unknown} fn
		 * @return {Promise<boolean>}
		 */
		every<T>(
			this: IteratorLike<T> | AsyncIteratorLike<T>,
			fn: (value: T) => unknown,
		): Promise<boolean> {
			/** @type {IteratorRecord<globalThis.Iterator<T>> | IteratorRecord<globalThis.AsyncIterator<T>>} */
			let iterated:
				| IteratorRecord<IteratorLike<T>>
				| IteratorRecord<AsyncIteratorLike<T>>;

			return promiseThenChain(() => {
				iterated = GetIteratorDirect(this);
				if (!IsCallable(fn)) {
					throw new $TypeError(inspect(fn) + " is not a function");
				}
			}, __recursive);

			/** @return {Promise<boolean>} */
			function __recursive(): Promise<boolean> {
				return promiseThenChain(
					() => IteratorNext(iterated),
					/** @param {IteratorResult<T>} next */
					(next: IteratorResult<T>) => {
						if (IteratorComplete(next)) {
							return true;
						}

						/** @type {T} */
						let value: T = IteratorValue(next);

						/** @type {unknown} */
						let result: unknown;
						try {
							result = Call(fn, undefined, [value]);
						} catch (e) {
							return AsyncIteratorClose(iterated, () => {
								throw e;
							});
						}

						return promiseThenChain(() => result, {
							onFulfilled(result) {
								return ToBoolean(result)
									? __recursive()
									: false;
							},
							onRejected(e) {
								return AsyncIteratorClose(iterated, () => {
									throw e;
								});
							},
						});
					},
				);
			}
		},

		/**
		 * @template T
		 * @this {globalThis.Iterator<T> | globalThis.AsyncIterator<T>}
		 * @param {(value: T) => unknown} fn
		 * @return {Promise<T | undefined>}
		 */
		find<T>(
			this: IteratorLike<T> | AsyncIteratorLike<T>,
			fn: (value: T) => unknown,
		): Promise<T | undefined> {
			/** @type {IteratorRecord<globalThis.Iterator<T>> | IteratorRecord<globalThis.AsyncIterator<T>>} */
			let iterated:
				| IteratorRecord<IteratorLike<T>>
				| IteratorRecord<AsyncIteratorLike<T>>;

			return promiseThenChain(() => {
				iterated = GetIteratorDirect(this);
				if (!IsCallable(fn)) {
					throw new $TypeError(inspect(fn) + " is not a function");
				}
			}, __recursive);

			/** @return {Promise<T | undefined>} */
			function __recursive(): Promise<T | undefined> {
				return promiseThenChain(
					() => IteratorNext(iterated),
					/** @param {IteratorResult<T>} next */
					(next: IteratorResult<T>) => {
						if (IteratorComplete(next)) {
							return;
						}

						/** @type {T} */
						let value: T = IteratorValue(next);

						/** @type {unknown} */
						let result: unknown;
						try {
							result = Call(fn, undefined, [value]);
						} catch (e) {
							return AsyncIteratorClose(iterated, () => {
								throw e;
							});
						}

						return promiseThenChain(() => result, {
							onFulfilled(result) {
								return ToBoolean(result)
									? value
									: __recursive();
							},
							onRejected(e) {
								return AsyncIteratorClose(iterated, () => {
									throw e;
								});
							},
						});
					},
				);
			}
		},
	});

	if ($toStringTag) {
		try {
			DefinePropertyOrThrow(AsyncIteratorPrototype, $toStringTag, {
				"[[Value]]": "AsyncIterator",
				"[[Configurable]]": true,
			});
		} catch {}
	}

	if ($AsyncIteratorProto) {
		$setProto!(AsyncIteratorPrototype, $AsyncIteratorProto);
		CreateMethodProperty(
			AsyncIteratorPrototype,
			$asyncIterator!,
			// @ts-ignore
			$AsyncIteratorProto[$asyncIterator!],
		);
	} else if ($asyncIterator) {
		// This can only occur in an ES2015-ES2017 environment where
		// a polyfill installs Symbol.asyncIterator before ES-Abstract
		// has been initialised.

		var func;
		CreateMethodProperty(
			AsyncIteratorPrototype,
			$asyncIterator,
			(func = function Symbol_asyncIterator(this: any) {
				return this;
			}),
		);

		try {
			DefinePropertyOrThrow(func, "name", {
				"[[Value]]": "[Symbol.asyncIterator]",
				"[[Configurable]]": true,
			});
		} catch {}
	}

	return AsyncIterator;
})();

/** @type {import("./implementation.js").AsyncIterator<*>} */
// prettier-ignore
const WrapForValidAsyncIteratorPrototype: $AsyncIteratorPolyfill<any> = OrdinaryObjectCreate(AsyncIterator.prototype);
define(WrapForValidAsyncIteratorPrototype, {
	/**
	 * @param {any} [value]
	 * @return {Promise<IteratorResult<any>>}
	 */
	next(value?: any): Promise<IteratorResult<any>> {
		const O = this;
		const { length } = arguments;

		return new $Promise(resolve => {
			SLOT.assert(O, "[[AsyncIterated]]");
			/** @type {IteratorRecord<globalThis.Iterator<any>> | IteratorRecord<globalThis.AsyncIterator<any>>} */
			// prettier-ignore
			let iterated: IteratorRecord<IteratorLike<any>> | IteratorRecord<AsyncIteratorLike<any>>
				= SLOT.get(O, "[[AsyncIterated]]");
			if (length > 0) {
				resolve(IteratorNext(iterated, value));
			} else {
				resolve(IteratorNext(iterated));
			}
		});
	},

	/**
	 * @template TReturn
	 * @param {TReturn} [v]
	 * @return {Promise<IteratorResult<any, TReturn>>}
	 */
	return<TReturn>(v?: TReturn): Promise<IteratorResult<any, TReturn>> {
		const O = this;
		return new $Promise(resolve => {
			SLOT.assert(O, "[[AsyncIterated]]");
			resolve(
				AsyncIteratorClose(SLOT.get(O, "[[AsyncIterated]]"), () => {
					return {
						done: true,
						value: v!,
					};
				}),
			);
		});
	},

	/**
	 * @param {any} [v]
	 * @return {Promise<IteratorResult<any>>}
	 */
	throw(v?: any): Promise<IteratorResult<any>> {
		const O = this;
		return new $Promise(resolve => {
			SLOT.assert(O, "[[AsyncIterated]]");
			/** @type {globalThis.Iterator<any> | globalThis.AsyncIterator<any>} */
			// prettier-ignore
			const iterator: IteratorLike<any> | AsyncIteratorLike<any>
				= SLOT.get(O, "[[AsyncIterated]]")["[[Iterator]]"];
			const _throw = GetMethod(iterator, "throw");
			if (_throw === undefined) {
				throw v;
			}
			resolve(Call(_throw, iterator, [v]));
		});
	},
});

export { Iterator, AsyncIterator };
