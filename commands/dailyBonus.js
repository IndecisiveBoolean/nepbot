const dailyCheck = new Set(); // Where a user's unique ID is stored if they've used the daily bonus command for nep-coins.
const db = require('../index.js');
const userCollection = require('../index.js');

module.exports = {
  name: 'bonus',
  description: 'Queries the database for message author\'s profile and sends an embed containing that information in chat.',
  execute(message, args) {
    const username = message.author.username;
    const ID = message.author.id.toString();

    db.userCollection.findOne({userID: ID}) // Checks for presence of document for User's profile.
      .then((doc) => {
        if (!doc) {
        message.channel.send("I couldn't find your Nep-Note so I can't give you free Nep-Coins. Use the **create** command to have one created.");
          } else {
            if (dailyCheck.has(message.author.id)) {
              message.channel.send("You've already used your daily! Check back in 24 hours.");
            } else {
              dailyCheck.add(message.author.id);
              setTimeout(() => {
                // Removes the user from dailyCheck after 24 hours.
                dailyCheck.delete(message.author.id);
              }, 86400);
              
              db.userCollection.update(
                {userID: ID},
                {$inc: {nepcoin: + 25} }).then((doc) => {
                message.channel.send("I've added 25 Nep-Coins to your Nep-Note!");
              }).catch((error) => {
                console.log(error);
              });
            }
          }
      });
  }
};