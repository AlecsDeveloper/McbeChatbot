let { BedrockRoot, CHATBOT } = require('../lib/bedrock.js');
const { SendChannelEmbed } = require('../lib/source.js');
const config = require('../../config.json');
const server = require('../../server.json');
const { writeFileSync } = require('fs');

const DIR = __dirname.replace('commands','bedrock')

let Runner = false;
let Player2;

const ACTIONS = {
    Connect: function(client,ev) {
        // Client Connection
        CHATBOT = true;
        writeFileSync(DIR+'/chat.properties','chat.enable = true');
        if(!Runner) { require('../bedrock/server.js'); Runner = true }
        else Player2 = BedrockRoot.Connect('Ethernal_Bot',server);
        
        // Send Messages
        ev.reply({ content: '**Chatbot** connected', ephemeral: true });
        SendChannelEmbed({
            title: 'Chatbot Request',
            message: '**Action:** `connect`\n**User:**  `'+ev.user.username+'`',
            color: 'DarkGrey'
        },client,config.channelLogs)
    },

    Disconnect: function(client,ev) {
        // Client Connection
        CHATBOT = false;
        writeFileSync(DIR+'/chat.properties','chat.enable = false');
        if (Player2) BedrockRoot.RunCmd(Player2,'kick Ethernal_Bot');

        // Send Messages
        ev.reply({ content: '**Chatbot** disconnected', ephemeral: true });
        SendChannelEmbed({
            title: 'Chatbot Request',
            message: '**Action:** `disconnect`\n**User:**  `'+ev.user.username+'`',
            color: 'DarkGrey'
        },client,config.channelLogs)
    }
}


module.exports = {
    name: 'chatbot',
    description: 'Discord linked to BDS',
    options: [{
        name: 'action',
        description: 'Chatbot action',
        type: 3,
        choices: [
            { name: 'connect', value: 'connect' },
            { name: 'disconnect', value: 'disconnect' },
        ],
        required: true
    }],
    run: async (client, ev) => {
        // Action
        const action = ev.options.getString('action');

        // Errors
        if (CHATBOT && action === 'connect') return ev.reply({ content: "**Chatbot** it's already connected", ephemeral: true })
        else if (!CHATBOT && action === 'disconnect') return ev.reply({ content: 'No chatbot found', ephemeral: true }) 
        if (!CHATBOT && action == 'command') return ev.reply({ content: 'No chatbot found', ephemeral: true })

        // Actions
        if (action === 'connect') ACTIONS.Connect(client, ev);
        else if (action === 'disconnect') ACTIONS.Disconnect(client, ev);
    }
}