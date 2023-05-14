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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitchTokenResponseValidator = void 0;
const twitchTokenDetails_models_1 = require("./../models/twitchTokenDetails.models");
const class_validator_1 = require("class-validator");
const error_model_1 = require("../models/error.model");
class TwitchTokenResponseValidator {
    static parseResponse(responseBody) {
        return __awaiter(this, void 0, void 0, function* () {
            var tokenResponse = JSON.parse(JSON.stringify(responseBody));
            try {
                console.info("Validating Twitch Response");
                let tokenDetails = new twitchTokenDetails_models_1.TwitchTokenDetails(tokenResponse.access_token, tokenResponse.refresh_token, tokenResponse.expires_in, tokenResponse.scope, tokenResponse.token_type);
                let completeConfigErrors = yield (0, class_validator_1.validate)(tokenDetails);
                if (completeConfigErrors.length > 0)
                    throw new error_model_1.InvalidTwitchResponseError(`The answer from twitch token endpoint is not valid, 
                here are the issues: ${completeConfigErrors.join()}`);
                console.info("Twitch Response is valid.");
                return tokenDetails;
            }
            catch (err) {
                if (err instanceof error_model_1.InvalidTwitchResponseError)
                    console.log(err.message);
                throw err;
            }
        });
    }
}
exports.TwitchTokenResponseValidator = TwitchTokenResponseValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHdpdGNoVG9rZW5SZXNwb25zZVZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvdXRpbHMvVHdpdGNoVG9rZW5SZXNwb25zZVZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxRkFBMkU7QUFDM0UscURBQTJDO0FBQzNDLHVEQUFtRTtBQUNuRSxNQUFhLDRCQUE0QjtJQUU5QixNQUFNLENBQU8sYUFBYSxDQUFDLFlBQW9COztZQUNsRCxJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtZQUU1RCxJQUFJO2dCQUNBLE9BQU8sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtnQkFFMUMsSUFBSSxZQUFZLEdBQUcsSUFBSSw4Q0FBa0IsQ0FDckMsYUFBYSxDQUFDLFlBQVksRUFDMUIsYUFBYSxDQUFDLGFBQWEsRUFDM0IsYUFBYSxDQUFDLFVBQVUsRUFDeEIsYUFBYSxDQUFDLEtBQUssRUFDbkIsYUFBYSxDQUFDLFVBQVUsQ0FDM0IsQ0FBQztnQkFDRixJQUFJLG9CQUFvQixHQUFHLE1BQU0sSUFBQSwwQkFBUSxFQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUV4RCxJQUFJLG9CQUFvQixDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUMvQixNQUFNLElBQUksd0NBQTBCLENBQUM7dUNBQ2Qsb0JBQW9CLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBO2dCQUV6RCxPQUFPLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUE7Z0JBQ3pDLE9BQU8sWUFBWSxDQUFDO2FBRXZCO1lBQUMsT0FBTyxHQUFZLEVBQUU7Z0JBQ25CLElBQUksR0FBRyxZQUFZLHdDQUEwQjtvQkFDekMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQzVCLE1BQU0sR0FBRyxDQUFBO2FBQ1o7UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQTlCRCxvRUE4QkMifQ==