var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsNotEmpty, IsString } from "class-validator";
//const { IsNotEmpty, IsString } = require("class-validator");
var ChatBotConfig = /** @class */ (function () {
    function ChatBotConfig(twitchTokenEndpoint, twitchUsername, twitchClientId, twitchClientSecret, twitchAuthorizationCode, twitchChannel) {
        this.twitchTokenEndpoint = twitchTokenEndpoint;
        this.twitchUser = twitchUsername;
        this.twitchClientSecret = twitchClientSecret;
        this.twitchChannel = twitchChannel;
        this.twitchClientId = twitchClientId;
        this.twitchAuthorizationCode = twitchAuthorizationCode;
    }
    __decorate([
        IsNotEmpty(),
        IsString()
    ], ChatBotConfig.prototype, "twitchTokenEndpoint", void 0);
    __decorate([
        IsNotEmpty(),
        IsString()
    ], ChatBotConfig.prototype, "twitchUser", void 0);
    __decorate([
        IsNotEmpty(),
        IsString()
    ], ChatBotConfig.prototype, "twitchClientId", void 0);
    __decorate([
        IsNotEmpty(),
        IsString()
    ], ChatBotConfig.prototype, "twitchClientSecret", void 0);
    __decorate([
        IsNotEmpty(),
        IsString()
    ], ChatBotConfig.prototype, "twitchAuthorizationCode", void 0);
    __decorate([
        IsNotEmpty(),
        IsString()
    ], ChatBotConfig.prototype, "twitchChannel", void 0);
    return ChatBotConfig;
}());
export { ChatBotConfig };
