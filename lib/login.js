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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = void 0;
const core = __importStar(require("@actions/core"));
const exec = __importStar(require("@actions/exec"));
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!email || !password) {
            throw new Error('Email and password required');
        }
        const args = ['login', '--password-stdin', '--username', email];
        core.info(`Logging in`);
        const res = yield exec.getExecOutput('localstack', args, {
            ignoreReturnCode: true,
            silent: true,
            input: Buffer.from(password)
        });
        if (res.stderr.length > 0 && res.exitCode !== 0) {
            throw new Error(res.stderr.trim());
        }
        core.info(`Login Succeeded!`);
    });
}
exports.login = login;
function logout() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield exec.getExecOutput('localstack', ['logout'], {
            ignoreReturnCode: true
        });
        if (res.stderr.length > 0 && res.exitCode !== 0) {
            core.warning(res.stderr.trim());
        }
    });
}
exports.logout = logout;
