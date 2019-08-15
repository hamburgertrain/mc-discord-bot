/*
* Main file for the discord bot, run this via node.js.
* 
* Copyright (C) 2019  Tyler Bialoblocki
* tylerbialoblocki@gmail.com
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation; either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.
* 
* You should have received a copy of the GNU General Public License along
* with this program; if not, write to the Free Software Foundation, Inc.,
* 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
* 
* Requires:
* discord.io - Discord bot API
* config.json - Configuration file for discord API key, hotkey, and enabled features
* node-fetch - Handles our network requests
* child_process - Forks a process for our minecraft-middleman
*/

const Discord = require('discord.io');
const config = require('./config.json');
const fetch = require('node-fetch');
const cp = require('child_process');

// Initialize Discord Bot
const bot = new Discord.Client({
   token: config.token,
   autorun: true
});

// Set up our public IP API request
const url = 'https://api.ipify.org?format=json';
const makeRequest = async url => {
    try {
        if (!config.staticIp) {
            var response = await fetch(url);
            var json = await response.json();
            return json;
        } else {
            return config.staticIp;
        }
    } catch (error) {
        console.error('Request errored: ', error);
    }
};

// Let us know when the bot is ready
bot.on('ready', function (evt) {
    console.log('Ready! Logged in as: ' + bot.username + ' - (' + bot.id + ')');
});

// Main bot onMessage loop
bot.on('message', function (user, userID, channelID, message, evt) {
    if ( message.startsWith(config.hotkey) ) {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // Get server IP
            case 'server-ip':
                if (config.getIp) {
                    makeRequest(url).then(function(response) {
                        bot.sendMessage({
                            to: channelID,
                            message: 'Server IP is ' + response.ip
                        });
                        return;
                    }).catch(function(error) {
                        console.error('An error occured: ', error);
                    });
                } else {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Command is currently disabled!'
                    });
                }
            break;

            // Get server status
            case 'server-status':
                if (config.getStatus) {
                    makeRequest(url).then(function(response) {
                        var n = cp.fork(__dirname + '/minestat-middleman.js');
                        n.on('message', function(m) {
                            bot.sendMessage({
                                to: channelID,
                                message: m.message
                            });
                            return;
                        });
                        n.send({ ip: response.ip });
                        return;
                    }).catch(function(error) {
                        console.error('An error occured: ', error);
                    });
                } else {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Command is currently disabled!'
                    });
                }
            break;
         }
     }
});
