const fs = require('fs');
// require the discord.js module
const Discord = require('discord.js');

const {prefix, token} = require('./hConfig.js');
const snekfetch = require('snekfetch');

// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands');// the fs.readdirSync() method will return an array of all the file names in that directory, e.g. ['ping.js', 'beep.js']. With that array, you can loop over it and dynamically set your commands to the Collection you made above.

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}


// when the client is ready, run this code
// this event will trigger whenever your bot:
// - finishes logging in
// - reconnects after disconnecting
client.on('ready', () => {
    console.log('Ready!');
});

// login to Discord with your app's token

client.on('message', message => {
      if (!message.content.startsWith(prefix) || message.author.bot) return;
  
        
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        if (!client.commands.has(command)) return;

        try {
          client.commands.get(command).execute(message, args);
        }
        catch (error) {
          console.error(error);
          message.reply('there was an error trying to execute that command!');
        }
});
client.login(token);
  
  /*
  if (message.content.indexOf('n+') > -1) {
    if (message.content == `${prefix}nep`) {
        message.channel.send('./images.NEP_NEP.gif');
        } else if (message.content == `${prefix}nep'd`) {
          message.channel.send(`OH SHIT ${taggedUser.username}, YOU FRICCIN MORON, YOU JUST GOT NEP\'D`, {files: ['https://i.imgur.com/EaZUef1.gif']});  
        } else if (message.content === `${prefix}server`) {
          message.channel.send(`This server's name is: ${message.guild.name}\nTotal Members: ${message.guild.memberCount}`);
        } else if (message.content === `${prefix}user-info`) {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
        } else if (command === 'kick') {
          // grab the "first" mentioned user from the message
          
          // this will return a `User` object, just like `message.author`
          const taggedUser = message.mentions.users.first();
          
          // checks the .size properties value of the message.mentions.users collection if 0 is returned
          if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to kick them!');
          }
          
          message.channel.send(`You wanted to kick: ${taggedUser.username}`);
        } else if (command === 'avatar') {
            if (!message.mentions.users.size) {
                return message.channel.send(`Your avatar: ${message.author.displayAvatarURL}`);
            }
          
          const avatarList = message.mentions.users.map(user => {
              return `${user.username}'s avatar: ${user.displayAvatarURL}`;
          });
          
          // send the entire array of strings as a message
          // by default, discord.js will `.join()` the array with `\n`
          message.channel.send(avatarList);

            // ...
        } else if (command === 'prune') {
            const amount = parseInt(args[0] + 1);

            if (isNaN(amount)) {
                return message.reply('that doesn\'t seem to be a valid number.');
            } else if (amount <= 1 || amount > 100) {
                return message.reply('you need to input a number between 1 and 99.');
            }
            // Deletes the amount of messages according to the value the user input when using the command
            message.channel.bulkDelete(amount, true).catch(error => {
              console.error(error);
              message.channel.send("There was an error while trying to prune messages in this channel! Messages older than TWO WEEKS can not be pruned!")
            }); // the TRUE parameter will filter out messages older than two weeks which would normally cause an error.
        } else if (command === 'args-info') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        } else if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
          message.channel.send(`First argument: ${args[0]}`);
      } 
    }


*/