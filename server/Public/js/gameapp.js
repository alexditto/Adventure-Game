const getRandomNumber = upper => Math.floor(Math.random()* upper) +1;

const saveButton = document.getElementById("save");

const playerHealthDisplay= document.getElementById("playerHealth");
const playerLevelDisplay = document.getElementById("playerLevel");
const enemyHealthDisplay= document.getElementById("enemyHealth");
const playerDamageDisplay=document.getElementById("playerDamage");
const playerAccuracyDisplay= document.getElementById("playerAttackBonus");
const playerACDisplay= document.getElementById("playerAC");

const round= document.getElementById("round");
const fight= document.getElementById("fight");
const healthPotionButton = document.getElementById("healthPotion");
const result= document.getElementById("result");
const newFight= document.getElementById("newFight");
const run= document.getElementById("run");
// const castle= document.getElementById("castle");
// const dragon= document.getElementById("dragon");

const totalWins= document.getElementById("totalWins");
const totalLosses= document.getElementById("totalLosses");
const monstersSlain= document.getElementById("monstersSlain");
const image= document.getElementById("image");
const goldDisplay= document.getElementById("goldDisplay");
const goldImage= document.getElementById("goldImage");


let playerLevel = 1;
let playerXp = 0;
let playerHealth = 10;
let playerAC = 15;
let healthPotions = 3;
let playerAttackBonus= 5;
let playerAttackDie= 6;
let playerDamageMod= 4;
let monster;
let monsterName;
let enemyHealth;
let enemyAttackBonus;
let enemyAttackDie;
let enemyDamageMod;
let enemyAC;
let monsterImage;
let roundCounter= 0;
let win = 0;
let loss = 0;
let gold = 0;

// dragon.style.visibility= "hidden";

//save data to database experiment!!!! not working
// save.addEventListener("click", (playerLevel, playerXp, playerHealth, playerAC, healthPotions, playerAttackBonus, playerAttackDie, playerDamageMod, win, loss, gold)=> {
//   let saveData = {
//     playerLevel: playerLevel,
//     playerXp: playerXp,
//     playerHealth: playerHealth,
//     playerAC: playerAC,
//     healthPotions: healthPotions,
//     playerAttackBonus: playerAttackBonus,
//     playerAttackDie: playerAttackDie,
//     playerDamageMod: playerDamageMod,
//     win: win,
//     loss: loss,
//     gold: gold
//   }
//   app.post("/", (req, res, next)=>{
//     Character.create(saveData, function(error, user){
//       if(error){
//         return next(error);
//       } else {
//         return res.redirect('/');
//       }
//     });
//   });
// });

//creates a new monster and populates the stats and image
const newMonster = () => {
  // pulls and refines monster list by cr
  monster = monsters.filter(monsters => monsters.cr <= playerLevel && monsters.cr >= (playerLevel - 5));
  monster = monster[Math.floor(Math.random()* monster.length)];

  // populates states and images
  monsterName = monster.name;
  enemyHealth = monster.health;
  enemyAttackBonus = monster.attackBonus;
  enemyAttackDie = monster.attackDie;
  enemyDamageMod = monster.damageMod;
  enemyAC = monster.ac;
  monsterImage =document.createElement("img");
  monsterImage.src = monster.image;
  image.appendChild(monsterImage);
};

const buyTheCastle= () => {
  if (gold >= 500) {
    gold -= 500;
    dragon.style.visibility= "visible";
    fight.style.visibility = "hidden";
    run.style.visibility = "hidden";
  } else {
    alert("You still need more gold.")
  }
}

// const fightTheDragon = () => {
//   fight.style.visibility = "visible";
//   run.style.visibility = "visible";
//   adjustStats();
//   image.removeChild(image.childNodes[0]);
//   monsterName = "Ancient Red Dragon";
//   enemyHealth = 250;
//   enemyAttackBonus = 10;
//   enemyAttackDie = 20;
//   enemyDamageMod = 9;
//   enemyAC = 25;
//   monsterImage =document.createElement("img");
//   monsterImage.src = "monsterimg/dragon.jpg";
//   // monsterImage.src = monster.image;
//   image.appendChild(monsterImage);
// }

const levelUp = () => {
  playerXp ++;
  if (playerLevel % 3 == 0 && playerXp >= 3){ /* levels up with new potions */
      healthPotions += 3;
      healthPotionButton.style.visibility = "visible";
      healthPotionButton.innerHTML = `Health Potion: ${healthPotions}`;
      playerLevel ++;
      playerLevelDisplay.innerHTML = `Player Level: ${playerLevel}!`;
      playerXp = 0;
  } else if (playerXp >= 3) { /* levels up without new potions */
    playerLevel ++;
    playerLevelDisplay.innerHTML = `Player Level: ${playerLevel}!`;
    playerXp = 0;
  } else {
    playerLevelDisplay.innerHTML = `Player Level: ${playerLevel}!`;
  }
}

const levelDown = () => {
  playerLevel--;
  alert(`Your death has lost a level. Try to run away next time.`);
  playerLevelDisplay.innerHTML = `Player Level: ${playerLevel}!`;
};

