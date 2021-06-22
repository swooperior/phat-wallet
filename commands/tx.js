const db = require('./../utilities/db-wrapper');

module.exports = {
    name: 'tx',
    description: 'info about the arguments',
    execute: async (message, args) => {
        var sender = message.author.tag;
        var recipient = args[0];
        var amount = args[1];
        if(args[1] == "all"){
            amount = await db.checkFunds(message.author.tag);
        }
        var check = typeof parseInt(amount);
        if(check !== "number"){
            return message.channel.send("Invalid Syntax!  Try: pw tx @User amount");
        }
        
        await db.transferFunds(sender,recipient,amount)
        .then(function(success){
            if(success){
                return message.channel.send(sender+" sent 💰"+amount+" to "+recipient);  
            }
            return message.reply("You don't have enough money to make this transaction :(");
              
        })
     
    },
};