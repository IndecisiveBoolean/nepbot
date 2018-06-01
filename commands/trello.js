const {trelloKey, trelloToken} = require('../hConfig.js');

module.exports = {
    name: 'bugs',
    description: 'gets the current status of the BUGS list on NepBot\'s Trello and posts a list in chat',
    execute(message, args) {
      const Trello = require("node-trello");
      let bugList = ``;
      let result;
      
      const t = new Trello(trelloKey, trelloToken);

      // URL arguments are passed in as an object. Gets all card objects within the list chosen by ID
      t.get("/1/lists/5b0c5f5456088449ebdec5b2/cards", { cards: "open" }, function(err, data) {
        if (err) throw err;
        result = data.map(a => a.name);// maps over the entire data array returning the .name property. Text content of the cards in the LIST selected above.
        
        if (!result.length) {// if there are zero cards in the LIST selected above send this message.
          message.channel.send(`There are currently no bugs in the **BUGS** list on my Trello!`, {files: ['https://i.imgur.com/P84BV9y.png']});
        } else {
          for (let i = 0; i < result.length; i++) {// loops over the entire RESULTS array and returns each item to be assigned to bugList on seperate lines.
          bugList += `\`${result[i]}\`\n`;
          }// send the below string, line break and then the value of bugList is posted on each subsequent line.
          message.channel.send(`These are the current bugs I am aware of.\n${bugList}`);
          }
        
      });
    },
};
