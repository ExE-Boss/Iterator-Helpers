export abstract class Iterator<T, TReturn = any, TNext = undefined> implements globalThis.Iterator<T, TReturn, TNext> {
	static from<T>(O: Iterable<T>): Iterator<T>;
	static from<T, TReturn = any, TNext = undefined>(
		O: globalThis.Iterator<T, TReturn, TNext>
	): Iterator<T, TReturn, TNext>;

	// NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
	abstract next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
	return?(value: TReturn): IteratorResult<T, TReturn>;
	throw?(e: any): IteratorResult<T, TReturn>;

	map<U>(mapper: (value: T) => U): Iterator<U, undefined, TNext>;

	filter<S extends T>(filterer: (value: T) => value is S): Iterator<S, undefined, TNext>;
	filter(filterer: (value: T) => unknown): Iterator<T, undefined, TNext>;

	take(limit: number): Iterator<T, undefined, TNext>;
	drop(limit: number): Iterator<T, undefined, TNext>;
	asIndexedPairs(): Iterator<[number, T], undefined, TNext>;

	flatMap<U>(mapper: (value: T) => Iterable<U>): Iterator<U, undefined, unknown>;

	reduce(reducer: (accumulator: T, value: T) => T): T;
	reduce(reducer: (accumulator: T, value: T) => T, initialValue: T): T;
	reduce<U>(reducer: (accumulator: U, value: T) => U, initialValue: U): U;

	toArray(): T[];
	forEach(fn: (value: T) => void): void;

	some(fn: (value: T) => unknown): boolean;
	every(fn: (value: T) => unknown): boolean;

	find<S extends T>(fn: (value: T) => value is S): S | undefined;
	find(fn: (value: T) => unknown): T | undefined;

	readonly [Symbol.toStringTag]: "Iterator";
	[Symbol.iterator](): this;
}

export abstract class AsyncIterator<T, TReturn = any, TNext = undefined>
	implements globalThis.AsyncIterator<T, TReturn, TNext> {
	static from<T>(O: Iterable<T> | AsyncIterable<T>): AsyncIterator<T>;
	static from<T, TReturn = any, TNext = undefined>(
		O: globalThis.Iterator<T, TReturn, TNext> | globalThis.AsyncIterator<T, TReturn, TNext>
	): AsyncIterator<T, TReturn, TNext>;

	abstract next(...args: [] | [TNext]): Promise<IteratorResult<T, TReturn>>;
	return?(value: TReturn): Promise<IteratorResult<T, TReturn>>;
	throw?(e: any): Promise<IteratorResult<T, TReturn>>;

	map<U>(mapper: (value: T) => U | PromiseLike<U>): AsyncIterator<U, undefined, TNext>;

	filter<S extends T>(filterer: (value: T) => value is S): AsyncIterator<S, undefined, TNext>;
	filter(filterer: (value: T) => unknown | PromiseLike<unknown>): AsyncIterator<T, undefined, TNext>;

	take(limit: number): AsyncIterator<T, undefined, TNext>;
	drop(limit: number): AsyncIterator<T, undefined, TNext>;
	asIndexedPairs(): AsyncIterator<[number, T], undefined, TNext>;

	flatMap<U>(mapper: (value: T) => AsyncIterable<U>): AsyncIterator<U, undefined, unknown>;

	reduce(reducer: (accumulator: T, value: T) => T | PromiseLike<T>): Promise<T>;
	reduce(reducer: (accumulator: T, value: T) => T | PromiseLike<T>, initialValue: T): Promise<T>;
	reduce<U>(reducer: (accumulator: U, value: T) => U | PromiseLike<U>, initialValue: U): Promise<U>;

	toArray(): Promise<T[]>;
	forEach(fn: (value: T) => void | PromiseLike<void>): Promise<void>;

	some(fn: (value: T) => unknown | PromiseLike<unknown>): Promise<boolean>;
	every(fn: (value: T) => unknown | PromiseLike<unknown>): Promise<boolean>;

	find<S extends T>(fn: (value: T) => value is S): Promise<S | undefined>;
	find(fn: (value: T) => unknown | PromiseLike<unknown>): Promise<T | undefined>;

	readonly [Symbol.toStringTag]: "Async Iterator";
	[Symbol.asyncIterator](): this;
}
