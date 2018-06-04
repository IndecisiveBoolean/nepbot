module.exports = {
    name: 'nosad',
    description: 'Please stop being sad...',
    execute(message, args) {
       const images = ['https://i.imgur.com/oWq62Yy.png',
                       'https://i.imgur.com/Qa7S6eP.png',
                       'https://i.imgur.com/ItMih1m.gif']
        
        const randomImage = images[Math.floor(Math.random() * images.length)];
        message.channel.send({files: [randomImage]});
    },
};