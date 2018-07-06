const Discord = require("discord.js");
const Enmap = require("enmap");

class YzbotClient extends Discord.Client {
    constructor(options) {
        super(options);

        this.commands = new Enmap();

        this.auth = require("../auth.js");

        this.config = require("../config.json");
    }
}

module.exports = YzbotClient;