var Chance = require('chance');
var chance = new Chance();
const Discord = require('discord.js');

module.exports.run = async (client, msg, args) => {
  let game = cilo(); 
  let embededResults = new Discord.MessageEmbed()
  .setTitle(` :game_die: 3 Dice CiLo :game_die: `)
  .addFields(
    {name: "Dice 1", value: `${game.dice1}`},
    {name: "Dice 2", value: `${game.dice2}`},
    {name: "Dice 3", value: `${game.dice3}`},
    {name: "Score", value: `${game.score}`},
  )

  msg.reply(embededResults)
}

module.exports.help = {
  name: "cilo"
}

// three dice cilo game -
const cilo = function threeDiceCiLo (){

  var score;
  //when some one says  /ci-lo we need to roll three six sided dice
  var diceRoll = chance.rpg('3d6');
  var diceRoll1 = diceRoll[0];
  var diceRoll2 = diceRoll[1];
  var diceRoll3 = diceRoll[2]; 
  // sort the array
  var sortedDiceRoll = diceRoll.sort(function(a, b){return a - b});
  var results = {
    dice1: sortedDiceRoll[0],
    dice2: sortedDiceRoll[1],
    dice3: sortedDiceRoll[2],
    score: ""
  }

  // console.log("The dice roll was: " + diceRoll); 
  // console.log("sorted version: " + sortedDiceRoll);

  // check to see if a 456 was rolled. 
  if(sortedDiceRoll[0] === 4 && sortedDiceRoll[1] === 5 && sortedDiceRoll[2] === 6){
    // console.log("you rolled a 456");
    results.score = "4 5 6"
    //return diceRoll1 + " " + diceRoll2 + " " + diceRoll3 +  " - 4 5 6 .. You Win"
    return results
  }

  // check to see if trips were rolled. 
  if(sortedDiceRoll[0] === sortedDiceRoll[1] && sortedDiceRoll[0] === sortedDiceRoll[2]){
    // console.log("you rolled trips of " + sortedDiceRoll[0]); 
    results.score = `trip ${sortedDiceRoll[0]}`
    //return diceRoll1 + " " + diceRoll2 + " " + diceRoll3 + " - You rolled trips of " + sortedDiceRoll[0]
    return results
  }

  // check to see if a 123 was rolled. 
  if(sortedDiceRoll[0] === 1 && sortedDiceRoll[1] === 2 && sortedDiceRoll[2] === 3){
    results.score = "1 2 3"
    //return diceRoll1 + " " + diceRoll2 + " " + diceRoll3 +  " - 1 2 3 .. You Lost"
    return results
  }

  //  The most efficient way is to sort first, then find if any two adjacent elements are equal:
  for (i=0; i<sortedDiceRoll.length; i++){
    if (sortedDiceRoll[i] === sortedDiceRoll[i+1]){
      // there was a pair --- we already checked for triples above 

      if(i === 0){
        //then the match was 0 and 1 
        score = sortedDiceRoll[2]
        results.score = score
        //return diceRoll1 + " " + diceRoll2 + " " + diceRoll3 + " - You got a score of " + score
        return results

      }
      // dont need an else if for i = 2 cause then that means no score on the roll. 
      else if (i === 1){
        //then the mmatch was 1 and 2 
        score = sortedDiceRoll[0]
        results.score = score
        //return diceRoll1 + " " + diceRoll2 + " " + diceRoll3 + " - You got a score of " + score;
        return results
      }

    }
  }

  // console.log(" no score roll again. ");
  results.score = "No Score"
  //return diceRoll1 + " " + diceRoll2 + " " + diceRoll3 + " - No score try rolling again." ;
  return results

}