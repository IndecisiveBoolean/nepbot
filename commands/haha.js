module.exports = {
    name: 'ha',
    description: 'hahahahahahaha',
    execute(message, args) {
      const username = message.author.username;
      const ID = message.author.id;
        message.channel.send({files: ['https://i.imgur.com/jAolPyY.gif']});
    },
};