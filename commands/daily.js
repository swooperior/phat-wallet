const db = require('./../utilities/db-wrapper');
module.exports = {
    name: "daily",
    description: "Gives daily rewards based on level.",
    execute : async (message, args) => {
        var user = await db.getUser(message.author.tag);
        var base = 1000;
        var reward = parseInt(base + ((0.1*base)*user.level));
        //Datecheck against daily_claimed
       
        if(user.daily_claimed == null ){
            user.daily_claimed = new Date();
            user.daily_claimed.setDate(1);
        }
        var timestamp = Date.parse(user.daily_claimed);
        timestamp = timestamp + 86400;
        var limit = new Date(timestamp);
        var now = new Date();
        console.log(parseInt(now.getTime()/1000));
        console.log(parseInt(limit.getTime()/1000));
        if(parseInt(now.getTime()/1000) >= parseInt(limit.getTime()/1000) ){
            await db.giveCash(user.tag, reward);
            await db.setDaily(user.tag);
            return message.reply("You gained 💰"+reward+" For claiming your daily!");
        }
        return message.reply("You've already claimed your daily for today.");
    }
}