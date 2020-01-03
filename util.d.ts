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
// Modified from tslib (https://www.npmjs.com/package/tslib)

export namespace __generator {
	const enum Opcode {
		/**
		 * Starts the generator, or resumes the generator with *value*
		 * as the result of the `AwaitExpression` where execution was paused.
		 */
		next = 0,

		/**
		 * Resumes the generator, throwing _value_ at `AwaitExpression`
		 * where execution was paused.
		 */
		throw = 1,

		/**
		 * Exits the generator, executing any `finally` blocks starting
		 * at the `AwaitExpression` where execution was paused.
		 */
		return = 2,

		/**
		 * Performs an unconditional jump to the specified label,
		 * executing any `finally` between the current instruction and the label.
		 */
		break = 3,

		/**
		 * Suspends the generator, setting the resume point at the next label
		 * and yielding the _value_.
		 */
		yield = 4,

		/**
		 * Suspends the generator, setting the resume point at the next label
		 * and delegating operations to the supplied value.
		 */
		yieldstar = 5,

		/**
		 * An internal instruction used to indicate an exception that was thrown
		 * from the body of the generator.
		 */
		catch = 6,

		/**
		 * Exits a `finally` block, resuming any previous operation
		 * (such as a `break`, `return`, `throw`, etc.)
		 */
		endfinally = 7,
	}

	/**
	 * Starts the generator, or resumes the generator with *value*
	 * as the result of the `AwaitExpression` where execution was paused.
	 */
	type NextOp = [Opcode.next, any];

	/**
	 * Resumes the generator, throwing _value_ at `AwaitExpression`
	 * where execution was paused.
	 */
	type ThrowOp = [Opcode.throw, any];

	/**
	 * Exits the generator, executing any `finally` blocks starting
	 * at the `AwaitExpression` where execution was paused.
	 */
	type ReturnOp<TReturn> = [Opcode.return, TReturn?];

	/**
	 * Performs an unconditional jump to the specified label,
	 * executing any `finally` between the current instruction and the label.
	 */
	type BreakOp = [Opcode.break, number];

	/**
	 * Suspends the generator, setting the resume point at the next label
	 * and yielding the _value_.
	 */
	type YieldOp<T> = [Opcode.yield, T];

	/**
	 * Suspends the generator, setting the resume point at the next label
	 * and delegating operations to the supplied value.
	 */
	type YieldStarOp<T> = [Opcode.yieldstar, Iterator<T>];

	/**
	 * An internal instruction used to indicate an exception that was thrown
	 * from the body of the generator.
	 */
	type CatchOp = [Opcode.catch, any];

	/**
	 * Exits a `finally` block, resuming any previous operation
	 * (such as a `break`, `return`, `throw`, etc.)
	 */
	type EndFinallyOp = [Opcode.endfinally];

	type TryTuple = [number, number | undefined, number | undefined, number];
	type OpTuple<T = any, TReturn = any> =
		| NextOp
		| ThrowOp
		| ReturnOp<TReturn>
		| BreakOp
		| YieldOp<T>
		| YieldStarOp<T>
		| CatchOp
		| EndFinallyOp;
	type Body<T, TYield, TReturn = any, TNext = any> = (
		this: T,
		state: State<TYield, TReturn, TNext>
	) => OpTuple<TYield, TReturn> | void;

	interface State<TYield, TReturn = any, TNext = any> {
		label: number;
		sent(): TNext;

		trys: TryTuple[];
		ops: OpTuple<TYield, TReturn>[];
	}
}
export function __generator<T, TYield, TReturn = any, TNext = any>(
	thisArg: T,
	body: __generator.Body<T, TYield, TReturn, TNext>
): Generator<TYield, TReturn, TNext>;

export function __await<V>(v: V): V extends __await<infer VInner> ? __await<VInner> : __await<V>;
export namespace __await {
	/**
	 * Used as a workaround because of the lack of proper nominal types.
	 *
	 * Doesn't actually exist during runtime.
	 */
	const __nominal__: unique symbol;
}
export interface __await<V> {
	v: V;
	readonly [__await.__nominal__]?: undefined;
}

export function __asyncGenerator<
	T,
	A extends any[],
	I extends Iterator<any, any, any>
>(
	thisArg: T,
	_arguments:
		| Readonly<A>
		| ArrayLike<
			A extends Array<infer T>
				? never extends T
					? any
					: T
				: any
		>,
	generator: (this: T, ...args: A) => I
): I extends Generator<any>
	? AsyncGenerator<any>
	: AsyncIterableIterator<any>;
