module.exports = {
    name: 'nep\'d',
    description: 'USE THIS COMMAND AND TOTALLY NEP YOUR FRIENDS!',
    execute(message, args) {
       const taggedUser = message.mentions.users.first();
      if (!message.mentions.users.size) {
            return message.channel.send('You need to tag a USER if you want to NEP someone!');
          }
      if (taggedUser === message.author) {
            return message.channel.send(`B..B...B..B..BAKA! THAT ISN\'T HOW THIS IS SUPPOSED TO WORK!`);
          }
      
        message.channel.send(`OH SHIT ${taggedUser}, YOU FRICCIN MORON, YOU JUST GOT NEP\'D`, {files: ['https://i.imgur.com/Zsd3Mk4.png']});
    },
};