const Command = require("../classes/Command.js");

class Ping extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            description: "Show the bot response time.",
            usage: "ping"
        });
    }

    async run (message, args) {
        const m = await message.channel.send(`Ping!...`)
        await m.edit(`:ping_pong: Pong! The ping is currently: **${m.createdTimestamp - message.createdTimestamp}ms**`);        
    }
}

module.exports = Ping;