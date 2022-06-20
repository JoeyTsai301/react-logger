"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_transport_1 = __importDefault(require("winston-transport"));
var debug_1 = __importDefault(require("debug"));
var DebugTransport = /** @class */ (function (_super) {
    __extends(DebugTransport, _super);
    function DebugTransport(opts) {
        var _this = _super.call(this, opts) || this;
        debug_1.default.enable("*");
        return _this;
    }
    DebugTransport.prototype.log = function (info, callback) {
        setImmediate(function () {
            (0, debug_1.default)("".concat(info.service, ":").concat(info.label))(info.message);
        });
        callback();
    };
    return DebugTransport;
}(winston_transport_1.default));
;
exports.default = DebugTransport;
