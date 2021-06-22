const Canvas = require('canvas');
const { MessageAttachment } = require('discord.js');
const canvas = Canvas.createCanvas(700, 250);
const ctx = canvas.getContext('2d');

module.exports = {
    name: 'profile',
    description: 'Displays an image of the user profile.',
    execute : async (message, args) => {
        applyTag = (canvas, text) => {
            const ctx = canvas.getContext('2d');
        
            // Declare a base size of the font
            let fontSize = 70;
        
            do {
                // Assign the font to the context and decrement it so it can be measured again
                ctx.font = `${fontSize -= 10}px sans-serif`;
                // Compare pixel width of the text to the canvas minus the approximate avatar size
            } while (ctx.measureText(text).width > canvas.width - 300);
        
            // Return the result to use in the actual canvas
            return ctx.font;
        };
        
        const background = await Canvas.loadImage('./commands/profile/background.jpeg');
        
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const avatar = await Canvas.loadImage(message.author.avatarURL({ format: 'jpg' }));
        ctx.drawImage(avatar, 20, 20, 200, canvas.height - 40);
        // Select the font size and type from one of the natively available fonts
        ctx.font = applyTag(canvas, message.author.tag);
        // Select the style that will be used to fill the text in
        ctx.fillStyle = '#ffffff';
        // Actually fill the text with a solid color
        ctx.fillText(message.author.tag, canvas.width / 2.5, canvas.height / 1.8);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), message.author.tag+'-profile.png');
        message.reply(attachment);
    }
}