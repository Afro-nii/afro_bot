
import { ChatBotConfig } from './app/config/config.model';
import { ConfigValidator } from './app/config/config-validator';
import { TwitchChatBot } from './app/chatBot/chatbot';


ConfigValidator.readConfig(('./config.json'))
.then((config: ChatBotConfig) =>  new TwitchChatBot(config).launch());














