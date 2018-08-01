const db = require('../index.js');
const userCollection = require('../index.js');

module.exports = {
  name: 'nepnote',
  description: 'Queries the database for message author\'s profile and sends an embed containing that information in chat.',
  execute(message, args) {
    let taggedUser = message.mentions.users.array();
    const username = message.author.username;

    function profileLookup(userToQuery) {
      db.userCollection.findOne({userID: userToQuery}) // Checks for presence of document for User's profile.
      .then((doc) => {
        if (!doc) {
        message.channel.send("I couldn't find your Nep-Note. Use the **create** command to have one created.");
          } else {
            // Array used to store the proper value for the TOP 3 COMMAND RANKING on the user profiles.
            
            let commandRanking = [
              rank_1 = `You need to use more commands.`,
              rank_2 = `You need to use more commands.`,
              rank_3 = `You need to use more commands.`
            ]
            let commanduseObjToArray = [];
            for (let command in doc.commanduse) {
              commanduseObjToArray.push([command, doc.commanduse[command]]);
            }
            
            commanduseObjToArray.sort((a, b) => {
              return b[1] - a[1];
            });
            
            for (let x = 0; x < 3; x++) {
              if (commanduseObjToArray.slice(0)[x] === undefined) {
                  commandRanking[x] = `You need to use more commands.`;
                  } else {
                    commandRanking[x] = `${commanduseObjToArray.slice(0)[x]}`;
                  }
            }
            const embed = { // A Discord embed that contains the unique information of the user's profile.
              "title":  `${doc.name}'s Nep-Note`,//Represents the author of the message as a guild member.
              "description": `${doc.description}`,
              "url": "https://discordapp.com",
              "color": 10453245,
              "footer": {
                "text": "PROFILES ARE IN BETA"
              },
              "thumbnail": {
                "url": `${taggedUser[0].displayAvatarURL}`
              },
              "fields": [
                {
                  "name": "Stats:",
                  "value": `Level: ${doc.levelInfo.level}\nXP: ${doc.levelInfo.experience} [${doc.levelInfo.xpUntilNextLevel} XP until level ${doc.levelInfo.nextlevel}]\nNep-Coins: ${doc.nepcoin}\nCommands Used: ${doc.globalCommandTracker}`,
                  "inline": true
                },
                {
                  "name": "Top Three Commands",
                  "value": `1: (${commandRanking[0]})\n2: (${commandRanking[1]})\n3: (${commandRanking[2]})`,
                  "inline": true
                }
              ]
            };
              message.channel.send({ embed });
            
          }
      });
    }
    
    for (let i = 0; i < taggedUser.length; i++) {
        if (taggedUser[i].bot === true) { // checks if user is attempting to nep a bot
            return message.channel.send(`Bots don't get Nep-Notes...`, {files: ['https://i.imgur.com/62CyJO5.gif']});
        }
      }
    
 
    if (message.mentions.users.size > 1) { // limits the amount of users that can be nep'd at once
            return message.channel.send(`I can only grab a single Nep-Note!`);
          } else if (message.mentions.everyone === true || message.mentions.here === true) { // checks if the arguments for command are either EVERYONE or HERE.
            return message.channel.send(`Are you trying to damage the Nep-Notes!`);
          } else if (message.mentions.users.size === 0 && message.author) {
            taggedUser[0] = message.author;// checks to see if user is trying to nep theirself
            return profileLookup(message.author.id);
          } else if (message.mentions.users.size === 1) { // checks the amount of users being mentioned to assign proper response.
            profileLookup(taggedUser[0].id);
            return message.channel.send(`Here is ${taggedUser[0]}' Nep-Note!`);
          }
    
    
  }
};