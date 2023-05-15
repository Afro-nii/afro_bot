import { ChatBotConfig } from './../config/config.model';
import { TwitchTokenDetails } from './../models/twitchTokenDetails.models';
import { TwitchTokenResponseValidator } from './../utils/TwitchTokenResponseValidator';
import { MalformedTwitchRequestError, NoTwitchResponseError, TwitchResponseError } from '../models/error.model';
import fs from 'fs';
import * as path from 'path';
import _ from 'lodash';


    let authorizationCode;
    let messageCounterMooki = 0;
    let refreshToken;
    let accessToken

export class TwitchChatBot {

     //axios = require('axios');

    tmi = require('tmi.js');

     fs = require('fs');

    mysql = require('mysql2/promise');

      path = require('path');

     ArrayList = require('arraylist');

     public list: string[] = [];

     private QuotesArray: string[] = [];

      fetch = require('node-fetch');


    const pool = mysql.createPool({
  host: 'localhost',
  user: 'myuser',
  password: 'mypassword',
  database: 'mydatabase'
});





    public twitchClient: any;
    private tokenDetails!: TwitchTokenDetails;


    constructor(private config: ChatBotConfig) {
        this.loadList();
        refreshToken = "n7rn1b62quvmom2x2vknqw1usx8qh5q9ra54ogt4fo41tk0si8"
    }


    private loadList() {
    const fileName = 'QuoteList.js';
    const fileContents = fs.readFileSync(fileName, 'utf-8');
    const list = fileContents.split('\n');
    this.QuotesArray = list;}

    async launch() {
        this.tokenDetails = await this.fetchAccessToken();
            authorizationCode = this.tokenDetails.access_token;
        this.twitchClient = new this.tmi.Client(
            this.buildConnectionConfig(
                this.config.twitchChannel,
                this.config.twitchUser,
                this.tokenDetails.access_token)
        );
        this.setupBotBehavior();
        this.twitchClient.connect();
    }

    private async fetchAccessToken(): Promise<TwitchTokenDetails> {
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
        }).then(async function (response: any) {
            // handle success
            return await TwitchTokenResponseValidator.parseResponse(response.data);
        }).catch(function (error: any) {
            console.log("Failed to get Twitch OAuth Token");
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                throw new TwitchResponseError(error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                throw new NoTwitchResponseError(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                throw new MalformedTwitchRequestError(error.request);
            }
        })
    }

