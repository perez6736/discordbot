const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config");
const fs = require('fs')
const botconfig = require("./botconfig");
const cilo = require("./commands/cilo.js");
const RPS = require('./commands/RPS.js');
const { prefix } = require('./botconfig');

client.commands = new Discord.Collection();
fs.readdir("./commands", (err, files) => {
  if(err) console.log(err);

  // chekc to see if its a js file. 
  let jsFiles = files.filter(file => file.split(".").pop() === "js");
  if(jsFiles.length <= 0){ //if no js files return. 
    console.log("no js files");
    return; 
  }
  console.log(`loading ${jsFiles.length} commands!`);

  jsFiles.forEach((file, i) => {
    let props = require(`./commands/${file}`);  
    client.commands.set(props.help.name, props);
  });
})

// var RPSgames = {}

// // this stays here. 
// function isRPSgameActive(gamesList, authorID){
//   authorID = authorID.toString();
//   if(gamesList[authorID]){ //take advantage of the hashmap you loser (i had a for loop here.....)
//     return true;
//   }
//   else {
//     return false;
//   }
// }

client.login(config.TOKEN);// put bot token there. 

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(client.commands)
    console.log(client.commands.get("change this later. rps"));
  });
   
client.on('message', msg => {
  let messageArray = msg.content.split(" ");
  let command = messageArray[0];
  let args = messageArray.slice(1); // is an array of strings.
  let channel = msg.channel;
  let authorID = msg.author.id// we have to make sure its a string to prevent bugs - js sucks

  if(msg.author.bot) return; //we dont want to listen to bots 
  if(msg.channel.type === "dm") return; //this bot wont listen to dms. 

  let cmd = client.commands.get(command.slice(prefix.length)); //get whatever the user typed from commands collection
  if(cmd) cmd.run(client, msg, args);

 // this if statement needs to go to rps file... but rps file needs to run if rock paper or scissors is hit. 
 // need to see if a game has started and then run the cmd and pass the selection as a param.
  if(isRPSgameActive(RPSgames, msg.author.id) && RPSgames[msg.author.id].isProperGameSelection(command) && channel === RPSgames[authorID].gameChannel){
    RPSgames[authorID].setSelection(command);
    RPSgames[authorID].setPlayer1(authorID);
    // need to change this to make it a embed. 

    let results = RPSgames[authorID].runGame();
    if(!results.isTie){
      let embededResults = new Discord.MessageEmbed()
      .setTitle(` - Rock Paper Scissors - `)
      .addFields(
        {name: "Winner", value: `${results.winner}`},
        {name: "Loser", value: `${results.loser}`},
        {name: "Result", value: `${results.winnerSelection} beats ${results.loserSelection}`}
      )
      msg.channel.send(embededResults);
    }
    else{
      let embededResults = new Discord.MessageEmbed()
      .setTitle(` - Rock Paper Scissors - `)
      .addFields(
        {name: "Tie", value: `Tie`},
        {name: "Result", value: `${results.winnerSelection} and ${results.loserSelection}`}
      )
      msg.channel.send(embededResults);
    }

    delete RPSgames[msg.author.id];
  }
  else if(isRPSgameActive(RPSgames, msg.author.id) && !RPSgames[msg.author.id].isProperGameSelection(command) && command != "!rps" && channel === RPSgames[authorID].gameChannel){ //need to code rps here
      let weirdResponse = ["pick something stupid", "this guy never played rock papers scissors", "BAP PICK", "can you spell? pick something."]
      msg.reply(weirdResponse[Math.floor((Math.random() * weirdResponse.length))]);
  }

  
  if(!msg.content.startsWith(botconfig.prefix)) return; //if content doesnt start with prefix we ignore.
  

  //rps game 
  else if (command === "!rps"){
    // need to save the channel to the game. 
    if(!isRPSgameActive(RPSgames, msg.author.id)){
      var rpsgame = new RPS()
      RPSgames[msg.author.id] = rpsgame; //add it to hashmap 
      rpsgame.gameChannel = channel;
      msg.reply("Game start - pick rock paper or scissors.")
    }
    else{
      msg.reply("you already started a game - pick rock paper or scissors cunt.")
    }
  }
});
   
