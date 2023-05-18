import { ConfigValidator } from 'app/config/config-validator.js';
import { TwitchChatBot } from 'app/chatBot/chatbot.js';
ConfigValidator.readConfig(('config.json'))
    .then(function (config) { return new TwitchChatBot(config).launch(); });
