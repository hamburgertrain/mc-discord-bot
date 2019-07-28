/*
* Middleman for minestat, passes messages between bot.js and minestat
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
* Minestat - Library for contacting the minecraft server and querying for details
* config.json - Config file for minecraft server port
*/

const ms = require('./minestat');
const config = require('./config.json');

process.on('message', function(message) {
    ms.init(message.ip, config.port, function(result) {
        var baseMessage = 'Minecraft server at ' + ms.address + ' on port ' + ms.port + ' ';
        if(ms.online) {
            var res = 'is online running version ' + ms.version + ' with ' + ms.current_players + ' out of ' + ms.max_players + ' players.\n'
            + 'Message of the day: ' + ms.motd + '\n'
            + 'Latency: ' + ms.latency + 'ms';
            process.send({ message: baseMessage + res });
            return;
        }
        else {
            process.send({ message: baseMessage + 'is offline!' });
            return;
        }
    });
    return;
});