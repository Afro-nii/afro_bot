import { ConfigValidator } from './app/config/config-validator';
import { TwitchChatBot } from './app/chatBot/chatbot';
ConfigValidator.readConfig(('./config.json'))
    .then(function (config) { return new TwitchChatBot(config).launch(); });
