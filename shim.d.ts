import getPolyfill = require("./polyfill.js");

declare function shimIteratorHelpers(): ReturnType<typeof getPolyfill>;
export = shimIteratorHelpers;
