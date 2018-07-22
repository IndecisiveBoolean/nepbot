module.exports = {
    name: 'nep',
    description: 'nep',
    execute(message, args) {
      const choice = Math.floor((Math.random() * 2000) + 1);
      
      if (choice >= 400) {
        const images = ['https://i.imgur.com/XjN1U9h.png',
                        'https://i.imgur.com/EnGIqhM.png',
                        'https://i.imgur.com/Nj4outz.jpg',
                        'https://i.imgur.com/YklWdWl.png',
                        'https://i.imgur.com/MXlymBw.png',
                        'https://i.imgur.com/JTMxLo9.gif',
                        'https://i.imgur.com/Y7oNB0I.png',
                        'https://i.imgur.com/bjR3lAS.png',
                        'https://i.imgur.com/T6GBjCM.png',
                        'https://i.imgur.com/MmeuWf5.png',
                        'https://i.imgur.com/kniPFH5.png']
        
        const randomImage = images[Math.floor(Math.random() * images.length)];
        message.channel.send("NEP", {files: [randomImage]});
      } else if (choice <= 398) {
        const images = ['https://i.imgur.com/LHpQjE8.png',
                        'https://i.imgur.com/2cpmrEp.png'
                        ]
        
        const randomImage = images[Math.floor(Math.random() * images.length)];
        message.channel.send("**NEPUGYAAAAAAAAAAAAAA**", {files: [randomImage]});
      } else if (choice === 399) {
        message.channel.send("This NEP only has a 1/2000 chance of appearing!", {files: ['https://i.imgur.com/2rT6Xkz.png']});
      } else {};
    }
};