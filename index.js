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
    client.user.setActivity('n+help [Version 0.0.6]');
});

// login to Discord with your app's token

client.on('message', message => {
      if (message.content === "Bad bot!") {
        message.channel.send({files: ['https://i.imgur.com/DdcreHl.gif']});
      } 
  
      if (!message.content.startsWith(prefix) || message.author.bot) return;
  
          const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g);
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