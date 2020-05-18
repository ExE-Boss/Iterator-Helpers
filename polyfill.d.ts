import { Iterator, AsyncIterator } from "./implementation.js";

declare function getPolyfill(): {
	readonly Iterator: typeof Iterator;
	readonly AsyncIterator: typeof AsyncIterator;
};
export = getPolyfill;
