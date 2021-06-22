const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = new fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const config = require('./botConfig');
//Swap this for DBWrapper
const db = require('./db');
//----
const Embeds = require('./utilities/embeds.js');


for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
    console.log(command.name+' loaded.');
}


const getUserFromMention = (mention) => {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention).tag;
    }
}

//Timestamp Helper Function
const ts = () => {
    return Date();
}

//Client Starts
client.on("ready", () => {
    console.log(`${ts()}-Logged in as ${client.user.tag}!`);
    client.user.setStatus("type pw help");

    //ToDo; Autoload extensions


    //---
});

//Client Recieves Message
client.on("message", async message => {
    if(config.dev == "true"){
        console.log(message.author.username+' : '+message.content)
    }
    const prefix = config.prefix;
    if(!message.content.toLowerCase().startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase(0);
   
   
    var count = 0;
    args.forEach(arg => {
        if(arg.includes("<@")){
            args[count] = getUserFromMention(arg);
        }
        count++;
    });
    
    //Command event handling
    if(!client.commands.has(commandName)) return console.log(commandName+' not found.');
    const command = client.commands.get(commandName);
    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('Sorry, something went wrong with that command; It\'s likely still being developed!');
        //ToDo; Log the error to the database.
    }
});

client.login(config.token);

