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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitchChatBot = void 0;
const TwitchTokenResponseValidator_1 = require("./../utils/TwitchTokenResponseValidator");
const error_model_1 = require("../models/error.model");
const fs_1 = __importDefault(require("fs"));
let authorizationCode;
let messageCounterMooki = 0;
let refreshToken;
let accessToken;
class TwitchChatBot {
    constructor(config) {
        this.config = config;
        //axios = require('axios');
        this.tmi = require('tmi.js');
        this.fs = require('fs');
        this.path = require('path');
        this.ArrayList = require('arraylist');
        this.list = [];
        this.QuotesArray = [];
        this.fetch = require('node-fetch');
        this.mysql = require('mysql');
        this.connection = this.mysql.createConnection({
            host: 'sql205.epizy.com',
            user: 'epiz_34199892',
            password: 'Afro@nii12',
            database: 'epiz_34199892_Afro_Bot_Database'
        });
        this.loadList();
        refreshToken = "n7rn1b62quvmom2x2vknqw1usx8qh5q9ra54ogt4fo41tk0si8";
    }
    loadList() {
        const fileName = 'QuoteList.js';
        const fileContents = fs_1.default.readFileSync(fileName, 'utf-8');
        const list = fileContents.split('\n');
        this.QuotesArray = list;
    }
    launch() {
        return __awaiter(this, void 0, void 0, function* () {
            this.tokenDetails = yield this.fetchAccessToken();
            authorizationCode = this.tokenDetails.access_token;
            this.twitchClient = new this.tmi.Client(this.buildConnectionConfig(this.config.twitchChannel, this.config.twitchUser, this.tokenDetails.access_token));
            this.setupBotBehavior();
            this.twitchClient.connect();
        });
    }
    fetchAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const axios = require('axios');
            this.refreshTokenIfNeeded();
            console.log("Fetching Twitch OAuth Token");
            return axios({
                method: 'post',
                url: this.config.twitchTokenEndpoint,
                params: {
                    client_id: this.config.twitchClientId,
                    client_secret: this.config.twitchClientSecret,
                    code: this.config.twitchAuthorizationCode,
                    //code: accessToken,
                    grant_type: 'authorization_code',
                    redirect_uri: 'http://localhost',
                },
                responseType: 'json'
            }).then(function (response) {
                return __awaiter(this, void 0, void 0, function* () {
                    // handle success
                    return yield TwitchTokenResponseValidator_1.TwitchTokenResponseValidator.parseResponse(response.data);
                });
            }).catch(function (error) {
                console.log("Failed to get Twitch OAuth Token");
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    throw new error_model_1.TwitchResponseError(error.response.data);
                }
                else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    throw new error_model_1.NoTwitchResponseError(error.request);
                }
                else {
                    // Something happened in setting up the request that triggered an Error
                    throw new error_model_1.MalformedTwitchRequestError(error.request);
                }
            });
        });
    }
    refreshTokenIfNeeded() {
        const axios = require('axios');
        axios.post('https://id.twitch.tv/oauth2/token', null, {
            params: { grant_type: 'refresh_token',
                refresh_token: "n7rn1b62quvmom2x2vknqw1usx8qh5q9ra54ogt4fo41tk0si8",
                client_id: this.config.twitchClientId,
                client_secret: this.config.twitchClientSecret, }
        }).
            then(response => {
            accessToken = response.data.access_token;
            console.log("Accesstoken: ${accessToken}");
        })
            .catch(error => { console.error(error); });
        //TODO if needed - twitch apparently only requires the token on login so it is good enough for now to just get a token on start-up.
    }
    setupBotBehavior() {
        this.twitchClient.on('message', (channel, tags, message, self) => {
            if (self)
                return;
            let helloCommand = "!hello";
            let AfroSizeCommand = "!afroSize";
            let addDadjoke = "!addDadjoke ";
            if (message.startsWith('!ban')) {
                let copiedMessage = message.slice(6);
                this.twitchClient.say(channel, `WOT! ${tags.username}! just yeeted ` + copiedMessage + ` into the abyss foreva and eva`);
            }
            if (message.startsWith('!despair'))
                this.twitchClient.say(channel, 'Everything is going to be okay my little Pogchamp. Dont break yo little head over it, will you? <3 <3');
            if (channel === 'mukimooki') {
                messageCounterMooki++;
                if (messageCounterMooki === 30) {
                    this.twitchClient.say(channel, 'QUASO');
                }
            }
            if (message.startsWith('!addDadjoke ') && tags.user === "afronii") {
                var copiedMessage = message.slice(12);
                console.log(copiedMessage);
                if (copiedMessage) {
                    this.SaveJoke(copiedMessage);
                    this.twitchClient.say(channel, copiedMessage + ' officially been added');
                }
            }
            //if(message === '!clip')
            //this.handleClipCommand(channel, authorizationCode, tags);
            if (message.startsWith('!so ')) {
                const copiedMessage = message.slice(5);
                this.twitchClient.say(channel, 'Go check out this lovely bean @' + copiedMessage + ' at twitch.tv/' + copiedMessage);
            }
            if (message.startsWith('!join ') && channel === '#afronii') {
                var joinChannel = message.slice(6);
                this.twitchClient.join(joinChannel);
                this.twitchClient.say(channel, joinChannel + ' was added');
            }
            else if (message.startsWith('!leave ') && channel === '#afronii') {
                var leaveChannel = message.slice(7);
                this.twitchClient.part(leaveChannel);
                this.twitchClient.say(channel, leaveChannel + 'was added');
            }
            if (message.endsWith('Kappa')) {
                this.twitchClient.say(channel, 'KappaRoss *');
            }
            if (message.startsWith('!dadjoke'))
                this.giveDadjoke(channel);
            //! means a command is coming by, and we check if it matches the command we currently support
            if (message.startsWith('Right') || message.startsWith('right') || message.endsWith('right?'))
                this.youRight(channel, tags);
            if (message === helloCommand)
                this.sayHelloToUser(channel, tags);
            else if (message === AfroSizeCommand)
                this.afroSize(channel, tags);
        });
    }
    giveDadjoke(channel) {
        var Dadjoke = this.QuotesArray[Math.floor(Math.random() * this.QuotesArray.length)];
        this.twitchClient.say(channel, `` + Dadjoke + ``);
    }
    sayHelloToUser(channel, tags) {
        this.twitchClient.say(channel, `Hello, ${tags.username}! Welcome to the channel.`);
    }
    youRight(channel, tags) {
        this.twitchClient.say(channel, `The great me agrees, so you must be right!!! CoolCat ${tags.username} `);
    }
    afroSize(channel, tags) {
        var Size = Math.floor(Math.random() * 100);
        this.twitchClient.say(channel, `AYO! ${tags.username} HAS A ` + Size + ` METER IN DIAMETER AFRO PogChamp . So proud rn`);
    }
    SaveJoke(item) {
        this.QuotesArray.push(item);
        const listString = this.QuotesArray.join('\n');
        fs_1.default.writeFileSync('QuoteList.js', listString, 'utf-8');
    }
    handleClipCommand(channel, accessToken, tags) {
        const headers = {
            'Client-ID': this.config.twitchClientId,
        };
        this.createClip(channel, accessToken)
            .then(url => {
            this.twitchClient.say(channel, `@${tags.username}, your clip has been created! Watch it here: ${url}`);
        })
            .catch(error => {
            this.twitchClient.say(channel, `@${tags.username}, there was an error creating your clip: ${error}`);
        });
    }
    fetchBroadcasterId(channelName, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api.twitch.tv/helix/users?login=${channelName}`;
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Client-ID': this.config.twitchClientId,
            };
            try {
                const response = yield fetch(url, { headers });
                const data = yield response.json();
                console.log(data);
                if (typeof data !== 'undefined' && data.data.length > 0) {
                    return data.data[0].id;
                }
                else {
                    throw new Error(`Channel ${channelName} not found`);
                }
            }
            catch (error) {
                console.error(`Error fetching broadcaster ID for channel ${channelName}: ${error}`);
                throw error;
            }
        });
    }
    createClip(channelName, accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const broadcasterId = yield this.fetchBroadcasterId(channelName, accessToken);
                const url = `https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}`;
                const headers = {
                    'Authorization': `Bearer ${accessToken}`,
                    'Client-ID': '<your-client-id>',
                    'Content-Type': 'application/json'
                };
                const body = {
                    'has_delay': false
                };
                const response = yield fetch(url, { method: 'Post', headers, body: JSON.stringify(body) });
                const data = yield response.json();
                if (typeof data !== 'undefined' && data.data.length > 0) {
                    return data.data[0].edit_url;
                }
                else {
                    throw new Error('Error creating clip');
                }
            }
            catch (error) {
                console.error(`Error creating clip: ${error}`);
                throw error;
            }
        });
    }
    buildConnectionConfig(channel, username, accessToken) {
        return {
            options: { debug: true },
            connection: {
                secure: true,
                reconnect: true
            },
            identity: {
                username: `${username}`,
                password: `oauth:${accessToken}`
            },
            channels: [`${channel}`, `${"BigBoiMoodyy"}`, `${"Lauroboros"}`]
        };
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdGJvdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hcHAvY2hhdEJvdC9jaGF0Ym90LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUVBLDBGQUF1RjtBQUN2Rix1REFBZ0g7QUFDaEgsNENBQW9CO0FBS2hCLElBQUksaUJBQWlCLENBQUM7QUFDdEIsSUFBSSxtQkFBbUIsR0FBRyxDQUFDLENBQUM7QUFDNUIsSUFBSSxZQUFZLENBQUM7QUFDakIsSUFBSSxXQUFXLENBQUE7QUFFbkIsTUFBYSxhQUFhO0lBd0N0QixZQUFvQixNQUFxQjtRQUFyQixXQUFNLEdBQU4sTUFBTSxDQUFlO1FBdEN4QywyQkFBMkI7UUFFNUIsUUFBRyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV2QixPQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRWxCLFNBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFeEIsY0FBUyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUUxQixTQUFJLEdBQWEsRUFBRSxDQUFDO1FBRW5CLGdCQUFXLEdBQWEsRUFBRSxDQUFDO1FBRWxDLFVBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7UUFJbkMsVUFBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4QixlQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQztZQUN6QyxJQUFJLEVBQUUsa0JBQWtCO1lBQ3hCLElBQUksRUFBRSxlQUFlO1lBQ3JCLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxpQ0FBaUM7U0FDNUMsQ0FBQyxDQUFDO1FBZUssSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLFlBQVksR0FBRyxvREFBb0QsQ0FBQTtJQUN2RSxDQUFDO0lBR08sUUFBUTtRQUNoQixNQUFNLFFBQVEsR0FB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