module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(message, args) {
    const username = message.author.username;
    const ID = message.author.id;
    message.channel.send('1972.');

  },
};