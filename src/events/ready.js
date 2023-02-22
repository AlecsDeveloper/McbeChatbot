const { writeFileSync } = require('fs');
require('colors')

const DIR = __dirname.replace('events','bedrock')

module.exports = {
    name: 'ready',
    run: client => {
        writeFileSync(DIR+'/chat.properties','chat.enable = false')
        console.clear();
        client.application.commands.set(client.cmds.map(x => x));
        console.log(`${'[Ethernal Bot]'.cyan} connected`)
    }
}