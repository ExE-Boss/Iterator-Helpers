export interface IteratorRecord<I extends Iterator<any, any, any> | AsyncIterator<any, any, any>> {
	"[[Iterator]]": I;
	"[[NextMethod]]": I["next"];
	"[[Done]]": boolean;
}

export function GetIteratorDirect<O extends object>(
	obj: O,
): O extends Iterator<any, any, any> | AsyncIterator<any, any, any> ? IteratorRecord<O> : never;

export function IteratorStep<T>(iteratorRecord: IteratorRecord<Iterator<T>>): IteratorYieldResult<T> | false;
export function IteratorStep<T, TNext = undefined>(
	iteratorRecord: IteratorRecord<Iterator<T, any, TNext>>,
	value: TNext,
): IteratorYieldResult<T> | false;

export function IteratorNext<T, TReturn = unknown, TNext = undefined>(
	iteratorRecord: IteratorRecord<Iterator<T, TReturn, TNext>>,
	value?: TNext,
): IteratorResult<T, TReturn>;
export function IteratorNext<T, TReturn = unknown, TNext = undefined>(
	iteratorRecord: IteratorRecord<Iterator<T, TReturn, TNext>> | IteratorRecord<AsyncIterator<T, TReturn, TNext>>,
	value?: TNext,
): IteratorResult<T, TReturn> | Promise<IteratorResult<T, TReturn>>;

export function GetIterator<I extends Iterator<unknown, unknown, unknown>>(obj: {
	[Symbol.iterator](): I;
}): IteratorRecord<I>;
export function GetIterator<I extends Iterator<unknown, unknown, unknown>>(
	obj: { [Symbol.iterator](): I },
	hint: "sync",
): IteratorRecord<I>;
export function GetIterator<O, I extends Iterator<unknown, unknown, unknown>>(
	obj: O,
	hint: "sync",
	method: (this: O) => I,
): IteratorRecord<I>;
export function GetIterator<
	// prettier-ignore
	O extends
		| { [Symbol.asyncIterator](): AsyncIterator<unknown, unknown, unknown> }
		| { [Symbol.iterator](): Iterator<unknown, unknown, unknown> }
>(
	obj: O,
	hint: "async",
): IteratorRecord<
	O extends { [Symbol.asyncIterator](): infer I }
		? I
		: O extends {
				[Symbol.iterator](): Iterator<
					infer T | PromiseLike<infer T>,
					infer TReturn | PromiseLike<infer TReturn>,
					infer TNext
				>;
		  }
		? AsyncIterator<T, TReturn, TNext>
		: AsyncIterator<any, any, any>
>;
export function GetIterator<
	O,
	I extends Iterator<unknown, unknown, unknown> | AsyncIterator<unknown, unknown, unknown>
>(
	obj: O,
	hint: "async",
	method: (this: O) => I,
): IteratorRecord<
	I extends Iterator<
		infer T | PromiseLike<infer T>,
		infer TReturn | PromiseLike<infer TReturn>,
		infer TNext
	>
		? AsyncIterator<T, TReturn, TNext>
		: I
>;

export namespace promiseThenChain {
	type ExecutorCallbackFunction<T, TReturn> = (value: T) => TReturn | PromiseLike<TReturn>;
	interface ExecutorCallbackInterface<T, TReturn, TCatch> {
		onFulfilled?(value: T): TReturn | PromiseLike<TReturn>;
		onRejected?(reason: any): TCatch | PromiseLike<TCatch>;
	}

	type ExecutorCallback<T = any, TReturn = any, TCatch = any> =
		| ExecutorCallbackFunction<T, TReturn>
		| ExecutorCallbackInterface<T, TReturn, TCatch>;
}

export function promiseThenChain<T>(executor?: () => T | PromiseLike<T>): Promise<T>;
export function promiseThenChain<T, T1R = T, T1C = never>(
	executor: () => T | PromiseLike<T>,
	then1: promiseThenChain.ExecutorCallback<T, T1R, T1C>,
): Promise<T1R | T1C>;
export function promiseThenChain<T, T1R = T, T1C = never, T2R = T1R | T1C, T2C = never>(
	executor: () => T | PromiseLike<T>,
	then1: promiseThenChain.ExecutorCallback<T, T1R, T1C>,
	then2: promiseThenChain.ExecutorCallback<T1R | T1C, T2R, T2C>,
): Promise<T2R | T2C>;
export function promiseThenChain<T, T1R = T, T1C = never, T2R = T1R | T1C, T2C = never, T3R = T2R | T2C, T3C = never>(
	executor: () => T | PromiseLike<T>,
	then1: promiseThenChain.ExecutorCallback<T, T1R, T1C>,
	then2: promiseThenChain.ExecutorCallback<T1R | T1C, T2R, T2C>,
	then3: promiseThenChain.ExecutorCallback<T1R | T1C, T2R, T2C>,
): Promise<T3R | T3C>;
export function promiseThenChain(executor: () => any, ...thens: promiseThenChain.ExecutorCallback[]): Promise<any>;

export function AsyncIteratorClose<T>(
	iteratorRecord: IteratorRecord<Iterator<any, any, any>> | IteratorRecord<AsyncIterator<any, any, any>>,
	completion: () => T | PromiseLike<T>,
): Promise<T>;
