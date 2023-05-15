fetch('./dist/src/app/config/1config-validator.js')
  .then(response => response.text())
  .then(text => eval(text))
  .then(ConfigValidator => {
    return fetch('./dist/src/app/chatBot/chatbot.js')
      .then(response => response.text())
      .then(text => {
        eval(text);
        return ConfigValidator.readConfig('./config.json')
          .then(config => new TwitchChatBot(config).launch());
      });
  });
  /*import { ChatBotConfig } from './src/app/config/config.model';
  import { ConfigValidator } from './src/app/config/config-validator';
  import { TwitchChatBot } from './src/app/chatBot/chatbot';
  
  ConfigValidator.readConfig('./config.json')
    .then((config) => new TwitchChatBot(config).launch())*/

/*
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_validator_1 = require("./dist/src/app/config/config-validator");
const chatbot_1 = require("./dist/src/app/chatBot/chatbot");
config_validator_1.ConfigValidator.readConfig(('./config.json'))
    .then((config) => new chatbot_1.TwitchChatBot(config).launch());*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsd0VBQW9FO0FBQ3BFLHVEQUEwRDtBQUcxRCxrQ0FBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQzVDLElBQUksQ0FBQyxDQUFDLE1BQXFCLEVBQUUsRUFBRSxDQUFFLElBQUksdUJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDIn0=