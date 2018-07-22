const db = require('../index.js');
const userCollection = require('../index.js');

module.exports = {
  name: 'nepnote',
  description: 'Queries the database for message author\'s profile and sends an embed containing that information in chat.',
  execute(message, args) {
    const username = message.author.username;
    const ID = message.author.id.toString();

    db.userCollection.findOne({userID: ID}) // Checks for presence of document for User's profile.
      .then((doc) => {
        if (!doc) {
        message.channel.send("I couldn't find your Nep-Note. Use the **createprofile** command to have one created.");
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
              "title":  `${message.member.displayName}'s Nep-Note`,//Represents the author of the message as a guild member.
              "description": "nep nep description placeholder",
              "url": "https://discordapp.com",
              "color": 10453245,
              "footer": {
                "text": "nep nep nep nep"
              },
              "thumbnail": {
                "url": `${message.author.displayAvatarURL}`
              },
              "fields": [
                {
                  "name": "Stats:",
                  "value": `Level: ${doc.levelInfo.level}\nNep-Coins: ${doc.nepcoin}\nCommands Used: ${doc.globalCommandTracker}\nEXP: ${doc.levelInfo.experience}`,
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
};