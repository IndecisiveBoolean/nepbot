module.exports = {
    name: 'lewd',
    description: 'oh my how lewd...',
    execute(message, args) {
      const images = ['https://i.imgur.com/9Ho8EEW.gif',
                     'https://i.imgur.com/hN2oo9S.gif',
                     'https://i.imgur.com/UPbR5ef.gif',
                     'https://i.imgur.com/HtW78Bt.png']
      
        let randomImage = images[Math.floor(Math.random() * images.length)];
        message.channel.send({files: [randomImage]});
    },
};