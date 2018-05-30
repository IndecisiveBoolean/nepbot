const talkedRecently = new Set();// sets cooldown
module.exports = {
    name: 'nep\'d',
    description: 'USE THIS COMMAND AND TOTALLY NEP YOUR FRIENDS!',
    execute(message, args) {
      
       if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait 1 minute before nepping someone again. - " + message.author);
    } else {
      
      const images = ['https://i.imgur.com/m9BtfFb.jpg',
                       'https://i.imgur.com/Y5YNFVD.png',
                       'https://i.imgur.com/Zsd3Mk4.png',
                       'https://i.imgur.com/oLvjrjR.jpg'
                       ]
      
      const taggedUser = message.mentions.users.array();
      let randomImage = images[Math.floor(Math.random() * images.length)];
      
      for (let i = 0; i < taggedUser.length; i++) {
        if (taggedUser[i].bot === true) { // checks if user is attempting to nep a bot
            return message.channel.send(`I...I'm only supposed to NEP users...`, {files: ['https://i.imgur.com/62CyJO5.gif']});
        }
      }
      
      //deletes message of the user who initiates the nep'd command. Only deletes the message on singular and multi-nep. DOES NOT DELETE MESSAGES ON OTHER CONDITIONS!
      function prevMsgDelete() {
        message.delete([50])
              .then(msg => console.log(`Deleted message from ${msg.author.username}`))
              .catch(console.error);
      };
      
      if (message.mentions.users.size >= 5) { // limits the amount of users that can be nep'd at once
            return message.channel.send(`I can't NEP that many people! It's dangerous!`);
          } else if (message.mentions.everyone === true || message.mentions.here === true) { // checks if the arguments for command are either EVERYONE or HERE.
            return message.channel.send(`That's too many people to NEP!`);
          } else if (taggedUser[0] === message.author) { // checks to see if user is trying to nep theirself
            return message.channel.send(`You'd like that, wouldn't you.`, {files:[`https://i.imgur.com/rydjyiP.jpg`]});
          } else if (message.mentions.users.size >= 2) { // checks the amount of users being mentioned to assign proper response.
            prevMsgDelete();
            return message.channel.send(`OH SHIT ${taggedUser}, YOU FRICCIN MORONS, YOU JUST GOT NEP\'D!`, {files: [randomImage]});
          } else if (message.mentions.users.size === 0) { // checks if the arguments for user is === 0/none
            return message.channel.send(`I can't NEP the air...`);
          } else {
            let randomImage = images[Math.floor(Math.random() * images.length)];
            message.channel.send(`OH SHIT ${taggedUser}, YOU FRICCIN MORON, YOU JUST GOT NEP\'D!`, {files: [randomImage]});
            prevMsgDelete();
          };
      
           // the user can type the command ... your command code goes here :)

        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 60000);
      }
      
    },
};