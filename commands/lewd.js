module.exports = {
    name: 'lewd',
    description: 'oh my how lewd...',
    execute(message, args) {
        message.channel.send({files: ['https://i.imgur.com/UPbR5ef.gif']});
    },
};