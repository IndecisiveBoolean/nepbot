const db = require('../index.js');
const userCollection = require('../index.js');

module.exports = {
  name: 'leaderboard',
  description: 'Queries the database for message author\'s profile and sends an embed containing that information in chat.',
  execute(message, args) {
    const username = message.author.username;
    const ID = message.author.id.toString();
    let leaderboardType = ``;
    if (args == "level") {
      db.userCollection.find( {"levelInfo.level": {$gt: 0}} ).sort({"levelInfo.level" : -1}).limit(5).toArray() // Checks for presence of document for User's profile.
      .then((doc) => {
            const embed = { // A Discord embed that contains the unique information of the user's profile.
              "title":  `Leaderboard for this server!`,//Represents the author of the message as a guild member.
              "color": 10453245,
              "fields": [
                {
                  "name": "Top 5 users!",
                  "value": `1: (${doc[0].name} - Level ${doc[0].levelInfo.level})\n2: (${doc[1].name} - Level ${doc[1].levelInfo.level})\n3: (${doc[2].name} - Level ${doc[2].levelInfo.level})\n4: (${doc[3].name} - Level ${doc[3].levelInfo.level})\n5: (${doc[4].name} - Level ${doc[4].levelInfo.level})`,
                  "inline": true
                }
              ]
            };
            message.channel.send({ embed });
      });
    } else if (args == "nepcoin") {

      db.userCollection.find( {nepcoin: {$gt: 0}} ).sort({nepcoin : -1}).limit(5).toArray() // Checks for presence of document for User's profile.
      .then((doc) => {
            const embed = { // A Discord embed that contains the unique information of the user's profile.
              "title":  `Leaderboard for this server!`,//Represents the author of the message as a guild member.
              "color": 10453245,
              "fields": [
                {
                  "name": "Top 5 users by amount of Nep-Coins!",
                  "value": `1: (${doc[0].name} - ${doc[0].nepcoin} Nep-Coins)\n2: (${doc[1].name} - ${doc[1].nepcoin} Nep-Coins)\n3: (${doc[2].name} - ${doc[2].nepcoin} Nep-Coins)\n4: (${doc[3].name} - ${doc[3].nepcoin} Nep-Coins)\n5: (${doc[4].name} - ${doc[4].nepcoin} Nep-Coins)`,
                  "inline": true
                }
              ]
            };
            message.channel.send({ embed });
      });
    } else if (args == "commands") {
      db.userCollection.find( {globalCommandTracker: {$gt: 0}} ).sort({globalCommandTracker : -1}).limit(5).toArray() // Checks for presence of document for User's profile.
      .then((doc) => {
            const embed = { // A Discord embed that contains the unique information of the user's profile.
              "title":  `Leaderboard for this server!`,//Represents the author of the message as a guild member.
              "color": 10453245,
              "fields": [
                {
                  "name": "Top 5 users by commands used in total!",
                  "value": `1: (${doc[0].name} - Used ${doc[0].globalCommandTracker} Commands)\n2: (${doc[1].name} - Used ${doc[1].globalCommandTracker} Commands)\n3: (${doc[2].name} - Used ${doc[2].globalCommandTracker} Commands)\n4: (${doc[3].name} - Used ${doc[3].globalCommandTracker} Commands)\n5: (${doc[4].name} - Used ${doc[4].globalCommandTracker} Commands)`,
                  "inline": true
                }
              ]
            };
            message.channel.send({ embed });
      });
    }
  }
};