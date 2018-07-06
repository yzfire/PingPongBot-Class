const Command = require("../classes/Command.js");

const paginate = require("paginate-array");
const Enmap = require("enmap");

class Help extends Command {
    constructor(client) {
        super(client, {
            name: "help",
            description: "Send help",
            usage: "help <command/page>"
        });
    }

    async run (message, args) {
        try {
            const prefix = this.client.config.prefix;
            const commands = this.client.commands.keyArray();
            const longest = commands.reduce((long, str) => Math.max(long, str.length), 0);
            if (!isNaN(args[0]) || !args[0]) { // If args[0] is a number, or they haven't provided a first argument.
                const helpDt = new Enmap();
                this.client.commands.forEach((value, key) => {
                    helpDt.set(key, value.help);
                });

                const page = parseInt(args[0]) || 1;
                let helpDataArr = helpDt.map(d => `${prefix}${d.name}${' '.repeat(longest - d.name.length)} ::  ${d.description}`).sort(); // An array of the help data, sorted alphabetically.
                let currPg = paginate(helpDataArr, page, 10);
                if (currPg.data.length < 1) return message.channel.send(`This page does not exist. There are currently ${paginate(helpDataArr, 1, 10).totalPages} pages. Type ${prefix}help <page> to go to a specific page.`);
                await message.channel.send(`= Yzbot Help - Page ${currPg.currentPage}/${currPg.totalPages}, ${helpDataArr.length} Total Commands: =\n${currPg.data.join("\n")}\n= Type ${prefix}help <command> for more info on a specific command, and ${prefix}help <page> to go to a specific page. =`, { code: 'asciidoc' });
            } else {
                let cmd = args[0];
                if (!commands.includes(cmd)) return message.channel.send(`That's not a valid command. Type ${prefix}help for all the commands you can get help on.`);
                let helpData = this.client.commands.get(cmd).help;
                await message.channel.send(`== Help for command \'${helpData.name}\': ==\n
                \nUsage :: \n${prefix}${helpData.usage}
                \nDescription :: \n${helpData.description}`, {code:'asciidoc'});
            }
        } catch (e) {
            console.error(e.stack || e);
        }    
    }
}

module.exports = Help;