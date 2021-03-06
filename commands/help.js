
// Sends a Direct Message to the message author with a formatted list of current commands.

module.exports = {
    name: 'help',
    description: 'Summary of all commmands and how to use them',
    execute(message, args) {
        message.author.send(`
The folowing commands are available in NepBot
\`\`\`
bugs               Will post an up to date list of known bugs.
ha                 hahahahahahaha
help               This.
lewd               Oh my...
nep                nep
nep'd <user>       USE THIS COMMAND AND TOTALLY NEP YOUR FRIENDS!
nepgya!            Nepgya challenge!
anti-sad           Please don't be sad.
ping               pong, or something greater?

------USER FOCUSED COMMANDS------

create             Creates a Nep-Note (profile) for you!
nepnote <user>     Displays the given user's Nep-Note in chat or your own if argument left empty!
bonus              Get some free Nep-Coins every 24 hours!
leaderboard        See the top 5 users by level <n+leaderboard level>, by Nep-Coin <n+leaderboard nepcoin>, or by total commands used with <n+leaderboard commands>!
description        Set a custom description in your Nep-Note.
avatar <user>      Will display the avatar of a given user or yourself if argument left empty.

----------------------------------

--------NO PREFIX REQUIRED--------

Bad bot!           For yelling at NepBot if something doesn't work.

----------------------------------
\`\`\`
**You can check in on current progress, bugs, and focus in NepBot's development here.**
<https://trello.com/b/nHqpnFmL>
`, {files: ['https://i.imgur.com/kwBDtqc.png']}); 
    },
};