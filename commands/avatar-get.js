module.exports = {
    name: 'avatar',
    description: 'Will display the avatar of a given user or yourself.',
    execute(message, args) {
      const username = message.author.username;
      const ID = message.author.id;
      let taggedUser = message.mentions.users.array();
      
        if (!message.mentions.users.size) {
                return message.channel.send(`Here's your avatar: ${message.author.displayAvatarURL}`);
            } else if (message.mentions.users.size === 1){
              return message.channel.send(`${taggedUser[0]}'s avatar: ${taggedUser[0].displayAvatarURL}`);
            } else if (message.mentions.users.size > 1) {
              return message.channel.send(`I can't display more than one avatar at a time.`);
            }
          
    },
};