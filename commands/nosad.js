module.exports = {
    name: 'anti-sad',
    description: 'Please stop being sad...',
    execute(message, args) {
      const username = message.author.username;
      const ID = message.author.id;
        message.channel.send({files: ['https://i.imgur.com/ItMih1m.gif']});
    },
};