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
exports.ConfigValidator = void 0;
const error_model_1 = require("./../models/error.model");
const class_validator_1 = require("class-validator");
const config_model_1 = require("./config.model");
class ConfigValidator {
    static readConfig(configPath) {
        return __awaiter(this, void 0, void 0, function* () {
            var configJson = JSON.parse(require('fs').readFileSync(configPath));
            try {
                console.info("Validating Config...");
                let completeConfig = new config_model_1.ChatBotConfig(configJson.twitch.token_endpoint, configJson.twitch.username, configJson.twitch.client_id, configJson.twitch.client_secret, configJson.twitch.authorization_code, configJson.twitch.channel);
                let completeConfigErrors = yield (0, class_validator_1.validate)(completeConfig);
                if (completeConfigErrors.length > 0)
                    throw new error_model_1.InvalidTwitchConfigError(`The provided mothership config is not valid, here are the issues: ${completeConfigErrors.join()}`);
                console.info("Config is valid.");
                return completeConfig;
            }
            catch (err) {
                if (err instanceof error_model_1.InvalidTwitchConfigError)
                    console.log(err.message);
                throw err;
            }
        });
    }
}
exports.ConfigValidator = ConfigValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLXZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvY29uZmlnL2NvbmZpZy12YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseURBQW1FO0FBQ25FLHFEQUEyQztBQUMzQyxpREFBOEM7QUFHOUMsTUFBYSxlQUFlO0lBRWpCLE1BQU0sQ0FBTyxVQUFVLENBQUMsVUFBa0I7O1lBQzdDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO1lBRW5FLElBQUk7Z0JBQ0EsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO2dCQUVwQyxJQUFJLGNBQWMsR0FBRyxJQUFJLDRCQUFhLENBQ2xDLFVBQVUsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUNoQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFDMUIsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQzNCLFVBQVUsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUMvQixVQUFVLENBQUMsTUFBTSxDQUFDLGtCQUFrQixFQUNwQyxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FDNUIsQ0FBQTtnQkFDRCxJQUFJLG9CQUFvQixHQUFHLE1BQU0sSUFBQSwwQkFBUSxFQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUUxRCxJQUFJLG9CQUFvQixDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUMvQixNQUFNLElBQUksc0NBQXdCLENBQUMscUVBQXFFLG9CQUFvQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtnQkFFMUksT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO2dCQUNoQyxPQUFPLGNBQWMsQ0FBQzthQUV6QjtZQUFDLE9BQU8sR0FBWSxFQUFFO2dCQUNuQixJQUFJLEdBQUcsWUFBWSxzQ0FBd0I7b0JBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUM1QixNQUFNLEdBQUcsQ0FBQTthQUVaO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUEvQkQsMENBK0JDIn0=