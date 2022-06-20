"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vconsole_1 = __importDefault(require("vconsole"));
// const vConsole = process.env.NODE_ENV === 'development' ? new VConsole() : ''
vConsole = new vconsole_1.default();
exports.default = vConsole;
