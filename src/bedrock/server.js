const { BedrockRoot } = require('../lib/bedrock.js')
const { SendHook } = require('../lib/source.js');
const { readFileSync } = require('fs');
const { client } = require('../../index.js');
const server = require('../../server.json');
const config = require('../../config.json');
require('colors')
const Player = BedrockRoot.Connect('Ethernal_Bot',server);



setInterval(function(){
    const file = readFileSync(__dirname+'/chat.properties','utf-8').includes('true');
    if (!file) BedrockRoot.RunCmd(Player,'kick Ethernal_Bot');
},500)


function Chat() {

    try {

        // Discord to Minecraft
        client.on('messageCreate', message => {
            const file = readFileSync(__dirname+'/chat.properties','utf-8').includes('true');
            if (file && message.channelId == config.channelID && !message.author.bot) {
                BedrockRoot.RunCmd(Player,`tellraw @a {"rawtext":[{"text":"§9[Discord] §r${message.author.username}: ${message.content}"}]}`);
            }
        })

        // Minecraft to Discord
        Player.on('text', packet => {
            const file = readFileSync(__dirname+'/chat.properties','utf-8').includes('true');    
            if (file) {
                if (packet.type == 'chat' && packet.source_name != 'Ethernal_Bot') {
                    SendHook({
                        author: config.user,
                        message: `[${packet.source_name}] ${packet.message}`,
                        config: config 
                    })
                } else if (packet.type == 'translation') {
                    if (packet.message.endsWith('joined')) SendHook({
                        author: config.user,
                        message: `*${packet.parameters[0]} has joined the game*`,
                        config: config 
                    })
                    else if (packet.message.endsWith('left')) SendHook({
                        author: config.user,
                        message: `*${packet.parameters[0]} has left the game*`,
                        config: config 
                    })
                    else if (packet.message.endsWith('sleeping')) SendHook({
                        author: config.user,
                        message: `*${packet.parameters[0]} is sleeping*`,
                        config: config 
                    })
                    else if (packet.message === 'death.attack.player') SendHook({
                        author: config.user,
                        message: `*${packet.parameters[1]} kill ${packet.parameters[0]}*`,
                        config: config 
                    })
                }
            }
        })

    } catch {}

} Chat();

