module.exports = {
  name: 'prune',
  description: 'Clean messages from chat.',
  execute(message, args) {
    if (isNaN(args[0])) {
        return message.reply('that doesn\'t seem to be a valid number.');
    } else if (args[0] <= 1 || args[0] > 100) {
        return message.reply('you need to input a number between 1 and 99.');
    }
    // Deletes the amount of messages according to the value the user input when using the command
    message.channel.bulkDelete(args[0], true).catch(error => {
      console.error(error);
      message.channel.send("There was an error while trying to prune messages in this channel! Messages older than TWO WEEKS can not be pruned!")
    }); // the TRUE parameter will filter out messages older than two weeks which would normally cause an error.
  },
};