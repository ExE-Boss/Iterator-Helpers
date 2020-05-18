// TODO: Remove this once https://github.com/DefinitelyTyped/DefinitelyTyped/pull/44805 is merged
declare module "es-abstract/2018/AdvanceStringIndex.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.AdvanceStringIndex; }
declare module "es-abstract/2018/Call.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.Call; }
declare module "es-abstract/2018/CreateMethodProperty.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.CreateMethodProperty; }
declare module "es-abstract/2018/FromPropertyDescriptor.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.FromPropertyDescriptor; }
declare module "es-abstract/2018/GetMethod.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.GetMethod; }
declare module "es-abstract/2018/GetV.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.GetV; }
declare module "es-abstract/2018/Invoke.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.Invoke; }
declare module "es-abstract/2018/IsArray.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.IsArray; }
declare module "es-abstract/2018/IsCallable.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.IsCallable; }
declare module "es-abstract/2018/IsDataDescriptor.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.IsDataDescriptor; }
declare module "es-abstract/2018/IteratorClose.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.IteratorClose; }
declare module "es-abstract/2018/IteratorComplete.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.IteratorComplete; }
declare module "es-abstract/2018/IteratorValue.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.IteratorValue; }
declare module "es-abstract/2018/ObjectCreate.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.ObjectCreate; }
declare module "es-abstract/2018/OrdinaryHasInstance.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.OrdinaryHasInstance; }
declare module "es-abstract/2018/SameValue.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.SameValue; }
declare module "es-abstract/2018/ToBoolean.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.ToBoolean; }
declare module "es-abstract/2018/ToInteger.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.ToInteger; }
declare module "es-abstract/2018/Type.js" { import ES2018 = require("es-abstract/es2018.js"); export = ES2018.Type; }

declare module "es-abstract/helpers/DefineOwnProperty.js" {
	import { PropertyDescriptor as ESPropertyDescriptor, PropertyKey as ESPropertyKey } from "es-abstract";

	function DefineOwnProperty(
		IsDataDescriptor: (Desc: ESPropertyDescriptor) => boolean,
		SameValue: (x: any, y: any) => boolean,
		FromPropertyDescriptor: (Desc: ESPropertyDescriptor) => PropertyDescriptor,
		O: object,
		P: ESPropertyKey,
		desc: ESPropertyDescriptor,
	): boolean;

	export = DefineOwnProperty;
}
