"use strict";
var __createBinding =
	(this && this.__createBinding) ||
	(Object.create
		? function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				var desc = Object.getOwnPropertyDescriptor(m, k);
				if (
					!desc ||
					("get" in desc ? !m.__esModule : desc.writable || desc.configurable)
				) {
					desc = {
						enumerable: true,
						get: function () {
							return m[k];
						},
					};
				}
				Object.defineProperty(o, k2, desc);
		  }
		: function (o, m, k, k2) {
				if (k2 === undefined) k2 = k;
				o[k2] = m[k];
		  });
var __setModuleDefault =
	(this && this.__setModuleDefault) ||
	(Object.create
		? function (o, v) {
				Object.defineProperty(o, "default", { enumerable: true, value: v });
		  }
		: function (o, v) {
				o["default"] = v;
		  });
var __importStar =
	(this && this.__importStar) ||
	function (mod) {
		if (mod && mod.__esModule) return mod;
		var result = {};
		if (mod != null)
			for (var k in mod)
				if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
					__createBinding(result, mod, k);
		__setModuleDefault(result, mod);
		return result;
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = __importDefault(require("./Base"));
const JSON5 = __importStar(require("json5"));
class JSON5Driver extends Base_1.default {
	spaces;
	constructor(path, name, spaces = 2) {
		super(path, name, ".json5");
		this.spaces = spaces;
		Base_1.default.write(this.path, JSON5.stringify({}), "utf8");
		this.read();
	}
	clone(path) {
		return super.clone(path, JSON5.stringify(this.json(), null, this.spaces));
	}
	save() {
		return super.save(JSON5.stringify(this.json(), null, this.spaces), "utf8");
	}
	read() {
		return super.read(JSON5.parse, "utf8");
	}
}
exports.default = JSON5Driver;
//# sourceMappingURL=JSON5.js.map