import { Iterator as $Iterator, AsyncIterator as $AsyncIterator } from "./implementation";

type $IteratorConstructor = typeof $Iterator;
type $AsyncIteratorConstructor = typeof $AsyncIterator;

declare global {
	interface IteratorConstructor extends $IteratorConstructor {}
	interface AsyncIteratorConstructor extends $AsyncIteratorConstructor {}

	var Iterator: IteratorConstructor;
	var AsyncIterator: AsyncIteratorConstructor;
}
