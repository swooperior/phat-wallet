const db = require('./../utilities/db-wrapper');

module.exports = {
    name: 'register',
    description: 'Registers the user with the database.',
    execute : async (message, args) =>{
        message.reply('Signing you up...');
        var signup = await db.signUp(message.author.tag);
       
        if(signup){
            return message.reply("Done!  Welcome to Phat Wallet!");
        }
        console.log(message.author.tag+" error in signup.");
        return message.reply("I couldn't sign you up... Have you registered already?");
     
    },
};