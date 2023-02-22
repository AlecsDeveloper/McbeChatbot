const Discord = require('discord.js');
const { Webhook, MessageBuilder } = require('webhook-discord')

async function SendChannelEmbed (options,client,id) {
    const { title, message, color } = options;
    const embed = new Discord.EmbedBuilder()
        .setTitle(title)
        .setDescription(message)
        .setColor(color)
        .setTimestamp();
    
    client.channels.cache.get(id).send({ embeds: [embed] })
}

async function SendMessage ({ message, client, id }) {
    client.channels.cache.get(id).send({ content: message });
}

async function SendHook ({ author, message, config }) {
    const Hook = new Webhook(config.webhookMsgs);
    const Msg = new MessageBuilder()
        .setName(author)
        .setAvatar(config.avatar)
        .setText(message);

    return Hook.send(Msg)
}

async function SendEmbed (options,ev) {
    const { title, message, color } = options;
    const embed = new Discord.EmbedBuilder()
        .setTitle(title)
        .setDescription(message)
        .setColor(color)
        .setTimestamp();
    
    ev.reply({ embeds: [embed], ephemeral: true });
}

module.exports.SendEmbed = SendEmbed;
module.exports.SendHook= SendHook;
module.exports.SendMessage = SendMessage;
module.exports.SendChannelEmbed = SendChannelEmbed;