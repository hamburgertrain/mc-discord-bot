# mc-discord-bot

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

## Setup:

1. Install Node.JS and Node Package Manager

2. Clone this repo to a machine on the same network as the Minecraft server
(optionally, you can install the bot anywhere by specifying a static IP for minestat to query)

3. Specify your Discord bot API key and Minecraft server port in config.json

3. Run `npm install`

4. Run `node bot.js`

5. You should be up and running!

Included is a batch script (start.bat) for those on Windows who would like to get autostart on boot working. Create a shortcut to the batch script and place it in your startup directory and you should be good to go.

## Commands:

`!server-ip` - Get current public IP address.

`!server-status` - Get Minecraft server status, including IP address, port, number of players online, minecraft version and latency.