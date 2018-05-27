module.exports = {
    name: 'nep',
    description: 'nep',
    execute(message, args) {
        message.channel.send("NEP", {files: ['https://i.imgur.com/JTMxLo9.gif']});
    },
};