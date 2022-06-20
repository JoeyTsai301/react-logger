"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLogger = exports.getDynamicImportVConsole = void 0;
var winston_1 = require("winston");
var debugTransport_1 = __importDefault(require("./debugTransport"));
require("setimmediate");
var split_1 = __importDefault(require("split"));
var appName = "";
var getDynamicImportVConsole = function (dynamic) {
    return dynamic(function () { return Promise.resolve().then(function () { return __importStar(require("./vconsole")); }); }, { ssr: false, });
};
exports.getDynamicImportVConsole = getDynamicImportVConsole;
var createLogger = function (moduleName) {
    var logger = (0, winston_1.createLogger)({
        level: "debug",
        format: winston_1.format.combine(winston_1.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss"
        }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
        defaultMeta: { service: appName, label: moduleName },
    });
    if (process.env.NODE_ENV !== 'production') {
        logger.add(new debugTransport_1.default({}));
        logger.add(new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.label({
                label: moduleName
            }), winston_1.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }), winston_1.format.printf(function (info) { return "".concat([info.timestamp], " [").concat(info.level, "] ").concat(info.label, "  \"").concat(JSON.stringify(info.message), "\""); }))
        }));
    }
    logger.stream = (0, split_1.default)().on('data', function (message) {
        logger.info(message);
    });
    return logger;
};
exports.createLogger = createLogger;
