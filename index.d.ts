import { Iterator, AsyncIterator } from "./implementation";
export { Iterator, AsyncIterator };

export interface IteratorHelpers {
	readonly Iterator: typeof Iterator;
	readonly AsyncIterator: typeof AsyncIterator;
}

export const getPolyfill: typeof import("./polyfill");
export const implementation: typeof import("./implementation");
export const shim: typeof import("./shim");
