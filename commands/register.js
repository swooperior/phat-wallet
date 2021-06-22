const db = require('./../utilities/db-wrapper');

module.exports = {
    name: 'register',
    description: 'Registers the user with the database.',
    execute(message, args){
        message.reply('Coming soon...');
        var msg = db.signUp(message.author.tag)
        message.reply(msg);
    },
};