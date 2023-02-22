console.clear();
// Import Modules
const Discord = require('discord.js');
const config = require('./config.json');
const path = require('path')
const fs = require('fs');

// Create Discord Client
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent
    ]
});


// Global Constants and Variables
const dirEvents = fs.readdirSync(path.join(__dirname,'src/events'));
const dirCommands = fs.readdirSync(path.join(__dirname,'src/commands'));

// Collections
client.cmds = new Discord.Collection();


for (const fileEvent of dirEvents) {
    const event = require(path.join(__dirname, 'src/events', fileEvent));
    client.on(event.name, (...args) => event.run(client,...args));
}

for (const fileCommand of dirCommands) {
    const command = require(path.join(__dirname, 'src/commands', fileCommand));
    client.cmds.set(command.name, command);
}

client.login(config.token)

module.exports.client = client;