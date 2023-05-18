define(["require", "exports", "./app/config/config-validator", "./app/chatBot/chatbot"], function (require, exports, config_validator_1, chatbot_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    config_validator_1.ConfigValidator.readConfig(('./config.json'))
        .then(function (config) { return new chatbot_1.TwitchChatBot(config).launch(); });
});