const addGold = () => {
  gold += monster.cr * getRandomNumber(10);
  goldDisplay.innerHTML= `Total Gold: ${gold}`;
}

const removeGold = () => {
  gold -= Math.floor((getRandomNumber(10) * gold) * .1);
  goldDisplay.innerHTML= `Total Gold: ${gold}`;
  if (gold <= 0) {gold = 0};
}

const adjustStats = () => {
  playerLevelDisplay.innerHTML= `Player Level: ${playerLevel}`;
  playerHealthDisplay.innerHTML= `Player Health: ${playerHealth}`;
  let playerBottomDamage= playerDamageMod + 1;
  let playerTopDamage= playerAttackDie + playerDamageMod;
  playerDamageDisplay.innerHTML= `Player Attack: ${playerBottomDamage}-${playerTopDamage}`;
  playerAccuracyDisplay.innerHTML= `Player Accuracy: +${playerAttackBonus}`;
  playerACDisplay.innerHTML= `Player's Armor Class: ${playerAC}`;
  goldDisplay.innerHTML= `Total Gold: ${gold}`;
}

const useHealingPotion = () => {
  roundCounter +=1;
  round.innerHTML = `Round ${roundCounter}`;
  let heal = getRandomNumber(8)+2;
  playerHealth += heal;
  healthPotions --;
  playerHealthDisplay.innerHTML = `You gained ${heal} points back! Your health is now ${playerHealth}`;
  healthPotionButton.innerHTML = `Health Potion: ${healthPotions}`
  if (healthPotions <= 0) {healthPotionButton.style.visibility= "hidden";}
}

const skillCheck = (skillMod) => getRandomNumber(20) + skillMod;

const playerAttack = (attackBonus, attackDie, damageMod) => {
  let playerAttack = getRandomNumber(20)+ attackBonus;
  if (playerAttack > enemyAC) {
    return getRandomNumber(attackDie) + damageMod;
  } else {
    return 0;
  }
}

const enemyAttack = (attackBonus, attackDie, damageMod) => {
  let enemyAttack = getRandomNumber(20)+ attackBonus;
  if (enemyAttack > playerAC) {
    return getRandomNumber(attackDie) + damageMod;
  } else {
    return 0;
  }
}

const attackRound =()=> {
  // standard round attack
  roundCounter +=1;
  round.innerHTML = "Round " + roundCounter;
  enemyHealth -= playerAttack(playerAttackBonus, playerAttackDie, playerDamageMod);
  enemyHealthDisplay.innerHTML = `Enemy Health: ${enemyHealth}. You are fighting a(n) ${monsterName}.`;
  playerHealth -= enemyAttack(enemyAttackBonus, enemyAttackDie, enemyDamageMod);
  playerHealthDisplay.innerHTML = `Player Health: ${playerHealth}`;
  // if statement for outcome of attackround
  if (enemyHealth <= 0 && playerHealth > 0) {
    win += 1;
    levelUp();
    addGold();
    // let li = document.createElement("li");
    // li.textContent = monster.name;
    // li.className += "overflow-auto";
    // monstersSlain.appendChild(li);
    result.innerHTML = "Player Wins!!!";
    fight.disabled = true;
    newFight.style.visibility = 'visible';
    totalWins.innerHTML = `Total Wins: ${win}`;
    image.removeChild(image.childNodes[0]);
  } else if (playerHealth <=0){
    levelDown();
    loss += 1;
    result.innerHTML = "Player Died!";
    fight.disabled = true;
    newFight.style.visibility = 'visible';
    totalLosses.innerHTML =  `Total Losses: ${loss}`;
    image.removeChild(image.childNodes[0]);
  } else {
    result.innerHTML = "Next Round";
  }
}

newMonster();

playerHealthDisplay.innerHTML= `Player Health: ${playerHealth}`;
enemyHealthDisplay.innerHTML= `Enemy Health ${enemyHealth}. You are fighting a(n) ${monsterName}.`;
newFight.style.visibility= "hidden";

healthPotionButton.addEventListener("click", ()=> useHealingPotion());

fight.addEventListener("click", ()=> {
  attackRound();
});

newFight.addEventListener("click", ()=> {
  playerHealth= 10 + (playerLevel * 5);
  playerHealthDisplay.innerHTML = `Player Health: ${playerHealth}`;
  newMonster();
  enemyHealthDisplay.innerHTML = `Enemy Health: ${enemyHealth}. You are fighting a(n) ${monsterName}.`;
  roundCounter = 0;
  fight.disabled = false;
  newFight.style.visibility= 'hidden';
  adjustStats();
});

run.addEventListener("click", ()=> {
  removeGold();
  image.removeChild(image.childNodes[0]);
  playerHealth= 10 + (playerLevel * 5);
  newMonster();
  adjustStats();
});

// castle.addEventListener("click", ()=> {
//   buyTheCastle();
// });
//
// dragon.addEventListener("click", ()=> {
//   fightTheDragon();
// });
