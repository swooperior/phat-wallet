const db = require('../utilities/db-wrapper');

module.exports = {
    name : "balance",
    description: "Displays the current users balance.",
    execute: async (message, args) => {
        var user = (typeof args[0] !== "undefined") ? args[0] : message.author.tag;
        console.log(user);
        var funds = await db.checkFunds(user);

        message.reply(user+" has 💰"+funds);  
    }
}