class Command {
    constructor(client, {
        name = null,
        description = "No description provided.",
        usage = "No usage provided."
    }) {
        this.client = client;
        this.help = {
            name: name,
            description: description,
            usage: usage
        };
    }
}

module.exports = Command;