import { Iterator, AsyncIterator } from "./implementation.js";
export { Iterator, AsyncIterator };

export interface IteratorHelpers {
	readonly Iterator: typeof Iterator;
	readonly AsyncIterator: typeof AsyncIterator;
}

export const getPolyfill: typeof import("./polyfill.js");
export const implementation: typeof import("./implementation.js");
export const shim: typeof import("./shim.js");
