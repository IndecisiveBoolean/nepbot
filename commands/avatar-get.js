module.exports = {
    name: 'avatar',
    description: 'Will display the avatar of a given user or yourself.',
    execute(message, args) {
        if (!message.mentions.users.size) {
                return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
            }
          
          const avatarList = message.mentions.users.map(user => {
              return `${user.username}'s avatar: ${user.displayAvatarURL}`;
          });
          
          message.channel.send(avatarList);
    },
};