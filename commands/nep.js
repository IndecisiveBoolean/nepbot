module.exports = {
    name: 'nep',
    description: 'nep',
    execute(message, args) {      
      const choice = Math.floor((Math.random() * 100) + 1);
      
      if (choice >= 51) {
        message.channel.send("NEP", {files: ['https://i.imgur.com/JTMxLo9.gif']});
      } else if (choice <= 50) {
        const images = ["https://i.imgur.com/LHpQjE8.png",
                     "https://i.imgur.com/2cpmrEp.png"
                     ]
        const randomImage = images[Math.floor(Math.random() * images.length)];
        message.channel.send("**NEPUGYAAAAAAAAAAAAAA**", {files: [randomImage]});  
      }
    },
};