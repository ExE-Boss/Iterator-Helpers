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
	/**
	 * Starts the generator, or resumes the generator with *value*
	 * as the result of the `AwaitExpression` where execution was paused.
	 */
	type NextOp = [0, any];

	/**
	 * Resumes the generator, throwing _value_ at `AwaitExpression`
	 * where execution was paused.
	 */
	type ThrowOp = [1, any];

	/**
	 * Exits the generator, executing any `finally` blocks starting
	 * at the `AwaitExpression` where execution was paused.
	 */
	type ReturnOp<TReturn> = [2] | [2, TReturn];

	/**
	 * Performs an unconditional jump to the specified label,
	 * executing any `finally` between the current instruction and the label.
	 */
	type BreakOp = [3, number];

	/**
	 * Suspends the generator, setting the resume point at the next label
	 * and yielding the _value_.
	 */
	type YieldOp<T> = [4, T];

	/**
	 * Suspends the generator, setting the resume point at the next label
	 * and delegating operations to the supplied value.
	 */
	type YieldStarOp<T> = [5, Iterator<T>];

	/**
	 * An internal instruction used to indicate an exception that was thrown
	 * from the body of the generator.
	 */
	type CatchOp = [6, any];

	/**
	 * Exits a `finally` block, resuming any previous operation
	 * (such as a `break`, `return`, `throw`, etc.)
	 */
	type EndFinallyOp = [7];

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
	type Opcode = OpTuple<any>[0];
	type Body<T, TYield, TReturn = any, TNext = undefined> = (
		this: T,
		state: State<TYield, TReturn, TNext>
	) => OpTuple<TYield, TReturn> | void;

	interface State<TYield, TReturn = any, TNext = undefined> {
		label: number;
		sent(): TNext;

		trys: TryTuple[];
		ops: OpTuple<TYield, TReturn>[];
	}

	/*
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
	type Opcode = OpTuple<any>[0];
	type Body<T, Ops extends OpTuple = OpTuple, TNext = undefined> = (
		this: T,
		state: State<Ops, TNext>
	) => Ops | void;

	interface State<Ops extends OpTuple = OpTuple, TNext = undefined> {
		label: number;
		sent(): TNext;

		trys: TryTuple[];
		ops: Ops[];
	}

	type NonVoid<T> = T extends void ? never : T;

	type BodyToGen<B extends Body<any>> = OpsToGen<NonVoid<ReturnType<B>>, ReturnType<Parameters<B>[0]["sent"]>>;

	type OpsToGen<T extends OpTuple, TNext = any> = Generator<
		T extends [4, infer TYield] ? TYield : any,
		T extends [2, infer TReturn] ? TReturn : any,
		TNext
	>;
	*/
}

export function __generator<T, TYield, TReturn = any, TNext = undefined>(
	thisArg: T,
	body: __generator.Body<T, TYield, TReturn, TNext>
): Generator<TYield, never extends NonNullable<TReturn> ? TReturn : NonNullable<TReturn>, TNext>;

export namespace __await {
	interface Await<V> {
		v: V;

		[__await.__awaiter__]: true;
	}

	interface AwaitConstructor {
		<V>(value: V): V extends Await<infer VInner> ? Await<VInner> : Await<V>;
		new <V>(value: V): V extends Await<infer VInner> ? Await<VInner> : Await<V>;

		/**
		 * Used as a workaround because of the lack of proper nominal types.
		 *
		 * Doesn't actually exist during runtime.
		 */
		readonly __awaiter__: unique symbol;
	}
}

export const __await: __await.AwaitConstructor;

export function __asyncGenerator<T, A extends any[], TYield, TReturn = any>(
	thisArg: T,
	_arguments: A | ArrayLike<A extends (infer T)[] ? (never extends T ? any : T) : any> | null | undefined,
	generator: (this: T, ...args: A) => Iterator<TYield | __await.Await<any>, TReturn, any>
): AsyncGenerator<TYield, TReturn, any>;
