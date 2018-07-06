const Discord = require("discord.js");
const fs = require("fs");
const Enmap = require("enmap");

const YzbotClient = require("./classes/YzbotClient.js");

const client = new YzbotClient({
    disableEveryone: true
});

fs.readdir("./events/", (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        const event = new (require(`./events/${file}`))(client)
        const eventName = file.split(".")[0];
        client.on(eventName, (...args) => event.run(...args));
    });
});

fs.readdir("./commands", (err, files) => {
    if (err) throw err;

    files.forEach(f => {
        const cmdFile = new (require(`./commands/${f}`))(client);
        client.commands.set(cmdFile.help.name, cmdFile);
    });
});

client.login(client.auth.token);