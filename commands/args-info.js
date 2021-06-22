module.exports = {
    name: 'args-info',
    description: 'info about the arguments',
    execute(message, args){
        if(!args.length){
             message.channel.send(`You have not provided any arguments, ${message.author}.`);
        }else if(args[0] === 'foo'){
             message.channel.send('bar');
        }

        message.channel.send(`Arguments: ${args} \n Arguments Length: ${args.length}`);
    },
};