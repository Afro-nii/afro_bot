"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitchTokenDetails = void 0;
var class_validator_1 = require("class-validator");
var TwitchTokenDetails = /** @class */ (function () {
    function TwitchTokenDetails(access_token, refresh_token, expires_in_secs, scope, token_type) {
        this.access_token = access_token;
        this.refresh_token = refresh_token;
        this.expires_in_secs = expires_in_secs;
        this.scope = scope;
        this.token_type = token_type;
    }
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)()
    ], TwitchTokenDetails.prototype, "access_token", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)()
    ], TwitchTokenDetails.prototype, "refresh_token", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsNumber)()
    ], TwitchTokenDetails.prototype, "expires_in_secs", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsArray)()
    ], TwitchTokenDetails.prototype, "scope", void 0);
    __decorate([
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsString)()
    ], TwitchTokenDetails.prototype, "token_type", void 0);
    return TwitchTokenDetails;
}());
exports.TwitchTokenDetails = TwitchTokenDetails;
