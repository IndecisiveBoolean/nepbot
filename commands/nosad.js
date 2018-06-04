module.exports = {
    name: 'nosad',
    description: 'Please stop being sad...',
    execute(message, args) {
        
        message.channel.send({files: ['https://i.imgur.com/ItMih1m.gif']});
    },
};