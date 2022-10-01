#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var clear_1 = __importDefault(require("clear"));
var crypto_1 = require("crypto");
var figlet_1 = __importDefault(require("figlet"));
var jszip_1 = __importDefault(require("jszip"));
var fs = require("fs");
var program = require("commander");
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var options, sourcePath, pmEnvironments;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, clear_1.default)();
                    console.log(chalk_1.default.blue(figlet_1.default.textSync("hoppscotch-transform", { horizontalLayout: "full" }), "by iDschepe"));
                    program
                        .version("1.0.0")
                        .description("Transform other files to hoppscotch.io importable files.")
                        .option("-p, --postman <file>", "postman environment zip-file")
                        .option("-f, --format", "format output file structured")
                        .parse(process.argv);
                    options = program.opts();
                    if (!process.argv.slice(2).length) {
                        program.outputHelp();
                        return [2 /*return*/];
                    }
                    sourcePath = options.postman;
                    console.log(chalk_1.default.yellow("Postman Environment zip: ".concat(sourcePath)));
                    pmEnvironments = [];
                    return [4 /*yield*/, fs.readFile(sourcePath, function (err, data) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (err)
                                            throw err;
                                        return [4 /*yield*/, jszip_1.default.loadAsync(data).then(function (zip) { return __awaiter(_this, void 0, void 0, function () {
                                                var fileKeys, _i, fileKeys_1, key, content;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            fileKeys = Object.keys(zip.files);
                                                            _i = 0, fileKeys_1 = fileKeys;
                                                            _a.label = 1;
                                                        case 1:
                                                            if (!(_i < fileKeys_1.length)) return [3 /*break*/, 4];
                                                            key = fileKeys_1[_i];
                                                            if (!(zip.files[key].name.indexOf("archive.json") < 0)) return [3 /*break*/, 3];
                                                            return [4 /*yield*/, zip.files[key].async("string")];
                                                        case 2:
                                                            content = _a.sent();
                                                            pmEnvironments.push(JSON.parse(content));
                                                            console.log("Preview: ".concat(zip.files[key].name, " | ").concat(content.substring(0, 20), "..."));
                                                            _a.label = 3;
                                                        case 3:
                                                            _i++;
                                                            return [3 /*break*/, 1];
                                                        case 4: return [2 /*return*/];
                                                    }
                                                });
                                            }); })];
                                    case 1:
                                        _a.sent();
                                        console.log(chalk_1.default.yellow("Processed environments: ".concat(pmEnvironments.length)));
                                        return [4 /*yield*/, prepare(pmEnvironments, options)];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function prepare(pmEnvironments, options) {
    return __awaiter(this, void 0, void 0, function () {
        var importable, _loop_1, _i, pmEnvironments_1, env, resultFileName, resultContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    importable = [];
                    _loop_1 = function (env) {
                        importable.push({
                            name: env.name,
                            variables: env.values.map(function (entry) {
                                var _a;
                                return {
                                    key: entry.key,
                                    value: (_a = entry.value) === null || _a === void 0 ? void 0 : _a.replace("{{".concat(env.name, "_"), "<<").replace("}}", ">>"),
                                };
                            }),
                        });
                    };
                    for (_i = 0, pmEnvironments_1 = pmEnvironments; _i < pmEnvironments_1.length; _i++) {
                        env = pmEnvironments_1[_i];
                        _loop_1(env);
                    }
                    resultFileName = "".concat((0, crypto_1.randomUUID)(), ".hoppscotch.json");
                    if (options.format) {
                        resultContent = JSON.stringify(importable, null, 4);
                    }
                    else {
                        resultContent = JSON.stringify(importable);
                    }
                    return [4 /*yield*/, fs.writeFile(resultFileName, resultContent, function (err) {
                            if (err)
                                throw err;
                            console.log(chalk_1.default.greenBright("Successfully created ./".concat(resultFileName)));
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
run();
