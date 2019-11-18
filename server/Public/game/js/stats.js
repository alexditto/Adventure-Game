const apiAddress= 'http://localhost:3000/api/'+ window.location.href.slice(27);
const playerNameDisplay = document.getElementById("playerNameDisplay");

let playerName= "";
let playerLevel = 1;
let playerImage;
let playerXp = 0;
let playerHealth = 10;
let playerTotalHealth;
let playerAC = 15;
let healthPotions = 3;
let playerAttackBonus= 5;
let playerAttackDie= 6;
let playerDamageMod= 4;
let roundCounter= 0;
let win = 0;
let loss = 0;
let gold= 0;

fetch(apiAddress)
      .then(res => res.json())
      .then(function(data) {
        playerName = data[0].character;
        playerLevel = data[0].playerLevel;
        playerImage = data[0].image;
        playerXp = data[0].playerXp;
        playerHealth = data[0].playerHealth;
        playerAC = data[0].playerAC;
        healthPotions = data[0].healthPotions;
        playerAttackBonus = data[0].playerAttackBonus;
        playerDamageMod = data[0].playerDamageMod;
        win = data[0].win;
        loss = data[0].loss;
        gold = data[0].gold;
        playerNameDisplay.innerHTML = `Player Name: ${playerName}`;
      })
