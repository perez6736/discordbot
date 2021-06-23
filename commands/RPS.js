const Discord = require('discord.js');

var RPSgames = {}

function isRPSgameActive(gamesList, authorID){
  authorID = authorID.toString();
  if(gamesList[authorID]){ //take advantage of the hashmap you loser (i had a for loop here.....)
    return true;
  }
  else {
    return false;
  }
}

class newrps{
    constructor(){
        this.player1ID = "",
        this.player2ID = "",
        this.playersSelection = ""
        this.computerSelection = Math.floor((Math.random() * 3) + 1);
        this.selectionsList = [":rock:", ":roll_of_paper:", ":scissors:"]
        this.gameChannel = ""
        this.results = {
            winner: "",
            loser: "",
            winnerSelection: "",
            loserSelection: "",
            isTie: false
        }
    }

    setSelection(selection){
        this.player1Selection = selection;
    }
    setPlayer1(id){
        this.player1ID = id;
    }
    setPlayer2(id){
        this.player1ID = id;
    }

    runGame(){
        // can do if to see if 1 or two player game and act according. 
        return this.game(this.player1Selection, this.computerSelection); // this i if one payer. 
    }

    game(playersSelection, computerSelection){
        this.results.computerSelection = this.selectionsList[this.computerSelection];

        if(playersSelection === "rock"){
            playersSelection = 1;
            return this.whoWon(playersSelection, computerSelection);
        }
        else if(playersSelection === "paper"){
            playersSelection = 2;
            return this.whoWon(playersSelection, computerSelection);
        }
        else if(playersSelection === "scissors"){
            playersSelection = 3;
            return this.whoWon(playersSelection, computerSelection);
        }
        else {
            return "something went wrong where it shouldnt have."
        }
    }

    checkwin(player1, player2){ //changing numbers to the strings would make it reabable.
        if (player1 === 1 && player2 === 3){
            return true
        }
        else if (player1 === 2 && player2 === 1){
            return true
        }
        else if (player1 === 3 && player2 === 2){
            return true
        }
        else if (player1 === player2){
            return false
        }
    }
    whoWon (player, computer){
        let didPlayerwin = this.checkwin(player, computer)
        let didComputerwin = this.checkwin(computer, player)
        
        if(didPlayerwin){
            this.results.winnerSelection = this.selectionsList[player-1]
            this.results.loserSelection = this.selectionsList[this.computerSelection-1]
            this.results.winner = `<@${this.player1ID}>`
            this.results.loser = "Computer"
            return this.results;
        }
        else if (didComputerwin){
            this.results.winnerSelection = this.selectionsList[player-1]
            this.results.loserSelection = this.selectionsList[this.computerSelection-1]
            this.results.winner = "Computer"
            this.results.loser = `<@${this.player1ID}>`
            return this.results;
        }
        else{            
            this.results.winnerSelection = this.selectionsList[player-1]
            this.results.loserSelection = this.selectionsList[this.computerSelection-1]
            this.results.winner = "TIE"
            this.results.loser = "TIE"
            this.results.isTie = true;
            return this.results;
        }
    }

    isProperGameSelection(usersCommand){
        if(usersCommand === "rock" || usersCommand === "paper" || usersCommand === "scissors"){
          return true
        }
        else {
          return false
        }
    }

    isRPSgameActive(gamesList, authorID){
        authorID = authorID.toString();
        if(gamesList[authorID]){ //take advantage of the hashmap you loser (i had a for loop here.....)
            return true;
        }
        else {
            return false;
        }
    }
}
        
module.exports = newrps;
module.exports.run = async (client, msg, args) => {

    // need to save the channel to the game. 
    if(!isRPSgameActive(RPSgames, msg.author.id)){
        var rpsgame = new newrps();
        RPSgames[msg.author.id] = rpsgame; //add it to hashmap 
        rpsgame.gameChannel = msg.channel;
        msg.reply("Game start - pick rock paper or scissors.")
    }
    else{
        msg.reply("you already started a game - pick rock paper or scissors cunt.")
    }
}
module.exports.help = {
    name: "change this later. rps"
}
module.exports.checkForGame = isRPSgameActive;
            

        

        
