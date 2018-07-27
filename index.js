// ================================= DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.

const fs = require('fs');
// require the discord.js module
const Discord = require('discord.js');

const {prefix, token, dbConnectURI} = require('./hConfig.js');
const talkedRecently = new Set();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

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
    client.user.setActivity('n+help [Version 0.0.7]');

  // SETS AND ESTABLISHES A CONNECTION WITH THE MONGODB SERVER
    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');
  
    // Connection URL for DB
    const url = `${dbConnectURI}`;

    // Database Name
    const dbName = 'heroku_czjqnz16';

    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      console.log("Connected successfully to server");
      
      // Creates a module that allows access to database in commands.
      const db = client.db(dbName);
      module.exports.db = db;
      const userCollection = db.collection('users');
      module.exports.userCollection = db.collection('users');
      
    });
});

client.on('message', message => {
  const db = require('./index.js');
  const userCollection = require('./index.js');
  const ID = message.author.id.toString();

  if (message.content === "Bad bot!" && !message.author.bot) {
      
      if (choice > 6) {
        const images = ['https://i.imgur.com/DdcreHl.gif',
                        'https://i.imgur.com/gmKg3RJ.gif']
        
        const randomImage = images[Math.floor(Math.random() * images.length)];
        message.channel.send({files: [randomImage]});
      } else {
        return;
      } 
  }
  
// CURRENCY AND LEVEL SYSTEM

  function activeCurrencyIncrease() {
    let currencyAddSelect = Math.floor((Math.random() * 6) + 1);
    
    db.userCollection.findOne({userID: ID})
      .then((doc) => {
      if (!doc) {
        return;
      } else {
         db.userCollection.update(
              {userID: ID},
              {$inc: {nepcoin: + currencyAddSelect} });
      }
    });
  };
  
  function passiveUserXPIncrease() {
    //Limits the amount of XP a user can get per message.
    let xpAdd = Math.min(Math.max(parseInt(message.content.length), 1), 10);
    db.userCollection.findOne({userID: ID})
      .then((doc) => {
      // Checks for presence of document containing user's profile. If no document is found create one.
        if (!doc) {
          // If no document matching the user is found return.
          return;
          } else {
            // Determines the next level based on the user's current experience by taking the square root of the total experience and multiplying it by 0.1 then flooring it to a round number. e.g. 400xp = level 2.
            const levelUpCalc = Math.floor(0.1 * Math.sqrt(doc.levelInfo.experience) );
            //Updates the experience field with the xp user gained in their message.
            db.userCollection.update(
              {userID: ID},
              {$inc: {"levelInfo.experience": + xpAdd} });
            //If user level is lower than the nextLevel variable's value, increase user level +1. (NOT THE NEXTLEVEL FIELD'S VALUE BUT THE CURRENT VALUE OF THE nextLevel VARIABLE!)
            if (doc.levelInfo.level < levelUpCalc) {
              //Displays proper level in chat alert upon new level being reached. Without the alert is off by -1 and instead displays the user's previous level.
              let properLevelDisplay = doc.levelInfo.level + 1;
              //Updates the level field by +1.
              db.userCollection.update(
                {userID: ID},
                {$inc: {"levelInfo.level": + 1} })
                //Sends message in chat alerting message author of level up.
                message.channel.send(`${message.author} is now level ${properLevelDisplay}`);
                //Updates the nextLevel field with the nextLevel properties's current value.
                db.userCollection.update(
                {userID: ID},
                {$inc: {"levelInfo.nextlevel": + 1} }) 
            }
          }
      });
    };
      if (!message.author.bot) {
          passiveUserXPIncrease();
      };
  
  function commandUseCount() { // Is called on proper command use and increments the globalCommandTracker by +1 to track a user's total command use count.
              const username = message.author.username;
              const ID = message.author.id.toString();

              db.userCollection.update(
                {userID: ID},
                {$inc: {globalCommandTracker: + 1} })
            };
  
// \CURRENCY AND LEVEL SYSTEM

      if (!message.content.startsWith(prefix) || message.author.bot) return; // Checks if message begins with prefix or is bot message.
  
          // Converts the message content to lowercase > removes prefix and returns string > remove spaces > splits string into new array > global search for matches of ARGS.
          const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/g);
          const command = args.shift().toLowerCase(); // Uses the first index positioned item in args for command > to lower case.
          const createPropByCommand = `commanduse.${command}`; // Used to create the proper property/key in the commanduse object on a user's profile, or increments the property/key's value by + 1 if exists and command is used.     
  
        if (!client.commands.has(command)) return; // If no command exists return.

        try {
          if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait a short while before using another command." + message.author);
          } else {
            client.commands.get(command).execute(message, args);
            commandUseCount();
            activeCurrencyIncrease();
            // Uses the string literal value in the createPropByCommand variable to get the proper command name.
            db.userCollection.update(
                {userID: ID},
                {$inc: {[createPropByCommand]: + 1} });
            
            talkedRecently.add(message.author.id);
            setTimeout(() => {
              // Removes the user from the set after 5 seconds
              talkedRecently.delete(message.author.id);
            }, 5000);
          }
        }
        catch (error) {
          console.error(error);
          message.reply('there was an error trying to execute that command!');
        }
});
client.login(token);