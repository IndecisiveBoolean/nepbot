
const db = require('../index.js');
const userCollection = require('../index.js');
const Discord = require('discord.js');

module.exports = {
    name: 'description',
    description: 'Make your Nep-Note description your own.',
    execute(message, args) {
const username = message.author.username;
const ID = message.author.id;
// Creates a temporary object that contains messages sent in chat. Checks for a match of the intitial message author's ID and every subsequent message while the collector is active.
const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
      
function descUpdate(content) { // Handles the updating/creation of the description object in user profiles using data from collector.
  if (content.toString().length > 40) { // Limits the total length of a description.
    message.channel.send("That description is too long.");
    collector.stop([console.log("String too long. Stopping collector.")]); // Stops the collector from running.
    return;
  } else {
  db.userCollection.update(
    {userID: ID},
    {$set: {description: `${content}`}}).then((doc) => {
    message.channel.send("I've updated your description with that message.");
    collector.stop([console.log("Update complete. Stopping collector.")]);
    }).catch((error) => {
      console.log(error);
    });
  }
};      
       
db.userCollection.findOne({userID: ID}) // Checks for presence of document containing user's profile. If no document is found create one.
    .then((doc) => {
      if (!doc) {
      message.channel.send("I can't find your Nep-Note. Create one with the **create** command.");          
        } else {
            message.channel.send("Your next message will be your new description. Enter it within 20 seconds. **MAX OF 40 CHARACTERS**").then((doc) => {
              // Collects messages on the channel.
              collector.on("collect", message => {
              console.log( (`Collector was activated by ${message.author.username}`) );
              descUpdate(message);
              })
            });
          }
    })
  },
};