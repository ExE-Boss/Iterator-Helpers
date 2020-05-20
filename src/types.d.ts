// TODO: Remove this once https://github.com/DefinitelyTyped/DefinitelyTyped/pull/44805 is merged
declare module "es-abstract/2018/AdvanceStringIndex.js" { import { AdvanceStringIndex } from "es-abstract/es2018.js"; export = AdvanceStringIndex; }
declare module "es-abstract/2018/Call.js" { import { Call } from "es-abstract/es2018.js"; export = Call; }
declare module "es-abstract/2018/CreateMethodProperty.js" { import { CreateMethodProperty } from "es-abstract/es2018.js"; export = CreateMethodProperty; }
declare module "es-abstract/2018/DefinePropertyOrThrow.js" { import { DefinePropertyOrThrow } from "es-abstract/es2018.js"; export = DefinePropertyOrThrow; }
declare module "es-abstract/2018/GetMethod.js" { import { GetMethod } from "es-abstract/es2018.js"; export = GetMethod; }
declare module "es-abstract/2018/GetPrototypeFromConstructor.js" { import { GetPrototypeFromConstructor } from "es-abstract/es2018.js"; export = GetPrototypeFromConstructor; }
declare module "es-abstract/2018/GetV.js" { import { GetV } from "es-abstract/es2018.js"; export = GetV; }
declare module "es-abstract/2018/IsArray.js" { import { IsArray } from "es-abstract/es2018.js"; export = IsArray; }
declare module "es-abstract/2018/IsCallable.js" { import { IsCallable } from "es-abstract/es2018.js"; export = IsCallable; }
declare module "es-abstract/2018/IsConstructor.js" { import { IsConstructor } from "es-abstract/es2018.js"; export = IsConstructor; }
declare module "es-abstract/2018/IsExtensible.js" { import { IsExtensible } from "es-abstract/es2018.js"; export = IsExtensible; }
declare module "es-abstract/2018/IteratorClose.js" { import { IteratorClose } from "es-abstract/es2018.js"; export = IteratorClose; }
declare module "es-abstract/2018/IteratorComplete.js" { import { IteratorComplete } from "es-abstract/es2018.js"; export = IteratorComplete; }
declare module "es-abstract/2018/IteratorValue.js" { import { IteratorValue } from "es-abstract/es2018.js"; export = IteratorValue; }
declare module "es-abstract/2018/ObjectCreate.js" { import { ObjectCreate } from "es-abstract/es2018.js"; export = ObjectCreate; }
declare module "es-abstract/2018/OrdinaryHasInstance.js" { import { OrdinaryHasInstance } from "es-abstract/es2018.js"; export = OrdinaryHasInstance; }
declare module "es-abstract/2018/OrdinaryGetOwnProperty.js" { import { OrdinaryGetOwnProperty } from "es-abstract/es2018.js"; export = OrdinaryGetOwnProperty; }
declare module "es-abstract/2018/ToBoolean.js" { import { ToBoolean } from "es-abstract/es2018.js"; export = ToBoolean; }
declare module "es-abstract/2018/ToInteger.js" { import { ToInteger } from "es-abstract/es2018.js"; export = ToInteger; }
declare module "es-abstract/2018/Type.js" { import { Type } from "es-abstract/es2018.js"; export = Type; }

declare module "es-abstract/helpers/OwnPropertyKeys.js" {
	function OwnPropertyKeys<T extends object>(target: T): Array<
		| Extract<keyof T, symbol>
		| (number extends keyof T ? string : Extract<keyof T, string>)
	>;
	export = OwnPropertyKeys;
}

declare module "has-symbols" {
	function hasSymbols(): boolean;
	export = hasSymbols;
}
