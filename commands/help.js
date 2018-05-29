module.exports = {
    name: 'help',
    description: 'Summary of all commmands and how to use them',
    execute(message, args) {
        message.author.send(`
The folowing commands are available in NepBot
\`\`\`
nep                nep
nep'd <user>       USE THIS COMMAND AND TOTALLY NEP YOUR FRIENDS!
quote <character>  Returns a random quote of a character specified by user.
ping               pong?
avatar <user>      Will display the avatar of a given user or yourself.
help               This.
haha               hahahahahahaha
lewd               Oh my...
nepgya!            Nepgya things.
\`\`\`
`);
     
    },
};

