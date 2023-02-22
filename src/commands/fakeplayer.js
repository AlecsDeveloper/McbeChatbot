let { BedrockRoot, PLAYERS } = require('../lib/bedrock.js');
const { SendChannelEmbed } = require('../lib/source.js');
const server = require('../../server.json');
const config = require('../../config.json');


module.exports = {
    name: 'fakeplayer',
    description: 'Fakeplayer connection to server',
    options: [
        {
            name: 'action',
            description: 'Fakeplayer action',
            type: 3,
            choices: [
                { name: 'connect', value: 'connect' },
                { name: 'disconnect', value: 'disconnect' }
            ],
            required: true
        },
        {
            name: 'username',
            description: 'Fakeplayer username',
            type: 3,
            required: true
        }
    ],
    run: async (client,ev) => {
        // Action
        const action = ev.options.getString('action');
        const user = ev.options.getString('username')

        if (action === 'connect') {
            // Server Connection
            const user = ev.options.getString('username');
            const exist = PLAYERS.findIndex(x => x.options.username === user);
            if (exist >= 0) return ev.reply({ content: `**${user}** it's already connected`, ephemeral: true});
            else if (user == 'Ethernal_Bot') return ev.reply({ content: `Invalid user`, ephemeral: true});
            PLAYERS.push(BedrockRoot.Connect(user,server));

            // Send Messages
            await SendChannelEmbed({
                title: 'Fakeplayer Connect',
                message: `**${user}** connected by **${ev.user.username}**`,
                color: 'Green'
            },client,config.channelLogs)
            await ev.reply({ content: `**${user}** has connect to server`, ephemeral: true});
        } else {
            // Server Disconection
            const user = ev.options.getString('username');
            const exist = PLAYERS.findIndex(x => x.options.username === user);
            if (PLAYERS.length == 0 || exist == -1) return ev.reply({ content: 'No hay jugadores conectados o el jugador no se encuentra en la lista', ephemeral: true})
            BedrockRoot.RunCmd(PLAYERS[0],`kick "${user}"`);
            PLAYERS.splice(exist,1)

            // Send Messages
            await SendChannelEmbed({
                title: 'Fakeplayer Disconnect',
                message: `**${user}** disconnected by **${ev.user.username}**`,
                color: 'Red'
            },client,config.channelLogs)
            await ev.reply({ content: `**${user}** has kicked to server`, ephemeral: true})
        }
    }
}