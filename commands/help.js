module.exports = {
    name: 'help',
    description: 'Summary of all commmands and how to use them',
    execute(message, args) {
        message.author.send(`
The folowing commands are available in NepBot
\`\`\`
avatar <user>      Will display the avatar of a given user or yourself.
bugs               Will post an up to date list of known bugs.
haha               hahahahahahaha
help               This.
lewd               Oh my...
nep                nep
nep'd <user>       USE THIS COMMAND AND TOTALLY NEP YOUR FRIENDS!
nepgya!            Nepgya things.
nosad              Please don't be sad.
ping               pong?
quote <character>  Returns a random quote of a character specified by user.

--------NO PREFIX REQUIRED--------

Bad bot!           For yelling at NepBot if something doesn't work.

----------------------------------
\`\`\`
**You can check in on current progress, bugs, and focus in NepBot's development here.**
<https://trello.com/b/nHqpnFmL>
`, {files: ['https://i.imgur.com/0X3J7Ue.png']}); 
      
     
    },
};

