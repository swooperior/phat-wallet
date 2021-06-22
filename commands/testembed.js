const embeds = require('./../utilities/embeds');

module.exports = {
    name: "testembed",
    description: "displays a test embed",
    execute(message, args){
        var embed = embeds.exampleEmbed();
        message.channel.send(embed);
    }
}