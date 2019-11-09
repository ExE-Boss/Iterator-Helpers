"use strict";
declare function require<T = any>(id: string): T;

const tslib_1: typeof import("../util") = require("./util"),
	{ __generator, __await, __asyncGenerator } = tslib_1;

import {
	Iterator as $IteratorPolyfill,
	AsyncIterator as $AsyncIteratorPolyfill,
} from "../implementation";

import ES2018 = require("es-abstract/es2018");
import GetIntrinsic = require("es-abstract/GetIntrinsic");
/** @type {<T>(iterable: T) => T extends Iterable<unknown> ? () => Iterator<T extends Iterable<infer U> ? U : unknown> : undefined} */
const getIteratorMethod: <T>(
	iterable: T
) => T extends Iterable<unknown>
	? () => Iterator<T extends Iterable<infer U> ? U : unknown>
	: undefined = require<
	(ES: any, iterable: any) => any
>("es-abstract/helpers/getIteratorMethod").bind(null, ES2018);
import $setProto = require("es-abstract/helpers/setProto");

import define = require("define-properties");
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

// prettier-ignore
const $NewPromise = GetIntrinsic("%Promise_resolve%").bind(GetIntrinsic("%Promise%"));

/** @type {undefined} */
var undefined: undefined;

type SetThisType<T, F> = F extends (...args: infer A) => infer R
	? (this: T, ...args: A) => R
	: F;

interface IteratorRecord<
	I extends Iterator<any, any, any> | AsyncIterator<any, any, any>
> {
	"[[Iterator]]": I;
	"[[NextMethod]]": SetThisType<I, I["next"]>;
	"[[Done]]": boolean;
}

function GetIterator<I extends Iterator<unknown, unknown, unknown>>(obj: {
	[Symbol.iterator](): I;
}): IteratorRecord<I>;
function GetIterator<I extends Iterator<unknown, unknown, unknown>>(
	obj: { [Symbol.iterator](): I },
	hint: "sync"
): IteratorRecord<I>;
function GetIterator<O, I extends Iterator<unknown, unknown, unknown>>(
	obj: O,
	hint: "sync",
	method: (this: O) => I
): IteratorRecord<I>;
function GetIterator<
	O extends
		| { [Symbol.asyncIterator](): AsyncIterator<unknown, unknown, unknown> }
		| { [Symbol.iterator](): Iterator<unknown, unknown, unknown> }
>(
	obj: O,
	hint: "async"
): IteratorRecord<
	O extends { [Symbol.asyncIterator](): infer I }
		? I
		: O extends {
				[Symbol.iterator](): Iterator<
					infer T,
					infer TReturn,
					infer TNext
				>;
		  }
		? AsyncIterator<T, TReturn, TNext>
		: AsyncIterator<unknown, unknown, unknown>
>;
function GetIterator<
	O,
	I extends
		| Iterator<unknown, unknown, unknown>
		| AsyncIterator<unknown, unknown, unknown>
>(
	obj: O,
	hint: "async",
	method: (this: O) => I
): IteratorRecord<
	I extends Iterator<infer T, infer TReturn, infer TNext>
		? AsyncIterator<T, TReturn, TNext>
		: I
>;

/** @typedef {NonNullable<Parameters<typeof Object.create>[0]>} obj */

/**
 * @template T, F
 * @typedef {F extends (...args: infer A) => infer R ? (this: T, ...args: A) => R : F} SetThisType
 */

/**
 * @template {Iterator<any, any, any> | AsyncIterator<any, any, any>} I
 * @typedef {{"[[Iterator]]": I, "[[NextMethod]]": SetThisType<I, I["next"]>, "[[Done]]": boolean}} IteratorRecord
 */

/**
 * @template O
 * @template {Iterator<any, any, any> | AsyncIterator<any, any, any>} I
 * @param {O} obj The iterable
 * @param {"sync" | "async"} [hint] Whether to use a synchronous or asynchronous iterator.
 * @param {(this: O) => I} [method] The method to use to get the `Iterator`
 * @return {IteratorRecord<I>}
 */
// https://ecma-international.org/ecma-262/9.0/#sec-getiterator
function GetIterator<
	O extends object,
	I extends Iterator<any, any, any> | AsyncIterator<any, any, any>
>(obj: O, hint?: "sync" | "async", method?: (this: O) => I): IteratorRecord<I> {
	var actualHint: "sync" | "async" = hint!;
	if (arguments.length < 2) {
		actualHint = "sync";
	}
	if (actualHint !== "sync" && actualHint !== "async") {
		// prettier-ignore
		throw new $TypeError("Assertion failed: `hint` must be one of 'sync' or 'async', got " + inspect(hint));
	}

	/** @type {any} */
	var actualMethod: any = method;
	if (arguments.length < 3) {
		if (actualHint === "async") {
			if (hasSymbols && $asyncIterator) {
				actualMethod = ES2018.GetMethod(obj, $asyncIterator);
			}
			if (actualMethod === undefined) {
				throw new $TypeError(
					"async from sync iterators aren't currently supported"
				);
			}
		} else {
			actualMethod = getIteratorMethod(obj);
		}
	}

	/** @type {I} */
	var iterator: I = ES2018.Call<(this: O) => I, O, []>(actualMethod, obj);
	if (ES2018.Type(iterator) !== "Object") {
		throw new $TypeError("iterator must return an object");
	}

	/** @type {any} */
	var nextMethod: any = ES2018.GetV(iterator, "next");
	return {
		"[[Iterator]]": iterator,
		"[[NextMethod]]": nextMethod,
		"[[Done]]": false,
	};
}

/**
 * @template T
 * @param {Iterator<any, any, any> | AsyncIterator<any, any, any> | IteratorRecord<Iterator<any, any, any> | AsyncIterator<any, any, any>>} iteratorRecord
 * @param {() => T | PromiseLike<T>} completion
 * @return {Promise<T>}
 */
