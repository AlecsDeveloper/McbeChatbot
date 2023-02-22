const { BedrockRoot } = require('../lib/bedrock.js');
const { SendEmbed, SendChannelEmbed } = require('../lib/source.js');
const server = require('../../server.json');
const config = require('../../config.json');


module.exports = {
    name: 'server',
    description: 'Server Data',
    run: (client,ev) => {

        SendChannelEmbed({
            title: 'Server Data Request',
            message: `Requested by **${ev.user.username}**`,
            color: 'Blue'
        },client,config.channelLogs);

        BedrockRoot.GetPing(server).then(x => {
            SendEmbed({
                title: 'Server Data Request',
                message: `**Players Online:**  \`${x.playersOnline}\`\n**Fakeplayers:**  ${BedrockRoot.GetFP()}`,
                color: 'Blue'
            },ev);
        })
        
        return;
    }
}