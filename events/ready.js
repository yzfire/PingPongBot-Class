const Event = require("../classes/Event.js");

class Ready extends Event {
    async run() {
        this.client.user.setStatus("dnd");
        this.client.user.setPresence({
            game: {
                name: `;help | ${this.client.guilds.size} Servers`
            }
        });
        
        console.log("Bot is online and ready.");
    }
}

module.exports = Ready;