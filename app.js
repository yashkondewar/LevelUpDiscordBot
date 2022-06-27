const Discord = require("discord.js"); 

const { config } = require("./config.json"); 

const Client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MEMBERS"],
    partials: ["CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "USER"]
});

const fs = require("fs"); 
const levelsArray = [3, 6, 9, 12, 15, 1000]; 

function returnData(url, encoding){ return JSON.parse(fs.readFileSync(url, encoding)); }

function writeData(url, data) { fs.writeFileSync(url, JSON.stringify(data)); }

Client.on("ready", (client) => {
    console.log(client.user.tag + " is now online!");
});

Client.on("messageCreate", (message) => {
    let userInput = message.content.toLowerCase();
    
    if (message.author.bot == false && userInput != "!level"){
        let data = returnData("./level.json", "utf-8"); 
        
        if (data == undefined){ console.log("data is undefined."); return; } 

        if (data.length > 0) {
            let found = false; 
            
            for (let i = 0; i < data.length; i++){
                if (message.author.id == data[i].userID){
                    found = true; 
                    data[i].exp++; 
                    writeData("./level.json", data); 
                    i = data.length; 
                }
            }
            if (found == false){
               
                const newUser = {
                    "userID" : message.author.id,
                    "exp" : 1
                }
                
                data.push(newUser); 
                writeData("./level.json", data); 
            }
        }

        else if (data.length <= 0) {
            const newUser = {
                "userID" : message.author.id,
                "exp" : 1
            }
    
            data = [newUser]; 
            writeData("./level.json", data); 
        }
    }
    
    else if (message.author.bot == false && userInput == "!level"){
        const data = returnData("./level.json", "utf-8"); 

        for (i = 0; i < data.length; i++){
            if (message.author.id == data[i].userID){
                for (let j = 0; j < levelsArray.length; j++){
                    if (data[i].exp < levelsArray[j]){
                        message.reply("Your level is " + ++j); 
                        return; 
                    }
                }
            }
        }
    }
});

Client.on("guildMemberAdd", (guildMember) => {
    if (guildMember.user.bot == false){
        guildMember.send("Welcome to the server!");
    }

    guildMember.guild.channels.fetch("981855455204749313").then(channel => 
        channel.send("Welcome to the server! <@" + guildMember.id + ">")).catch(console.error);

    guildMember.guild.channels.fetch("982141116071698442").then(channel => 
        channel.send(guildMember.user.tag + " Joined this server. Date & Time " + new Date(guildMember.joinedTimestamp)))
        .catch(console.error);
});

Client.login(config); 

//  text channel ID: 981855455204749313
//  admin channel ID: 982141116071698442