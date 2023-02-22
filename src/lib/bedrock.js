const { createClient, ping } = require('bedrock-protocol')


// FakePlayers DB
let PLAYERS = Array();
let CHATBOT = Boolean(false);

// BedrockRoot Object
const BedrockRoot = {
    RunCmd: function (FP,CMD) {
        FP.queue('command_request', {
            command: CMD,
            origin: { size: 0, type: 0, uuid: "", request_id: "", player_entity_id: "", },
            interval: false,
        })
    },

    Connect: function (name,server) {
        return createClient({
            host: server.host,
            port: server.port,
            version: server.version,
            username: name,
            offline: server.offline
        })
    },

    GetFP: function () {
        if (PLAYERS.length == 0) return '`No players found`'
        let list = '\n```';
        PLAYERS.forEach(x => list += ` - ${x.options.username}\n`);
        return list += '```'
    },

    GetPing: function (server) {
        return ping({
            host: server.host,
            port: server.port,
            version: server.version
        }).then(x => x)
    }
}


// Export Modules
module.exports.CHATBOT = CHATBOT;
module.exports.PLAYERS = PLAYERS;
module.exports.BedrockRoot = BedrockRoot;