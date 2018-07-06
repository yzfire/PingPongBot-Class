const Event = require("../classes/Event.js");

class Ready extends Event {
    async run() {
        console.log("Bot is online and ready.");
    }
}

module.exports = Ready;