const db = require('../index.js');
const userCollection = require('../index.js');

module.exports = {
  name: 'leaderboard',
  description: 'Queries the database for message author\'s profile and sends an embed containing that information in chat.',
  execute(message, args) {
    const username = message.author.username;
    const ID = message.author.id.toString();
    const userRankArr = []
    db.userCollection.find( {"levelInfo.level": {$gt: 0}} ).sort({"levelInfo.level" : -1}).limit(5).toArray() // Checks for presence of document for User's profile.
      .then((doc) => {
          
//            let userRankArr = []            
//            for (let x = 0; x < doc.length; x++) {
//              userRankArr.push(doc[x]);
//            }
//            console.log(userRankArr);
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
  }
};