// https://ecma-international.org/ecma-262/9.0/#sec-asynciteratorclose
function AsyncIteratorClose<T>(
	iteratorRecord:
		| Iterator<any, any, any>
		| AsyncIterator<any, any, any>
		| IteratorRecord<
				Iterator<any, any, any> | AsyncIterator<any, any, any>
		  >,
	completion: () => T | PromiseLike<T>
): Promise<T> {
	let completionThunk: typeof completion | null;
	var iterator:
		| Iterator<any, any, undefined>
		| AsyncIterator<any, any, undefined>;
	var iteratorReturn: (
		value?: any
	) => IteratorResult<any, any> | Promise<IteratorResult<any, any>>;

	/** @type {ReturnType<typeof completion>} */
	var completionRecord: ReturnType<typeof completion>;
	var ES = ES2018;

	// Heavily modified from the output of https://www.npmjs.com/package/babel-plugin-async-to-promises
	return $NewPromise().then((): PromiseLike<T> | T => {
		if ("[[Iterator]]" in iteratorRecord) {
			if (ES.Type(iteratorRecord["[[Iterator]]"]) !== "Object") {
				throw new $TypeError(
					"Assertion failed: Type(iteratorRecord.[[Iterator]]) is not Object"
				);
			}
			iterator = iteratorRecord["[[Iterator]]"];
		} else {
			iterator = iteratorRecord;
		}

		if (!ES.IsCallable(completion)) {
			throw new $TypeError(
				"Assertion failed: completion is not a thunk for a Completion Record"
			);
		}

		completionThunk = completion;
		iteratorReturn = ES.GetMethod(iterator, "return")!;

		if (typeof iteratorReturn === "undefined") {
			return completionThunk();
		} else {
			return $NewPromise()
				.then(function() {
					return ES.Call(iteratorReturn, iterator, []);
				})
				.then(
					function(innerResult) {
						completionRecord = completionThunk!(); // if innerResult worked, then throw if the completion does
						completionThunk = null; // ensure it's not called twice.

						if (ES.Type(innerResult) !== "Object") {
							throw new $TypeError(
								"iterator .return must return an object"
							);
						}

						return completionRecord;
					},
					function(e) {
						// if we hit here, then "e" is the innerResult completion that needs re-throwing

						// if the completion is of type "throw", this will throw.
						completionRecord = completionThunk!();
						completionThunk = null; // ensure it's not called twice.

						// if not, then return the innerResult completion
						throw e;
					}
				);
		}
	});
}

function GetIteratorDirect<O extends object>(
	obj: O,
	useIteratorRecord?: false
): O extends Iterator<any, any, any> | AsyncIterator<any, any, any> ? O : never;

/**
 * @template {obj} O
 * @param {O} obj
 * @return {O extends Iterator<any, any, any> | AsyncIterator<any, any, any> ? O : never}
 */
function GetIteratorDirect<O extends object>(
	obj: O
): O extends Iterator<any, any, any> | AsyncIterator<any, any, any>
	? O
	: never {
	if (ES2018.Type(obj) !== "Object") {
		throw new $TypeError("obj must be an Object, got " + ES2018.Type(obj));
	}
	const nextMethod = ES2018.GetV(obj, "next");
	if (!ES2018.IsCallable(nextMethod)) {
		throw new $TypeError(inspect(nextMethod) + " is not a function");
	}
	return obj as any;
}

function IteratorStep<T>(
	iterator: Iterator<T> | IteratorRecord<Iterator<T>>
): IteratorYieldResult<T> | false;
function IteratorStep<T, TNext = undefined>(
	iterator: Iterator<T, any, TNext> | IteratorRecord<Iterator<T, any, TNext>>,
	value: TNext
): IteratorYieldResult<T> | false;

/**
 * @template T, TReturn, TNext
 * @param {Iterator<T, TReturn, TNext>} iterator
 * @param {TNext} [value]
 * @return {false | IteratorYieldResult<T>}
 */
function IteratorStep<T, TReturn, TNext>(
	iterator:
		| Iterator<T, TReturn, TNext>
		| IteratorRecord<Iterator<T, TReturn, TNext>>,
	value?: TNext
): false | IteratorYieldResult<T> {
	let result: IteratorResult<T, TReturn>;
	if (arguments.length > 1) {
		result = IteratorNext(iterator, value);
	} else {
		result = IteratorNext(iterator);
	}
	let done = ES2018.IteratorComplete(result);
	return done === true ? false : (result as IteratorYieldResult<T>);
}

function IteratorNext<T, TReturn = unknown, TNext = undefined>(
	iteratorRecord:
		| Iterator<T, TReturn, TNext>
		| IteratorRecord<Iterator<T, TReturn, TNext>>,
	value?: TNext
): IteratorResult<T, TReturn>;
function IteratorNext<T, TReturn = unknown, TNext = undefined>(
	iteratorRecord:
		| AsyncIterator<T, TReturn, TNext>
		| IteratorRecord<AsyncIterator<T, TReturn, TNext>>,
	value?: TNext
): Promise<IteratorResult<T, TReturn>>;
function IteratorNext<T, TReturn = unknown, TNext = undefined>(
	iteratorRecord:
		| Iterator<T, TReturn, TNext>
		| AsyncIterator<T, TReturn, TNext>
		| IteratorRecord<
				Iterator<T, TReturn, TNext> | AsyncIterator<T, TReturn, TNext>
		  >,
	value?: TNext
): IteratorResult<T, TReturn> | Promise<IteratorResult<T, TReturn>>;

/**
 * @template T, TReturn, TNext
 * @param {{ next(value?: TNext): any } | IteratorRecord<{ next(value?: TNext): any }>} iterator
 * @param {TNext} [value]
 * @return {IteratorResult<T, TReturn> | Promise<IteratorResult<T, TReturn>>}
 */
