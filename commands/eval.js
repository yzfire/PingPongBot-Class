const Command = require("../classes/Command.js");

class Eval extends Command {
    constructor(client) {
        super(client, {
            name: "eval",
            description: "Evaluate your scriptjava, or something.",
            usage: "eval <code>"
        });
    }

    clean (text) {
        if (typeof (text) === "string")
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else
            return text;
    }   

    async run(message, args) {
        if (message.author.id !== this.client.config.ownerID) return;
        try {
            const code = args.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(this.clean(evaled), { code: "xl" });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${this.clean(err)}\n\`\`\``);
        }
    }
}

module.exports = Eval;