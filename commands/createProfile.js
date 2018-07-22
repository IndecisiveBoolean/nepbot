const userRaw = [] // Array literal to hold the user profile created when command is used
const db = require('../index.js');
const userCollection = require('../index.js');

module.exports = {
    name: 'create',
    description: 'Create your profile',
    execute(message, args) {
const username = message.author.username;
const ID = message.author.id;
      
db.userCollection.findOne({userID: ID})// Checks for presence of document containing user's profile. If no document is found create one.
      .then((doc) => {
        if (!doc) {
        message.channel.send("Your personal Nep-Note has been created!");
          const userObj = { // Object used to create the document user profile. INDIVIDUAL COMMAND TRACKING IS ADDED IF NON-EXISTENT IN COMMAND'S FILE.
            userID: ID,
            name: username,
            nepcoin: 0,
            levelInfo: {
            level: 0,
            experience: 140,
            nextlevel: 1,
            },
            globalCommandTracker: 0,
            commanduse: {}
                  }
            userRaw.push(userObj); // Pushes the entire userObj to the userRaw variable
            db.userCollection.insert(userRaw); // Inserts the value of userRaw into the db as a new document.
          } else {
            message.channel.send("You already have a Nep-Note!");
          }
      });
    },
};
