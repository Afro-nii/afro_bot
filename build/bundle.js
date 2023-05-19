'use strict';

var __extends = (undefined && undefined.__extends) || (function () {
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
var InvalidTwitchConfigError = /** @class */ (function (_super) {
    __extends(InvalidTwitchConfigError, _super);
    function InvalidTwitchConfigError(errorMessage) {
        var _this = _super.call(this) || this;
        _this.name = 'InvalidTwitchConfigError';
        _this.message = errorMessage;
        return _this;
    }
    return InvalidTwitchConfigError;
}(Error));
var NoTwitchResponseError = /** @class */ (function (_super) {
    __extends(NoTwitchResponseError, _super);
    function NoTwitchResponseError(errorMessage) {
        var _this = _super.call(this) || this;
        _this.name = 'NoTwitchResponseError';
        _this.message = errorMessage;
        return _this;
    }
    return NoTwitchResponseError;
}(Error));
var InvalidTwitchResponseError = /** @class */ (function (_super) {
    __extends(InvalidTwitchResponseError, _super);
    function InvalidTwitchResponseError(errorMessage) {
        var _this = _super.call(this) || this;
        _this.name = 'InvalidTwitchResponseError';
        _this.message = errorMessage;
        return _this;
    }
    return InvalidTwitchResponseError;
}(Error));
var TwitchResponseError = /** @class */ (function (_super) {
    __extends(TwitchResponseError, _super);
    function TwitchResponseError(errorMessage) {
        var _this = _super.call(this) || this;
        _this.name = 'TwitchResponseError';
        _this.message = errorMessage;
        return _this;
    }
    return TwitchResponseError;
}(Error));
var MalformedTwitchRequestError = /** @class */ (function (_super) {
    __extends(MalformedTwitchRequestError, _super);
    function MalformedTwitchRequestError(errorMessage) {
        var _this = _super.call(this) || this;
        _this.name = 'MalformedTwitchRequestError';
        _this.message = errorMessage;
        return _this;
    }
    return MalformedTwitchRequestError;
}(Error));

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//import { IsNotEmpty, IsString } from "class-validator";
import { IsNotEmpty, IsString } from "class-validator";
//const { IsNotEmpty: IsNotEmpty$1, IsString: IsString$1 } = require("class-validator");
var ChatBotConfig = /** @class */ (function () {
    function ChatBotConfig(twitchTokenEndpoint, twitchUsername, twitchClientId, twitchClientSecret, twitchAuthorizationCode, twitchChannel) {
        this.twitchTokenEndpoint = twitchTokenEndpoint;
        this.twitchUser = twitchUsername;
        this.twitchClientSecret = twitchClientSecret;
        this.twitchChannel = twitchChannel;
        this.twitchClientId = twitchClientId;
        this.twitchAuthorizationCode = twitchAuthorizationCode;
    }
    __decorate$1([
        IsNotEmpty$1(),
        IsString$1()
    ], ChatBotConfig.prototype, "twitchTokenEndpoint", void 0);
    __decorate$1([
        IsNotEmpty$1(),
        IsString$1()
    ], ChatBotConfig.prototype, "twitchUser", void 0);
    __decorate$1([
        IsNotEmpty$1(),
        IsString$1()
    ], ChatBotConfig.prototype, "twitchClientId", void 0);
    __decorate$1([
        IsNotEmpty$1(),
        IsString$1()
    ], ChatBotConfig.prototype, "twitchClientSecret", void 0);
    __decorate$1([
        IsNotEmpty$1(),
        IsString$1()
    ], ChatBotConfig.prototype, "twitchAuthorizationCode", void 0);
    __decorate$1([
        IsNotEmpty$1(),
        IsString$1()
    ], ChatBotConfig.prototype, "twitchChannel", void 0);
    return ChatBotConfig;
}());

var __awaiter$2 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$2 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
//import { validate } from "class-validator";
const validate$1 = require('class-validator');
var ConfigValidator = /** @class */ (function () {
    function ConfigValidator() {
    }
    ConfigValidator.readConfig = function (configPath) {
        return __awaiter$2(this, void 0, void 0, function () {
            var configJson, completeConfig, completeConfigErrors, err_1;
            return __generator$2(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        configJson = JSON.parse(require('fs').readFileSync(configPath));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        console.info("Validating Config...");
                        completeConfig = new ChatBotConfig(configJson.twitch.token_endpoint, configJson.twitch.username, configJson.twitch.client_id, configJson.twitch.client_secret, configJson.twitch.authorization_code, configJson.twitch.channel);
                        return [4 /*yield*/, validate$1(completeConfig)];
                    case 2:
                        completeConfigErrors = _a.sent();
                        if (completeConfigErrors.length > 0)
                            throw new InvalidTwitchConfigError("The provided mothership config is not valid, here are the issues: ".concat(completeConfigErrors.join()));
                        console.info("Config is valid.");
                        return [2 /*return*/, completeConfig];
                    case 3:
                        err_1 = _a.sent();
                        if (err_1 instanceof InvalidTwitchConfigError)
                            console.log(err_1.message);
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ConfigValidator;
}());

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
const { IsArray, IsNotEmpty, IsNumber, IsString } = require('class-validator');
var TwitchTokenDetails = /** @class */ (function () {
    function TwitchTokenDetails(access_token, refresh_token, expires_in_secs, scope, token_type) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.expires_in_secs = expires_in_secs;
        this.scope = scope;
        this.token_type = token_type;
    }
    __decorate([
        IsNotEmpty(),
        IsString()
    ], TwitchTokenDetails.prototype, "access_token", void 0);
    __decorate([
        IsNotEmpty(),
        IsString()
    ], TwitchTokenDetails.prototype, "refresh_token", void 0);
    __decorate([
        IsNotEmpty(),
        IsNumber()
    ], TwitchTokenDetails.prototype, "expires_in_secs", void 0);
    __decorate([
        IsNotEmpty(),
        IsArray()
    ], TwitchTokenDetails.prototype, "scope", void 0);
    __decorate([
        IsNotEmpty(),
        IsString()
    ], TwitchTokenDetails.prototype, "token_type", void 0);
    return TwitchTokenDetails;
}());

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator$1 = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
//import { validate } from "class-validator";
const validate = require('class-validator');
var TwitchTokenResponseValidator = /** @class */ (function () {
    function TwitchTokenResponseValidator() {
    }
    TwitchTokenResponseValidator.parseResponse = function (responseBody) {
        return __awaiter$1(this, void 0, void 0, function () {
            var tokenResponse, tokenDetails, completeConfigErrors, err_1;
            return __generator$1(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tokenResponse = JSON.parse(JSON.stringify(responseBody));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        console.info("Validating Twitch Response");
                        tokenDetails = new TwitchTokenDetails(tokenResponse.access_token, tokenResponse.refresh_token, tokenResponse.expires_in, tokenResponse.scope, tokenResponse.token_type);
                        return [4 /*yield*/, validate(tokenDetails)];
                    case 2:
                        completeConfigErrors = _a.sent();
                        if (completeConfigErrors.length > 0)
                            throw new InvalidTwitchResponseError("The answer from twitch token endpoint is not valid, \n                here are the issues: ".concat(completeConfigErrors.join()));
                        console.info("Twitch Response is valid.");
                        return [2 /*return*/, tokenDetails];
                    case 3:
                        err_1 = _a.sent();
                        if (err_1 instanceof InvalidTwitchResponseError)
                            console.log(err_1.message);
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return TwitchTokenResponseValidator;
}());

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
//import * as BrowserFS from 'browserfs';
//import { configure } from '/browserfs/dist/node/index';
const fs = BrowserFS.BFSRequire('fs');
var messageCounterMooki = 0;
var TwitchChatBot = /** @class */ (function () {
    function TwitchChatBot(config) {
        this.config = config;
        //axios = require('axios');
        this.tmi = require('tmi.js');
        this.fs = require('fs');
        this.mysql = require('mysql2/promise');
        this.path = require('path');
        this.ArrayList = require('arraylist');
        this.list = [];
        this.QuotesArray = [];
        this.fetch = require('node-fetch');
        this.pool = this.mysql.createPool({
            host: 'localhost',
            user: 'myuser',
            password: 'mypassword',
            database: 'mydatabase'
        });
        this.loadList();
    }
    TwitchChatBot.prototype.loadList = function () {
        var fileName = 'QuoteList.js';
        var fileContents = fs.readFileSync(fileName, 'utf-8');
        var list = fileContents.split('\n');
        this.QuotesArray = list;
    };
    TwitchChatBot.prototype.launch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.fetchAccessToken()];
                    case 1:
                        _a.tokenDetails = _b.sent();
                        this.tokenDetails.access_token;
                        this.twitchClient = new this.tmi.Client(this.buildConnectionConfig(this.config.twitchChannel, this.config.twitchUser, this.tokenDetails.access_token));
                        this.setupBotBehavior();
                        this.twitchClient.connect();
                        return [2 /*return*/];
                }
            });
        });
    };
    TwitchChatBot.prototype.fetchAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var axios;
            return __generator(this, function (_a) {
                axios = require('axios');
                // this.refreshTokenIfNeeded();
                console.log("Fetching Twitch OAuth Token");
                return [2 /*return*/, axios({
                        method: 'post',
                        url: this.config.twitchTokenEndpoint,
                        params: {
                            client_id: this.config.twitchClientId,
                            client_secret: this.config.twitchClientSecret,
                            code: this.config.twitchAuthorizationCode,
                            //code: accessToken,
                            grant_type: 'authorization_code',
                            redirect_uri: 'http://localhost',
                        },
                        responseType: 'json'
                    }).then(function (response) {
                        return __awaiter(this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, TwitchTokenResponseValidator.parseResponse(response.data)];
                                    case 1: 
                                    // handle success
                                    return [2 /*return*/, _a.sent()];
                                }
                            });
                        });
                    }).catch(function (error) {
                        console.log("Failed to get Twitch OAuth Token");
                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            throw new TwitchResponseError(error.response.data);
                        }
                        else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js
                            throw new NoTwitchResponseError(error.request);
                        }
                        else {
                            // Something happened in setting up the request that triggered an Error
                            throw new MalformedTwitchRequestError(error.request);
                        }
                    })];
            });
        });
    };
    /*private refreshTokenIfNeeded() {
        const axios = require('axios');
       axios.post('https://id.twitch.tv/oauth2/token', null, {
        params: {    grant_type: 'refresh_token',
            refresh_token: "n7rn1b62quvmom2x2vknqw1usx8qh5q9ra54ogt4fo41tk0si8",
            client_id: this.config.twitchClientId,
            client_secret: this.config.twitchClientSecret,  }}).
                then(response => {
                accessToken = response.data.access_token;
                console.log("Accesstoken: ${accessToken}");})
                .catch(error => {  console.error(error);});
    
    //TODO if needed - twitch apparently only requires the token on login so it is good enough for now to just get a token on start-up.
        }*/
    TwitchChatBot.prototype.setupBotBehavior = function () {
        var _this = this;
        this.twitchClient.on('message', function (channel, tags, message, self) {
            if (self)
                return;
            var helloCommand = "!hello";
            var AfroSizeCommand = "!afroSize";
            if (message.startsWith('!ban')) {
                var copiedMessage_1 = message.slice(6);
                _this.twitchClient.say(channel, "WOT! ".concat(tags.username, "! just yeeted ") + copiedMessage_1 + " into the abyss foreva and eva");
            }
            if (message.startsWith('!despair'))
                _this.twitchClient.say(channel, 'Everything is going to be okay my little Pogchamp. Dont break yo little head over it, will you? <3 <3');
            if (channel === 'mukimooki') {
                messageCounterMooki++;
                if (messageCounterMooki === 30) {
                    _this.twitchClient.say(channel, 'QUASO');
                }
            }
            if (message.startsWith('!addDadjoke ') && tags.user === "afronii") {
                var copiedMessage = message.slice(12);
                console.log(copiedMessage);
                if (copiedMessage) {
                    _this.SaveJoke(copiedMessage);
                    _this.twitchClient.say(channel, copiedMessage + ' officially been added');
                }
            }
            //if(message === '!clip')
            //this.handleClipCommand(channel, authorizationCode, tags);
            if (message.startsWith('!so ')) {
                var copiedMessage_2 = message.slice(5);
                _this.twitchClient.say(channel, 'Go check out this lovely bean @' + copiedMessage_2 + ' at twitch.tv/' + copiedMessage_2);
            }
            if (message.startsWith('!join ') && channel === '#afronii') {
                var joinChannel = message.slice(6);
                _this.twitchClient.join(joinChannel);
                _this.twitchClient.say(channel, joinChannel + ' was added');
            }
            else if (message.startsWith('!leave ') && channel === '#afronii') {
                var leaveChannel = message.slice(7);
                _this.twitchClient.part(leaveChannel);
                _this.twitchClient.say(channel, leaveChannel + 'was added');
            }
            if (message.endsWith('Kappa')) {
                _this.twitchClient.say(channel, 'KappaRoss *');
            }
            if (message.startsWith('!dadjoke'))
                _this.giveDadjoke(channel);
            //! means a command is coming by, and we check if it matches the command we currently support
            if (message.startsWith('Right') || message.startsWith('right') || message.endsWith('right?'))
                _this.youRight(channel, tags);
            if (message === helloCommand)
                _this.sayHelloToUser(channel, tags);
            else if (message === AfroSizeCommand)
                _this.afroSize(channel, tags);
        });
    };
    TwitchChatBot.prototype.giveDadjoke = function (channel) {
        var Dadjoke = this.QuotesArray[Math.floor(Math.random() * this.QuotesArray.length)];
        this.twitchClient.say(channel, "" + Dadjoke + "");
    };
    TwitchChatBot.prototype.sayHelloToUser = function (channel, tags) {
        this.twitchClient.say(channel, "Hello, ".concat(tags.username, "! Welcome to the channel."));
    };
    TwitchChatBot.prototype.youRight = function (channel, tags) {
        this.twitchClient.say(channel, "The great me agrees, so you must be right!!! CoolCat ".concat(tags.username, " "));
    };
    TwitchChatBot.prototype.afroSize = function (channel, tags) {
        var Size = Math.floor(Math.random() * 100);
        this.twitchClient.say(channel, "AYO! ".concat(tags.username, " HAS A ") + Size + " METER IN DIAMETER AFRO PogChamp . So proud rn");
    };
    TwitchChatBot.prototype.SaveJoke = function (item) {
        this.QuotesArray.push(item);
        var listString = this.QuotesArray.join('\n');
        fs.writeFileSync('QuoteList.js', listString, 'utf-8');
    };
    TwitchChatBot.prototype.handleClipCommand = function (channel, accessToken, tags) {
        var _this = this;
        ({
            'Client-ID': this.config.twitchClientId,
        });
        this.createClip(channel, accessToken)
            .then(function (url) {
            _this.twitchClient.say(channel, "@".concat(tags.username, ", your clip has been created! Watch it here: ").concat(url));
        })
            .catch(function (error) {
            _this.twitchClient.say(channel, "@".concat(tags.username, ", there was an error creating your clip: ").concat(error));
        });
    };
    TwitchChatBot.prototype.fetchBroadcasterId = function (channelName, accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var url, headers, response, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "https://api.twitch.tv/helix/users?login=".concat(channelName);
                        headers = {
                            'Authorization': "Bearer ".concat(accessToken),
                            'Client-ID': this.config.twitchClientId,
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.fetch(url, { headers: headers })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        console.log(data);
                        if (typeof data !== 'undefined' && data.data.length > 0) {
                            return [2 /*return*/, data.data[0].id];
                        }
                        else {
                            throw new Error("Channel ".concat(channelName, " not found"));
                        }
                    case 4:
                        error_1 = _a.sent();
                        console.error("Error fetching broadcaster ID for channel ".concat(channelName, ": ").concat(error_1));
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TwitchChatBot.prototype.createClip = function (channelName, accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var broadcasterId, url, headers, body, response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.fetchBroadcasterId(channelName, accessToken)];
                    case 1:
                        broadcasterId = _a.sent();
                        url = "https://api.twitch.tv/helix/clips?broadcaster_id=".concat(broadcasterId);
                        headers = {
                            'Authorization': "Bearer ".concat(accessToken),
                            'Client-ID': '<your-client-id>',
                            'Content-Type': 'application/json'
                        };
                        body = {
                            'has_delay': false
                        };
                        return [4 /*yield*/, this.fetch(url, { method: 'Post', headers: headers, body: JSON.stringify(body) })];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        if (typeof data !== 'undefined' && data.data.length > 0) {
                            return [2 /*return*/, data.data[0].edit_url];
                        }
                        else {
                            throw new Error('Error creating clip');
                        }
                    case 4:
                        error_2 = _a.sent();
                        console.error("Error creating clip: ".concat(error_2));
                        throw error_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TwitchChatBot.prototype.buildConnectionConfig = function (channel, username, accessToken) {
        return {
            options: { debug: true },
            connection: {
                secure: true,
                reconnect: true
            },
            identity: {
                username: "".concat(username),
                password: "oauth:".concat(accessToken)
            },
            channels: ["".concat(channel), "".concat("BigBoiMoodyy"), "".concat("Lauroboros")]
        };
    };
    return TwitchChatBot;
}());

ConfigValidator.readConfig(('./config.json'))
    .then(function (config) { return new TwitchChatBot(config).launch(); });
