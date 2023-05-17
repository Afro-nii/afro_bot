"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_validator_1 = require("./app/config/config-validator");
var chatbot_1 = require("./app/chatBot/chatbot");
config_validator_1.ConfigValidator.readConfig(('./config.json'))
    .then(function (config) { return new chatbot_1.TwitchChatBot(config).launch(); });
