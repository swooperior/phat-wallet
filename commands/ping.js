module.exports = {
    name: 'ping',
    description: 'Pings to see if the bot is alive.',
    execute(message, args){
        message.channel.send('Pong!');
    }
}