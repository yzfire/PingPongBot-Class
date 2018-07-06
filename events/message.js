const Event = require("../classes/Event.js");

class Message extends Event {
    async run(message) {
        if (message.author.bot || !message.guild) return;

        const prefix = this.client.config.prefix;

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).split(" ");
        const command = args.shift().toLowerCase();

        const cmd = this.client.commands.get(command);
        if (!cmd) return;

        cmd.run(message, args);
    }
}

module.exports = Message;