function IteratorNext<T, TReturn = unknown, TNext = undefined>(
	iterator:
		| {
				next(
					value?: TNext
				):
					| IteratorResult<T, TReturn>
					| Promise<IteratorResult<T, TReturn>>;
		  }
		| IteratorRecord<{ next(value?: TNext): any }>,
	value: TNext
): IteratorResult<T, TReturn> | Promise<IteratorResult<T, TReturn>> {
	let result: any;
	if ("[[Iterator]]" in iterator) {
		result = ES2018.Call(
			iterator["[[NextMethod]]"],
			iterator["[[Iterator]]"],
			arguments.length < 2 ? [] : [value]
		);
	} else {
		result = ES2018.Invoke(
			iterator,
			"next",
			arguments.length < 2 ? [] : [value]
		);
	}
	if (ES2018.Type(result) !== "Object") {
		throw new $TypeError("iterator next must return an object");
	}
	return result;
}

/** @type {typeof import('./implementation').Iterator} */
const Iterator: typeof $IteratorPolyfill = ((): any => {
	/** @type {any} */
	function Iterator() {
		if (new.target === undefined) {
			throw new $TypeError("Cannot call a class as a function");
		}
		if (new.target === Iterator) {
			throw new $TypeError("Cannot construct abstract class");
		}
	}

	define(Iterator, {
		/**
		 * @template T
		 * @param {Iterable<T> | Iterator<T>} O
		 * @return {import('./implementation').Iterator<T>}
		 */
		from<T>(O: Iterable<T> | Iterator<T>): $IteratorPolyfill<T> {
			let usingIterator = getIteratorMethod(O);
			/** @type {IteratorRecord<Iterator<T>>} */
			let iteratorRecord: IteratorRecord<Iterator<T>>;
			if (usingIterator !== undefined) {
				iteratorRecord = GetIterator<Iterable<T>, Iterator<T>>(
					O as Iterable<T>,
					"sync",
					usingIterator
				);
				let hasInstance = ES2018.OrdinaryHasInstance(
					Iterator,
					iteratorRecord["[[Iterator]]"]
				);
				if (hasInstance) {
					return iteratorRecord["[[Iterator]]"] as any;
				}
			} else {
				let iterator = GetIteratorDirect(O);
				iteratorRecord = {
					"[[Iterator]]": iterator,
					"[[NextMethod]]": iterator.next,
					"[[Done]]": false,
				};
			}

			/** @type {any} */
			let wrapper: $IteratorPolyfill<T> = ES2018.ObjectCreate(
				WrapForValidIteratorPrototype
			) as $IteratorPolyfill<T>;
			SLOT.set(wrapper, "[[Iterated]]", iteratorRecord);
			return wrapper;
		},
	});

	define(Iterator.prototype, {
		/**
		 * @template T
		 * @template U
		 * @this {Iterator<T>}
		 * @param {(value: T) => U} mapper
		 * @return {Generator<U, undefined>}
		 */
		*map<T, U>(
			this: Iterator<T>,
			mapper: (value: T) => U
		): Generator<U, undefined> {
			let iterated = GetIteratorDirect(this);
			if (!ES2018.IsCallable(mapper)) {
				throw new $TypeError(inspect(mapper) + " is not a function");
			}

			/** @type {unknown} */
			let lastValue: unknown; // = function.sent;
			/** @type {false | IteratorYieldResult<any>}  */
			let next: false | IteratorYieldResult<any>;
			while ((next = IteratorStep(iterated, lastValue))) {
				/** @type {T} */
				let value: T = ES2018.IteratorValue(next);

				/** @type {U} */
				let mapped: U;
				try {
					mapped = ES2018.Call(mapper, undefined, [value]);
				} catch (e) {
					return ES2018.IteratorClose(iterated, () => {
						throw e;
					});
				}
				try {
					lastValue = yield mapped;
				} catch (e) {
					return ES2018.IteratorClose(iterated, () => {
						throw e;
					});
				}
			}
		},

		/**
		 * @template T
		 * @this {Iterator<T>}
		 * @param {(value: T) => unknown} filterer
		 * @return {Generator<T, undefined>}
		 */
		*filter<T>(
			this: Iterator<T>,
			filterer: (value: T) => unknown
		): Generator<T, undefined> {
			let iterated = GetIteratorDirect(this);
			if (!ES2018.IsCallable(filterer)) {
				throw new $TypeError(inspect(filterer) + " is not a function");
			}

			/** @type {unknown} */
			let lastValue: unknown;
			/** @type {false | IteratorYieldResult<any>}  */
			let next: false | IteratorYieldResult<any>;
			while ((next = IteratorStep(iterated, lastValue))) {
				/** @type {T} */
				let value: T = ES2018.IteratorValue(next);

				let selected;
				try {
					selected = ES2018.Call(filterer, undefined, [value]);
				} catch (e) {
					return ES2018.IteratorClose(iterated, () => {
						throw e;
					});
				}
				if (selected) {
					try {
						lastValue = yield value;
					} catch (e) {
						return ES2018.IteratorClose(iterated, () => {
							throw e;
						});
					}
				}
			}
		},

		/**
		 * @template T
		 * @this {Iterator<T>}
		 * @param {number} limit
		 * @return {Generator<T, undefined>}
		 */
		*take<T>(this: Iterator<T>, limit: number): Generator<T, undefined> {
			let iterated = GetIteratorDirect(this);
			let remaining = ES2018.ToInteger(limit);
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
					lastValue = yield ES2018.IteratorValue(next);
				} catch (e) {
					return ES2018.IteratorClose(iterated, () => {
						throw e;
					});
				}
			}
		},

		/**
		 * @template T
		 * @this {Iterator<T>}
		 * @param {number} limit
		 * @return {Generator<T, undefined>}
		 */
		*drop<T>(this: Iterator<T>, limit: number): Generator<T, undefined> {
			let iterated = GetIteratorDirect(this);
			let remaining = ES2018.ToInteger(limit);
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
					lastValue = yield ES2018.IteratorValue(next);
				} catch (e) {
					return ES2018.IteratorClose(iterated, () => {
						throw e;
					});
				}
			}
		},

		/**
		 * @template T
		 * @this {Iterator<T>}
		 * @return {Generator<[number, T], undefined>}
		 */
		*asIndexedPairs<T>(
			this: Iterator<T>
		): Generator<[number, T], undefined> {
			let iterated = GetIteratorDirect(this);
			let index = 0;

			/** @type {unknown} */
			let lastValue: unknown;

			/** @type {false | IteratorYieldResult<T>}  */
			let next: false | IteratorYieldResult<T>;
			while ((next = IteratorStep(iterated, lastValue))) {
				/** @type {T} */
				let value: T = ES2018.IteratorValue(next);

				let pair: [number, T] = [index, value];
				index += 1;

				try {
					lastValue = yield pair;
				} catch (e) {
					return ES2018.IteratorClose(iterated, () => {
						throw e;
					});
				}
			}
		},

		/**
		 * @template T
		 * @template U
		 * @this {Iterator<T>}
		 * @param {(value: T) => Iterable<U>} mapper
		 * @return {Generator<U, undefined>}
		 */
		*flatMap<T, U>(
			this: Iterator<T>,
			mapper: (value: T) => Iterable<U>
		): Generator<U, undefined> {
			let iterated = GetIteratorDirect(this);
			if (!ES2018.IsCallable(mapper)) {
				throw new $TypeError(inspect(mapper) + " is not a function");
			}

			/** @type {false | IteratorYieldResult<T>}  */
			let next: false | IteratorYieldResult<T>;
			while ((next = IteratorStep(iterated))) {
				/** @type {T} */
				let value: T = ES2018.IteratorValue(next);

				let mapped: Iterable<U>;
				try {
					mapped = ES2018.Call(mapper, undefined, [value]);
				} catch (e) {
					return ES2018.IteratorClose(iterated, () => {
						throw e;
					});
				}

				let innerIterator = GetIterator(mapped);
				/** @type {false | IteratorYieldResult<U>} */
				let innerNext: false | IteratorYieldResult<U>;
				while ((innerNext = IteratorStep(innerIterator))) {
					yield ES2018.IteratorValue(innerNext);
				}
			}
		},

		/**
		 * @template T
		 * @template U
		 * @this {Iterator<T>}
		 * @param {(accumulator: U, value: T) => U} reducer
		 * @param {U} [initialValue]
		 * @return {U}
		 */
		reduce<T, U>(
			this: Iterator<T>,
			reducer: (accumulator: U, value: T) => U,
			initialValue?: U
		): U {
			let iterated = GetIteratorDirect(this);
			if (!ES2018.IsCallable(reducer)) {
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
						"reduce of empty iterator with no initial value"
					);
				}
				accumulator = ES2018.IteratorValue<any>(next);
			} else {
				accumulator = initialValue!;
			}

			while ((next = IteratorStep(iterated))) {
				/** @type {T} */
				let value: T = ES2018.IteratorValue(next);

				let result: any;
				try {
					result = ES2018.Call<typeof reducer, undefined, [U, T]>(
						reducer,
						undefined,
						[accumulator, value]
					);
				} catch (e) {
					return ES2018.IteratorClose(iterated, () => {
						throw e;
					});
				}
				accumulator = result;
			}

			return accumulator;
		},

		/**
		 * @template T
		 * @this {Iterator<T>}
		 * @return {T[]}
		 */
		toArray<T>(this: Iterator<T>): T[] {
			let iterated = GetIteratorDirect(this);
			/** @type {T[]} */
			let items: T[] = [];

			/** @type {false | IteratorYieldResult<T>}  */
			let next: false | IteratorYieldResult<T>;
			while ((next = IteratorStep(iterated))) {
				items.push(ES2018.IteratorValue(next));
			}

			return items;
		},

		/**
		 * @template T
		 * @this {Iterator<T>}
		 * @param {(value: T) => void} fn
		 */
		forEach<T>(this: Iterator<T>, fn: (value: T) => void): void {
			let iterated = GetIteratorDirect(this);
			if (!ES2018.IsCallable(fn)) {
				throw new $TypeError(inspect(fn) + " is not a function");
			}

			/** @type {false | IteratorYieldResult<T>}  */
			let next: false | IteratorYieldResult<T>;
			while ((next = IteratorStep(iterated))) {
				/** @type {T} */
				let value: T = ES2018.IteratorValue(next);

				try {
					ES2018.Call(fn, undefined, [value]);
				} catch (e) {
					return ES2018.IteratorClose(iterated, () => {
						throw e;
					});
				}
			}
		},

		/**
		 * @template T
		 * @this {Iterator<T>}
		 * @param {(value: T) => unknown} fn
		 * @return {boolean}
		 */
		some<T>(this: Iterator<T>, fn: (value: T) => unknown): boolean {
			let iterated = GetIteratorDirect(this);
			if (!ES2018.IsCallable(fn)) {
				throw new $TypeError(inspect(fn) + " is not a function");
			}

			/** @type {false | IteratorYieldResult<T>}  */
			let next: false | IteratorYieldResult<T>;
			while ((next = IteratorStep(iterated))) {
				/** @type {T} */
				let value: T = ES2018.IteratorValue(next);

				let result;
				try {
					result = ES2018.Call(fn, undefined, [value]);
				} catch (e) {
					return ES2018.IteratorClose(iterated, () => {
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
		 * @this {Iterator<T>}
		 * @param {(value: T) => unknown} fn
		 * @return {boolean}
		 */
		every<T>(this: Iterator<T>, fn: (value: T) => unknown): boolean {
			let iterated = GetIteratorDirect(this);
			if (!ES2018.IsCallable(fn)) {
				throw new $TypeError(inspect(fn) + " is not a function");
			}

			/** @type {false | IteratorYieldResult<T>}  */
			let next: false | IteratorYieldResult<T>;
			while ((next = IteratorStep(iterated))) {
				/** @type {T} */
				let value: T = ES2018.IteratorValue(next);

				let result;
				try {
					result = ES2018.Call(fn, undefined, [value]);
				} catch (e) {
					return ES2018.IteratorClose(iterated, () => {
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
		 * @this {Iterator<T>}
		 * @param {(value: T) => unknown} fn
		 * @return {T | undefined}
		 */
		find<T>(
			this: Iterator<T>,
			fn: (value: unknown) => unknown
		): T | undefined {
			let iterated = GetIteratorDirect(this);
			if (!ES2018.IsCallable(fn)) {
				throw new $TypeError(inspect(fn) + " is not a function");
			}

			/** @type {false | IteratorYieldResult<T>}  */
			let next: false | IteratorYieldResult<T>;
			while ((next = IteratorStep(iterated))) {
				/** @type {T} */
				let value: T = ES2018.IteratorValue(next);

				let result;
				try {
					result = ES2018.Call(fn, undefined, [value]);
				} catch (e) {
					return ES2018.IteratorClose(iterated, () => {
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
		ES2018.OrdinaryDefineOwnProperty(Iterator.prototype, $toStringTag, {
			"[[Value]]": "Iterator",
			"[[Configurable]]": true,
		});
	}

	if ($IteratorProto) {
		$setProto(Iterator.prototype, $IteratorProto);
	} else if ($iterator) {
		// This probably can't occur in a real environment

		ES2018.CreateMethodProperty(
			Iterator.prototype,
			$iterator,
			function anonymous(this: any) {
				return this;
			}
		);

		try {
			Object.defineProperty(Iterator.prototype[$iterator], "name", {
				value: "[Symbol.iterator]",
			});
		} catch {}
	}

	return Iterator;
})();

export { Iterator };

const WrapForValidIteratorPrototype = ES2018.ObjectCreate(Iterator.prototype);
define(WrapForValidIteratorPrototype, {
	next(value?: any) {
		const O = this;
		SLOT.assert(O, "[[Iterated]]");
		let iterated: IteratorRecord<Iterator<any>> = SLOT.get(
			O,
			"[[Iterated]]"
		);
		if (arguments.length > 0) {
			return IteratorNext(iterated, value);
		} else {
			return IteratorNext(iterated);
		}
	},

	return<TReturn>(v?: TReturn): IteratorResult<never, TReturn> {
		const O = this;
		SLOT.assert(O, "[[Iterated]]");
		return ES2018.IteratorClose(
			SLOT.get(O, "[[Iterated]]")["[[Iterator]]"],
			() => ({
				done: true,
				value: v!,
			})
		);
	},

	throw(v?: any): IteratorResult<any> {
		const O = this;
		SLOT.assert(O, "[[Iterated]]");
		const iterator: IteratorRecord<Iterator<any>> = SLOT.get(
			O,
			"[[Iterated]]"
		);
		const _throw: Iterator<any>["throw"] = ES2018.GetMethod(
			iterator["[[Iterator]]"],
			"throw"
		);
		if (_throw === undefined) {
			throw v;
		}
		return ES2018.Call(_throw, iterator, [v]);
	},
});

/** @type {typeof import('./implementation').AsyncIterator} */
const AsyncIterator: typeof $IteratorPolyfill = ((): any => {
	function AsyncIterator() {
		if (new.target === undefined) {
			throw new $TypeError("Cannot call a class as a function");
		}
		if (new.target === AsyncIterator) {
			throw new $TypeError("Cannot construct abstract class");
		}
	}

	define(AsyncIterator, {
		/**
		 * @template T
		 * @param {Iterable<T> | Iterator<T> | AsyncIterable<T> | AsyncIterator<T>} O
		 * @return {import('./implementation').AsyncIterator<T>}
		 */
		from<T>(
			O: Iterable<T> | Iterator<T> | AsyncIterable<T> | AsyncIterator<T>
		): AsyncIterator<T> {
			/** @type {(() => Iterator<T> | AsyncIterator<T>) | undefined} */
			let usingIterator:
				| (() => Iterator<T> | AsyncIterator<T>)
				| undefined = $asyncIterator
				? (ES2018.GetMethod(O, $asyncIterator) as
						| (() => AsyncIterator<T>)
						| undefined)
				: undefined;
			let iteratorRecord: IteratorRecord<AsyncIterator<T>> | undefined;
			if (usingIterator !== undefined) {
				iteratorRecord = GetIterator(O, "async", usingIterator);
				let hasInstance = ES2018.OrdinaryHasInstance(
					AsyncIterator,
					iteratorRecord["[[Iterator]]"]
				);
				if (hasInstance) {
					return iteratorRecord["[[Iterator]]"] as any;
				}
			}

			if (iteratorRecord === undefined) {
				usingIterator = getIteratorMethod(O);
				if (usingIterator !== undefined) {
					throw new $TypeError(
						"async from sync iterators aren't currently supported"
					);
					// let syncIteratorRecord = GetIterator(O, "sync", usingIterator as () => Iterator<T>);
				}
			}

			if (iteratorRecord === undefined) {
				let iterator = GetIteratorDirect(O) as AsyncIterator<T>;
				iteratorRecord = {
					"[[Iterator]]": iterator,
					"[[NextMethod]]": iterator.next,
					"[[Done]]": false,
				};
			}

			/** @type {import('./implementation').AsyncIterator<T>} */
			let wrapper: $AsyncIteratorPolyfill<T> = ES2018.ObjectCreate(
				WrapForValidAsyncIteratorPrototype
			) as $AsyncIteratorPolyfill<T>;
			SLOT.set(wrapper, "[[AsyncIterated]]", iteratorRecord);
			return wrapper;
		},
	});

	define<ThisType<AsyncIterator<any>>>(AsyncIterator.prototype, {
		/**
		 * @template T
		 * @template U
		 * @this {Iterator<T> | AsyncIterator<T>}
		 * @param {(value: T) => U | PromiseLike<U>} mapper
		 * @return {AsyncGenerator<U, undefined>}
		 */
		async *map<T, U>(
			this: Iterator<T> | AsyncIterator<T>,
			mapper: (value: T) => U | PromiseLike<U>
		): AsyncGenerator<U, undefined> {
			let iterated = GetIteratorDirect(this);
			if (!ES2018.IsCallable(mapper)) {
				throw new $TypeError(inspect(mapper) + " is not a function");
			}

			/** @type {unknown} */
			let lastValue: unknown;
			/** @type {IteratorResult<T>} */
			let next: IteratorResult<T>;
			while (
				(next = await IteratorNext(iterated, lastValue)) &&
				!ES2018.IteratorComplete(next)
			) {
				/** @type {T} */
				let value: T = ES2018.IteratorValue(next);

				let mapped: U | PromiseLike<U>;
				try {
					mapped = ES2018.Call(mapper, undefined, [value]);
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
		 * @this {Iterator<T> | AsyncIterator<T>}
		 * @param {(value: T) => unknown | PromiseLike<unknown>} filterer
		 * @return {AsyncGenerator<T, undefined>}
		 */
		async *filter<T>(
			this: Iterator<T> | AsyncIterator<T>,
			filterer: (value: T) => unknown | PromiseLike<unknown>
		): AsyncGenerator<T, undefined> {
			let iterated = GetIteratorDirect(this);
			if (!ES2018.IsCallable(filterer)) {
				throw new $TypeError(inspect(filterer) + " is not a function");
			}

			/** @type {unknown} */
			let lastValue: unknown;
			/** @type {IteratorResult<T>} */
			let next: IteratorResult<T>;
			while (
				(next = await IteratorNext(iterated, lastValue)) &&
				!ES2018.IteratorComplete(next)
			) {
				/** @type {T} */
				let value: T = ES2018.IteratorValue(next);

				let selected;
				try {
					selected = ES2018.Call(filterer, undefined, [value]);
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

				if (ES2018.ToBoolean(selected)) {
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
		 * @this {Iterator<T> | AsyncIterator<T>}
		 * @param {number} limit
		 * @return {AsyncGenerator<T, undefined>}
		 */
		async *take<T>(
			this: Iterator<T> | AsyncIterator<T>,
			limit: number
		): AsyncGenerator<T, undefined> {
			let iterated = GetIteratorDirect(this);
			let remaining = ES2018.ToInteger(limit);
			if (remaining < 0) {
				throw new $RangeError("limit must be >= 0");
			}

			/** @type {unknown} */
			let lastValue: unknown;
			while (remaining > 0) {
				remaining -= 1;

				let next = await IteratorNext(iterated, lastValue);
				if (ES2018.IteratorComplete(next)) {
					return;
				}

				try {
					lastValue = yield ES2018.IteratorValue(next);
				} catch (e) {
					AsyncIteratorClose(iterated, () => {
						throw e;
					});
				}
			}
		},

		/**
		 * @template T
		 * @this {Iterator<T> | AsyncIterator<T>}
		 * @param {number} limit
		 * @return {AsyncGenerator<T, undefined>}
		 */
		async *drop<T>(
			this: Iterator<T> | AsyncIterator<T>,
			limit: number
		): AsyncGenerator<T, undefined> {
			let iterated = GetIteratorDirect(this);
			let remaining = ES2018.ToInteger(limit);
			if (remaining < 0) {
				throw new $RangeError("limit must be >= 0");
			}

			while (remaining > 0) {
				remaining -= 1;
				let next = await IteratorNext(iterated);
				if (ES2018.IteratorComplete(next)) {
					return;
				}
			}

			/** @type {unknown} */
			let lastValue: unknown = undefined;
			/** @type {IteratorResult<T>} */
			let next: IteratorResult<T>;
			while (
				(next = await IteratorNext(iterated, lastValue)) &&
				!ES2018.IteratorComplete(next)
			) {
				try {
					lastValue = yield ES2018.IteratorValue(next);
				} catch (e) {
					return AsyncIteratorClose(iterated, () => {
						throw e;
					});
				}
			}
		},

		/**
		 * @template T
		 * @this {Iterator<T> | AsyncIterator<T>}
		 * @return {AsyncGenerator<[number, T], undefined>}
		 */
		async *asIndexedPairs<T>(
			this: Iterator<T> | AsyncIterator<T>
		): AsyncGenerator<[number, T], undefined> {
			let iterated = GetIteratorDirect(this);
			let index = 0;

			/** @type {unknown} */
			let lastValue: unknown;

			/** @type {IteratorResult<T>}  */
			let next: IteratorResult<T>;
			while (
				(next = await IteratorNext(iterated, lastValue)) &&
				!ES2018.IteratorComplete(next)
			) {
				/** @type {T} */
				let value: T = ES2018.IteratorValue(next);

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
		 * @template T
		 * @template U
		 * @this {Iterator<T> | AsyncIterator<T>}
		 * @param {(value: T) => Iterable<U> | AsyncIterable<U> | Promise<Iterable<U> | AsyncIterable<U>>} mapper
		 * @return {AsyncGenerator<U, undefined>}
		 */
		async *flatMap<T, U>(
			this: Iterator<T> | AsyncIterator<T>,
			mapper: (
				value: T
			) =>
				| Iterable<U>
				| AsyncIterable<U>
				| Promise<Iterable<U> | AsyncIterable<U>>
		): AsyncGenerator<U, undefined> {
			let iterated = GetIteratorDirect(this);
			if (!ES2018.IsCallable(mapper)) {
				throw new $TypeError(inspect(mapper) + " is not a function");
			}

			/** @type {IteratorResult<T>} */
			let next: IteratorResult<T>;

			while (
				(next = await IteratorNext(iterated)) &&
				!ES2018.IteratorComplete(next)
			) {
				/** @type {T} */
				let value: T = ES2018.IteratorValue(next);

				/** @type {Iterable<U> | AsyncIterable<U> | Promise<Iterable<U> | AsyncIterable<U>>} */
				let mapped:
					| Iterable<U>
					| AsyncIterable<U>
					| Promise<Iterable<U> | AsyncIterable<U>>;

				try {
					mapped = ES2018.Call(mapper, undefined, [value]);
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

				/** @type {IteratorRecord<AsyncIterator<U>>} */
				let innerIterator: IteratorRecord<
					AsyncIterator<U>
				> = GetIterator(mapped, "async");

				/** @type {IteratorResult<U>} */
				let innerNext: IteratorResult<U>;
				while (
					(innerNext = await IteratorNext(innerIterator)) &&
					!ES2018.IteratorComplete(innerNext)
				) {
					yield ES2018.IteratorValue(innerNext);
				}
			}
		},

		/**
		 * @template T
		 * @template U
		 * @this {Iterator<T> | AsyncIterator<T>}
		 * @param {(accumulator: U, value: T) => U | PromiseLike<U>} reducer
		 * @param {U} [initialValue]
		 * @return {Promise<U>}
		 */
		reduce<T, U>(
			this: Iterator<T> | AsyncIterator<T>,
			reducer: (accumulator: U, value: T) => U | PromiseLike<U>,
			initialValue?: U
		): Promise<U> {
			const _args = arguments;

			/** @type {Iterator<T> | AsyncIterator<T>} */
			let iterated: Iterator<T> | AsyncIterator<T>;

			return $NewPromise()
				.then(() => {
					iterated = GetIteratorDirect(this);
					if (!ES2018.IsCallable(reducer)) {
						throw new $TypeError(
							inspect(reducer) + " is not a function"
						);
					}

					if (_args.length < 2) {
						return $NewPromise()
							.then(() => IteratorNext(iterated))
							.then((
								/** @type {IteratorResult<any>} */
								next: IteratorResult<any>
							) => {
								if (ES2018.IteratorComplete(next)) {
									throw new $TypeError(
										"reduce of empty iterator with no initial value"
									);
								}
								return ES2018.IteratorValue(next);
							});
					} else {
						return initialValue;
					}
				})
				.then(function _recursive(accumulator: U): Promise<U> {
					return $NewPromise()
						.then(() => IteratorNext(iterated))
						.then((next: IteratorResult<T>) => {
							if (ES2018.IteratorComplete(next)) {
								return accumulator;
							}

							let value = ES2018.IteratorValue(next);

							/** @type {U | PromiseLike<U>} */
							let result: U | PromiseLike<U>;

							try {
								result = ES2018.Call<
									typeof reducer,
									undefined,
									[U, T]
								>(reducer, undefined, [accumulator, value]);
							} catch (e) {
								return AsyncIteratorClose(iterated, () => {
									throw e;
								});
							}

							return $NewPromise(result).then<U>(
								_recursive,
								function(e) {
									return AsyncIteratorClose(iterated, () => {
										throw e;
									});
								}
							);
						});
				});
		},

		/**
		 * @template T
		 * @this {Iterator<T> | AsyncIterator<T>}
		 * @return {Promise<T[]>}
		 */
		toArray<T>(this: Iterator<T> | AsyncIterator<T>): Promise<T[]> {
			/** @type {Iterator<T> | AsyncIterator<T>} */
			let iterated: Iterator<T> | AsyncIterator<T>;

			return $NewPromise()
				.then(() => {
					iterated = GetIteratorDirect(this);

					/** @type {T[]} */
					let items: T[] = [];
					return items;
				})
				.then(function __recursive(items: T[]): Promise<T[]> {
					return $NewPromise()
						.then(() => IteratorNext(iterated))
						.then((next: IteratorResult<T>) => {
							if (ES2018.IteratorComplete(next)) {
								return items;
							}

							items.push(ES2018.IteratorValue(next));

							return __recursive(items);
						});
				});
		},

		/**
		 * @template T
		 * @this {Iterator<T> | AsyncIterator<T>}
		 * @param {(value: T) => void | PromiseLike<void>} fn
		 * @return {Promise<void>}
		 */
		forEach<T>(
			this: Iterator<T> | AsyncIterator<T>,
			fn: (value: T) => void | PromiseLike<void>
		): Promise<void> {
			/** @type {Iterator<T> | AsyncIterator<T>} */
			let iterated: Iterator<T> | AsyncIterator<T>;

			return $NewPromise()
				.then(() => {
					iterated = GetIteratorDirect(this);
					if (!ES2018.IsCallable(fn)) {
						throw new $TypeError(
							inspect(fn) + " is not a function"
						);
					}
				})
				.then(function __recursive(): Promise<void> {
					return $NewPromise()
						.then(() => IteratorNext(iterated))
						.then((next: IteratorResult<T>) => {
							if (ES2018.IteratorComplete(next)) {
								return;
							}

							/** @type {T} */
							let value: T = ES2018.IteratorValue(next);

							/** @type {void | PromiseLike<void>} */
							let r: void | PromiseLike<void>;

							try {
								r = ES2018.Call(fn, undefined, [value]);
							} catch (e) {
								return AsyncIteratorClose(iterated, () => {
									throw e;
								});
							}

							return $NewPromise(r).then(__recursive, e => {
								return AsyncIteratorClose(iterated, () => {
									throw e;
								});
							});
						});
				});
		},

		/**
		 * @template T
		 * @this {Iterator<T> | AsyncIterator<T>}
		 * @param {(value: T) => unknown} fn
		 * @return {Promise<boolean>}
		 */
		some<T>(
			this: Iterator<T> | AsyncIterator<T>,
			fn: (value: T) => unknown
		): Promise<boolean> {
			/** @type {Iterator<T> | AsyncIterator<T>} */
			let iterated: Iterator<T> | AsyncIterator<T>;

			return $NewPromise()
				.then(() => {
					iterated = GetIteratorDirect(this);
					if (!ES2018.IsCallable(fn)) {
						throw new $TypeError(
							inspect(fn) + " is not a function"
						);
					}
				})
				.then(function __recursive(): Promise<boolean> {
					return $NewPromise()
						.then(() => IteratorNext(iterated))
						.then((next: IteratorResult<T>) => {
							if (ES2018.IteratorComplete(next)) {
								return false;
							}

							/** @type {T} */
							let value: T = ES2018.IteratorValue(next);

							/** @type {unknown} */
							let result: unknown;
							try {
								result = ES2018.Call(fn, undefined, [value]);
							} catch (e) {
								return AsyncIteratorClose(iterated, () => {
									throw e;
								});
							}

							return $NewPromise(result).then(
								result =>
									ES2018.ToBoolean(result)
										? true
										: __recursive(),
								e => {
									return AsyncIteratorClose(iterated, () => {
										throw e;
									});
								}
							);
						});
				});
		},

		/**
		 * @template T
		 * @this {Iterator<T> | AsyncIterator<T>}
		 * @param {(value: T) => unknown} fn
		 * @return {Promise<boolean>}
		 */
		every<T>(
			this: Iterator<T> | AsyncIterator<T>,
			fn: (value: T) => unknown
		): Promise<boolean> {
			/** @type {Iterator<T> | AsyncIterator<T>} */
			let iterated: Iterator<T> | AsyncIterator<T>;

			return $NewPromise()
				.then(() => {
					iterated = GetIteratorDirect(this);
					if (!ES2018.IsCallable(fn)) {
						throw new $TypeError(
							inspect(fn) + " is not a function"
						);
					}
				})
				.then(function __recursive(): Promise<boolean> {
					return $NewPromise()
						.then(() => IteratorNext(iterated))
						.then((next: IteratorResult<T>) => {
							if (ES2018.IteratorComplete(next)) {
								return true;
							}

							/** @type {T} */
							let value: T = ES2018.IteratorValue(next);

							/** @type {unknown} */
							let result: unknown;
							try {
								result = ES2018.Call(fn, undefined, [value]);
							} catch (e) {
								return AsyncIteratorClose(iterated, () => {
									throw e;
								});
							}

							return $NewPromise(result).then(
								result =>
									ES2018.ToBoolean(result)
										? __recursive()
										: false,
								e => {
									return AsyncIteratorClose(iterated, () => {
										throw e;
									});
								}
							);
						});
				});
		},

		/**
		 * @template T
		 * @this {Iterator<T> | AsyncIterator<T>}
		 * @param {(value: T) => unknown} fn
		 * @return {Promise<T | undefined>}
		 */
		find<T>(
			this: Iterator<T> | AsyncIterator<T>,
			fn: (value: T) => unknown
		): Promise<T | undefined> {
			/** @type {Iterator<T> | AsyncIterator<T>} */
			let iterated: Iterator<T> | AsyncIterator<T>;

			return $NewPromise()
				.then(() => {
					iterated = GetIteratorDirect(this);
					if (!ES2018.IsCallable(fn)) {
						throw new $TypeError(
							inspect(fn) + " is not a function"
						);
					}
				})
				.then(function __recursive(): Promise<T | undefined> {
					return $NewPromise()
						.then(() => IteratorNext(iterated))
						.then((next: IteratorResult<T>) => {
							if (ES2018.IteratorComplete(next)) {
								return undefined;
							}

							/** @type {T} */
							let value: T = ES2018.IteratorValue(next);

							/** @type {unknown} */
							let result: unknown;
							try {
								result = ES2018.Call(fn, undefined, [value]);
							} catch (e) {
								return AsyncIteratorClose(iterated, () => {
									throw e;
								});
							}

							return $NewPromise(result).then(
								result =>
									ES2018.ToBoolean(result)
										? value
										: __recursive(),
								e => {
									return AsyncIteratorClose(iterated, () => {
										throw e;
									});
								}
							);
						});
				});
		},
	});

	if ($toStringTag) {
		ES2018.OrdinaryDefineOwnProperty(
			AsyncIterator.prototype,
			$toStringTag,
			{
				"[[Value]]": "AsyncIterator",
				"[[Configurable]]": true,
			}
		);
	}

	if ($AsyncIteratorProto) {
		$setProto(Iterator.prototype, $AsyncIteratorProto);
	} else if ($asyncIterator) {
		// This can only occur in an ES2015-ES2017 environment where
		// a polyfill installs Symbol.asyncIterator before ES-Abstract
		// has been initialised.

		ES2018.CreateMethodProperty(
			AsyncIterator.prototype,
			$asyncIterator,
			function anonymous(this: any) {
				return this;
			}
		);

		try {
			Object.defineProperty(
				AsyncIterator.prototype[$asyncIterator],
				"name",
				{
					value: "[Symbol.asyncIterator]",
				}
			);
		} catch {}
	}

	return AsyncIterator;
})();

if ($toStringTag) {
	Object.defineProperty(AsyncIterator.prototype, $toStringTag, {
		value: "Async Iterator",
		configurable: true,
	});
}

if ($AsyncIteratorProto) {
	$setProto(AsyncIterator.prototype, $AsyncIteratorProto);
}

export { AsyncIterator };

const WrapForValidAsyncIteratorPrototype = ES2018.ObjectCreate(
	Iterator.prototype
);
define(WrapForValidAsyncIteratorPrototype, {
	next(value?: any): Promise<IteratorResult<any, any>> {
		const O = this;
		SLOT.assert(O, "[[AsyncIterated]]");
		let iterated: IteratorRecord<
			Iterator<any> | AsyncIterator<any>
		> = SLOT.get(O, "[[AsyncIterated]]");
		let result:
			| IteratorResult<any, any>
			| PromiseLike<IteratorResult<any, any>>;
		if (arguments.length > 0) {
			result = IteratorNext(iterated, value);
		} else {
			result = IteratorNext(iterated);
		}
		return $NewPromise(result);
	},

	return<TReturn>(v?: TReturn): Promise<IteratorResult<never, TReturn>> {
		const O = this;
		SLOT.assert(O, "[[AsyncIterated]]");
		return AsyncIteratorClose(
			SLOT.get(O, "[[AsyncIterated]]")["[[Iterator]]"],
			() => ({
				done: true,
				value: v!,
			})
		);
	},

	throw(v?: any): Promise<IteratorResult<any>> {
		const O = this;
		SLOT.assert(O, "[[AsyncIterated]]");
		const iterator: IteratorRecord<
			Iterator<any> | AsyncIterator<any>
		> = SLOT.get(O, "[[AsyncIterated]]");
		const _throw = ES2018.GetMethod(iterator["[[Iterator]]"], "throw");
		if (_throw === undefined) {
			throw v;
		}
		return $NewPromise(ES2018.Call(_throw, iterator, [v]));
	},
});
