
import { ChatBotConfig } from './src/app/config/config.model.ts';
import { ConfigValidator } from './src/app/config/config-validator.ts';
import { TwitchChatBot } from './src/app/chatBot/chatbot';


ConfigValidator.readConfig(('./config.json'))
.then((config: ChatBotConfig) =>  new TwitchChatBot(config).launch());














