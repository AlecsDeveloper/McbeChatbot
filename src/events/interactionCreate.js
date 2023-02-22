module.exports = {
    name: 'interactionCreate',
    run: (client,ev) => {
        if (ev.isCommand()) {
            const command = client.cmds.get(ev.commandName);
            if (!command) return;
            command.run(client, ev)
        }
    }
}