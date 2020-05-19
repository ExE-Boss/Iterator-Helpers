// TODO: Remove this once https://github.com/DefinitelyTyped/DefinitelyTyped/pull/44805 is merged
declare module "es-abstract/2018/AdvanceStringIndex.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.AdvanceStringIndex; }
declare module "es-abstract/2018/Call.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.Call; }
declare module "es-abstract/2018/CreateMethodProperty.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.CreateMethodProperty; }
declare module "es-abstract/2018/DefinePropertyOrThrow.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.DefinePropertyOrThrow; }
declare module "es-abstract/2018/GetMethod.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.GetMethod; }
declare module "es-abstract/2018/GetV.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.GetV; }
declare module "es-abstract/2018/IsArray.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.IsArray; }
declare module "es-abstract/2018/IsCallable.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.IsCallable; }
declare module "es-abstract/2018/IsConstructor.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.IsConstructor; }
declare module "es-abstract/2018/IsExtensible.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.IsExtensible; }
declare module "es-abstract/2018/IteratorClose.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.IteratorClose; }
declare module "es-abstract/2018/IteratorComplete.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.IteratorComplete; }
declare module "es-abstract/2018/IteratorValue.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.IteratorValue; }
declare module "es-abstract/2018/ObjectCreate.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.ObjectCreate; }
declare module "es-abstract/2018/OrdinaryHasInstance.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.OrdinaryHasInstance; }
declare module "es-abstract/2018/OrdinaryGetOwnProperty.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.OrdinaryGetOwnProperty; }
declare module "es-abstract/2018/ToBoolean.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.ToBoolean; }
declare module "es-abstract/2018/ToInteger.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.ToInteger; }
declare module "es-abstract/2018/Type.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.Type; }

declare module "es-abstract/helpers/OwnPropertyKeys.js" {
	function OwnPropertyKeys<T extends object>(target: T): Array<
		| Extract<keyof T, symbol>
		| (number extends keyof T ? string : Extract<keyof T, string>)
	>;
	export = OwnPropertyKeys;
}

declare module "has" {
	function hasOwnProperty<P extends PropertyKey>(target: {}, property: P): target is { [K in P]: any };
	export = hasOwnProperty;
}
