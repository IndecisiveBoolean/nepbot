module.exports = {
    name: 'nep\'d',
    description: 'USE THIS COMMAND AND TOTALLY NEP YOUR FRIENDS!',
    execute(message, args) {
        userId = args;
        message.channel.send(`OH SHIT ${userId}, YOU FRICCIN MORON, YOU JUST GOT NEP\'D`, {files: ['https://i.imgur.com/Zsd3Mk4.png']});
    },
};