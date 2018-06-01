const talkedRecently = new Set();
module.exports = {
    name: 'nep',
    description: 'nep',
    execute(message, args) {
      
      if (talkedRecently.has(message.author.id)) {
            message.channel.send("Wait a short while before further neps.. - " + message.author);
    } else {
      
      const choice = Math.floor((Math.random() * 5000) + 1);
      
      if (choice >= 2000) {
        const images = ['https://i.imgur.com/XjN1U9h.png',
                        'https://i.imgur.com/EnGIqhM.png',
                        'https://i.imgur.com/Nj4outz.jpg',
                        'https://i.imgur.com/YklWdWl.png',
                        'https://i.imgur.com/MXlymBw.png',
                        'https://i.imgur.com/JTMxLo9.gif']
        
        const randomImage = images[Math.floor(Math.random() * images.length)];
        message.channel.send("NEP", {files: [randomImage]});
        
      } else if (choice <= 1998) {
        const images = ['https://i.imgur.com/LHpQjE8.png',
                        'https://i.imgur.com/2cpmrEp.png'
                        ]
        
        
        const randomImage = images[Math.floor(Math.random() * images.length)];
        message.channel.send("**NEPUGYAAAAAAAAAAAAAA**", {files: [randomImage]});  
      } else if (choice === 1999) {
        message.channel.send("This NEP only has a 1/5000 chance of appearing!", {files: ['https://i.imgur.com/Jonu9ft.png']});           
      } else {};
           // the user can type the command ... your command code goes here :)

        // Adds the user to the set so that they can't talk for a minute
        talkedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(message.author.id);
        }, 7000);
      } 
    },
};