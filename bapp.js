const Discord = require("discord.js"); 

const { config } = require("./config.json"); 

const Client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MEMBERS"],
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]
});

Client.on("ready", (client) => {
    console.log(client.user.tag + " is now online!");
});

Client.on("messageCreate", (message) => {
    let userInput = message.content.toLowerCase();
    
    if (message.author.bot == false && userInput == "!hey"){
        message.reply("hi there!");
    }
});

Client.on("guildMemberAdd", (guildMember) => {
    if (guildMember.user.bot == false){
        guildMember.send("Welcome to the server!");
    }

    guildMember.guild.channels.fetch("934414515167170645").then(channel => 
        channel.send("Welcome to the server! <@" + guildMember.id + ">")).catch(console.error);

    guildMember.guild.channels.fetch("951951720311820299").then(channel => 
        channel.send(guildMember.user.tag + " Joined this server. Date & Time " + new Date(guildMember.joinedTimestamp)))
        .catch(console.error);


});

Client.login(config); 