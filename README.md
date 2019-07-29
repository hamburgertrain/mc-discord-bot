# mc-discord-bot

## About

This node.js program is for Minecraft server status integration into a Discord server. With this tool you can:

1. Retrieve the public IP of wherever the bot is hosted.

2. Use that public IP to query a minecraft server on the same private network, and display its status in a discord text channel.

## Setup

1. Install Node.JS and Node Package Manager

2. Clone this repo to a machine on the same network as the Minecraft server.\
(You can install the bot anywhere by specifying a static IP for minestat to query)

3. Specify your Discord bot API key and Minecraft server port in config.json

3. Run `npm install`

4. Run `node bot.js`

5. You should be up and running!

Included is a batch script (start.bat) for those on Windows who would like to get autostart on boot working. Create a shortcut to the batch script and place it in your startup directory and you should be good to go.

## Commands

`!server-ip` - Get current public IP address.

`!server-status` - Get Minecraft server status, including IP address, port, number of players online, minecraft version and latency.

## Config

`hotkey: String`\
`Default: "!"`

The hotkey to mark commands that the bot should respond to.

`getIp: Boolean`\
`Default: true`

Whether the 'server-ip' command is enabled.

`getStatus: Boolean`\
`Default: true`

Whether the 'server-status' command is enabled.

`staticIp: Boolean or String`\
`Default: false`

Whether the bot should use a static IP for the Minecraft server.\
Note: To enable, this should be changed from false to your Minecraft server IP as a string.

`port: Integer`\
`Default: 25578`

The port which the Minecraft server is using for connections.

`token: String`\
`Default: "None"`

Your Discord bot token.

## License

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.