private refreshTokenIfNeeded() {
    const axios = require('axios');
   axios.post('https://id.twitch.tv/oauth2/token', null, {
    params: {    grant_type: 'refresh_token',
        refresh_token: "n7rn1b62quvmom2x2vknqw1usx8qh5q9ra54ogt4fo41tk0si8",
        client_id: this.config.twitchClientId,
        client_secret: this.config.twitchClientSecret,  }}).
            then(response => {
            accessToken = response.data.access_token;
            console.log("Accesstoken: ${accessToken}");})
            .catch(error => {  console.error(error);});

//TODO if needed - twitch apparently only requires the token on login so it is good enough for now to just get a token on start-up.
    }

    private setupBotBehavior() {
        this.twitchClient.on('message', (channel: any, tags: any, message: any, self: any) => {

            if(self) return;

            let helloCommand = "!hello"
            let AfroSizeCommand = "!afroSize"
            let addDadjoke = "!addDadjoke "

            if(message.startsWith('!ban')){
              let copiedMessage = message.slice(6);
              this.twitchClient.say(channel, `WOT! ${ tags.username }! just yeeted ` + copiedMessage + ` into the abyss foreva and eva`);
}

             if(message.startsWith('!despair'))
                this.twitchClient.say(channel, 'Everything is going to be okay my little Pogchamp. Dont break yo little head over it, will you? <3 <3');

            if(channel === 'mukimooki'){
            messageCounterMooki++
            if(messageCounterMooki === 30){
                this.twitchClient.say(channel, 'QUASO');
}
}


             if (message.startsWith('!addDadjoke ') && tags.user === "afronii"){
                var copiedMessage = message.slice(12);
            console.log(copiedMessage);
                if (copiedMessage) {
    this.SaveJoke(copiedMessage);
    this.twitchClient.say(channel, copiedMessage + ' officially been added');
  }}
    //if(message === '!clip')
    //this.handleClipCommand(channel, authorizationCode, tags);

            if(message.startsWith('!so ')){
                const copiedMessage = message.slice(5);
                this.twitchClient.say(channel, 'Go check out this lovely bean @' + copiedMessage + ' at twitch.tv/' + copiedMessage);

}

            if(message.startsWith('!join ') && channel === '#afronii'){
                var joinChannel = message.slice(6);
                this.twitchClient.join(joinChannel);
                this.twitchClient.say(channel, joinChannel + ' was added');
           }
            else if(message.startsWith('!leave ')  && channel === '#afronii'){
                    var leaveChannel = message.slice(7);
                    this.twitchClient.part(leaveChannel);
                    this.twitchClient.say(channel, leaveChannel + 'was added');

}

            if(message.endsWith('Kappa')){
              this.twitchClient.say(channel, 'KappaRoss *');}

             if(message.startsWith('!dadjoke'))
             this.giveDadjoke(channel);


            //! means a command is coming by, and we check if it matches the command we currently support
            if(message.startsWith('Right') || message.startsWith('right') || message.endsWith('right?'))
                this.youRight(channel, tags);


                if(message === helloCommand)
                this.sayHelloToUser(channel,tags);
                else if(message === AfroSizeCommand)
                this.afroSize(channel, tags);

        });
    }

    private giveDadjoke(channel : any){
     var Dadjoke = this.QuotesArray[Math.floor(Math.random() * this.QuotesArray.length)]
     this.twitchClient.say(channel, `` + Dadjoke + ``);

}
    private sayHelloToUser(channel: any, tags: any) {
            this.twitchClient.say(channel, `Hello, ${ tags.username }! Welcome to the channel.`);
    }

    private youRight(channel : any, tags : any){
       this.twitchClient.say(channel, `The great me agrees, so you must be right!!! CoolCat ${tags.username } `);
}
    private afroSize(channel: any, tags: any){
         var Size = Math.floor(Math.random() * 100)
         this.twitchClient.say(channel, `AYO! ${tags.username} HAS A `+ Size + ` METER IN DIAMETER AFRO PogChamp . So proud rn`)
    }

    public SaveJoke(item: string) {
    this.QuotesArray.push(item);
    const listString = this.QuotesArray.join('\n');
    fs.writeFileSync('QuoteList.js', listString, 'utf-8');
  }

    public handleClipCommand(channel : any , accessToken, tags : any) {


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

     public async fetchBroadcasterId(channelName, accessToken) {
  const url = `https://api.twitch.tv/helix/users?login=${channelName}`;
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Client-ID': this.config.twitchClientId,
  };
  try {
    const response = await fetch(url, { headers });
    const data = await response.json();

     console.log(data);

    if ( typeof data !== 'undefined' && data.data.length > 0) {
      return data.data[0].id;
    } else {
      throw new Error(`Channel ${channelName} not found`);
    }
  } catch (error) {
    console.error(`Error fetching broadcaster ID for channel ${channelName}: ${error}`);
    throw error;
  }
}





    public async createClip(channelName, accessToken) {
  try {
    const broadcasterId = await this.fetchBroadcasterId(channelName, accessToken);
    const url = `https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}`;
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Client-ID': '<your-client-id>',
      'Content-Type': 'application/json'
    };
    const body = {
      'has_delay': false
    };
    const response = await fetch(url, { method: 'Post', headers, body: JSON.stringify(body) });
    const data = await response.json();
    if (typeof data !== 'undefined' && data.data.length > 0) {
      return data.data[0].edit_url;
    } else {
      throw new Error('Error creating clip');
    }
  } catch (error) {
    console.error(`Error creating clip: ${error}`);
    throw error;
  }
}

    private buildConnectionConfig(channel: string, username: string, accessToken: string) {
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


