const db = require('./../utilities/db-wrapper');

module.exports = {
    name: 'simp',
    description: 'simp for the given user',
    execute(message, args){
       message.channel.send(message.author.tag+" is simping for "+args[0]+"!");
    },
};