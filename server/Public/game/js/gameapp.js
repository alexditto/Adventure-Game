const getRandomNumber = upper => Math.floor(Math.random()* upper) +1;

//player DOM
const saveButton = document.getElementById("save");
const saveAlert = document.getElementById("saveAlert");

const playerHealthBar = document.getElementById("playerHealthBar");
const playerHealthBarStatus = document.getElementById("playerHealthBarStatus");
const enemyHealthBar = document.getElementById("enemyHealthBar");
const enemyHealthBarStatus = document.getElementById("enemyHealthBarStatus");
const playerHealthDisplay= document.getElementById("playerHealth");
const playerLevelDisplay = document.getElementById("playerLevel");
const enemyHealthDisplay= document.getElementById("enemyHealth");
const playerDamageDisplay=document.getElementById("playerDamage");
const playerAccuracyDisplay= document.getElementById("playerAttackBonus");
const playerACDisplay= document.getElementById("playerAC");
const playerAlert = document.getElementById("playerAlert");

const round= document.getElementById("round");
const fight= document.getElementById("fight");
const healthPotionButton = document.getElementById("healthPotion");
const result= document.getElementById("result");
const newFight= document.getElementById("newFight");
const run= document.getElementById("run");

const totalWins= document.getElementById("totalWins");
const totalLosses= document.getElementById("totalLosses");
const monstersSlain= document.getElementById("monstersSlain");
const image= document.getElementById("image");
const goldDisplay= document.getElementById("goldDisplay");
const goldImage= document.getElementById("goldImage");
const enemyAlert = document.getElementById("enemyAlert");
const playerImageDisplay = document.getElementById("playerImage");

const doorImage = document.createElement("IMG");
doorImage.src = "images/door.png";
doorImage.classList.add("monsterImage");
image.appendChild(doorImage);

//set character Image after character FETCH
setTimeout(()=> {
  const playerImageToDisplay = document.createElement("IMG");
  playerImageToDisplay.src = `images/${playerImage}`;
  playerImageToDisplay.setAttribute("id", "heroImage")
  playerImageToDisplay.classList.add("text-center");
  playerImageDisplay.appendChild(playerImageToDisplay);
  playerTotalHealth = playerHealth;
}, 300);

let monster;
let monsterName;
let enemyHealth;
let enemyTotalHealth;
let enemyAttackBonus;
let enemyAttackDie;
let enemyDamageMod;
let enemyAC;
let monsterImage;

//adjust the static variables for PATCH
const send = ()=> {
  let obj ={};
  obj["playerLevel"] = playerLevel;
  obj["playerXp"] = playerXp;
  obj["playerHealth"] = playerHealth;
  obj["playerAC"] = playerAC;
  obj["healthPotions"] = healthPotions;
  obj["playerAttackBonus"]= playerAttackBonus;
  obj["playerAttackDie"] = playerAttackDie;
  obj["playerDamageMod"] = playerDamageMod;
  obj["win"] = win;
  obj["loss"] = loss;
  obj["gold"] = gold;
  console.log(obj);
  return obj
}

//PATCH character
const putData = () =>{
  $("#save").html("").removeClass("btn btn-primary").addClass("spinner-border text-success");
  fetch('http://localhost:3000/api/patch/character/'+ window.location.href.slice(27), {
    method: "PATCH",
    body: JSON.stringify(send()),
    headers: {"Content-Type": "application/json"},
  })
  .then(res => {
    setTimeout(()=> {
      $("#save").removeClass("spinner-border text-success").addClass("btn btn-primary").html("Save");
    }, 2000);
    console.log(res.json());
    console.log(playerName);
    console.log(account);
    console.log(username);
    fetch(`http://localhost:9200/leaderboard/_doc/${account}_${playerName}`, {
      method: "PUT",
      body: JSON.stringify({
        username: username,
        playerName: playerName,
        level: playerLevel,
        win: win,
        gold: gold
      }),
      headers: {"Content-Type": "application/json"},
    })
  })
  // .then(data =>console.log(data))

}
save.addEventListener("click", putData);

//creates a new monster and populates the stats and image
const newMonster = () => {
  // pulls and refines monster list by cr
  monster = monsters.filter(monsters => monsters.cr <= playerLevel && monsters.cr >= (playerLevel - 5));
  monster = monster[Math.floor(Math.random()* monster.length)];

  // populates states and images
  monsterName = monster.name;
  enemyHealth = monster.health;
  enemyTotalHealth = enemyHealth;
  enemyAttackBonus = monster.attackBonus;
  enemyAttackDie = monster.attackDie;
  enemyDamageMod = monster.damageMod;
  enemyAC = monster.ac;
  monsterImage =document.createElement("img");
  monsterImage.classList.add("text-center");
  monsterImage.src = monster.image;
  monsterImage.classList.add("monsterImage");
  image.removeChild(image.childNodes[0]);
  image.appendChild(monsterImage);

  //Set playersTotalHealth
  playerTotalHealth = playerHealth;

  //fix healthBars
  playerHealthBar.style.width= "100%";
  enemyHealthBar.style.width= "100%";
  enemyHealthBarStatus.classList.remove("bg-danger");
  enemyHealthBarStatus.classList.add("bg-success");
  playerHealthBarStatus.classList.remove("bg-danger");
  playerHealthBarStatus.classList.add("bg-success");
};

//Level functions
const levelUp = () => {
  playerXp ++;
  if (playerLevel % 3 == 0 && playerXp >= 3){ /* levels up with new potions */
      healthPotions += 3;
      // healthPotionButton.style.visibility = "visible";
      healthPotionButton.classList.remove("hide-button");
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

//gold functions
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
  playerHealthBar.style.width = `${Math.floor((playerHealth/playerTotalHealth)*100)}%`
  playerHealthDisplay.innerHTML = `You gained ${heal} points back! Your health is now ${playerHealth}`;
  healthPotionButton.innerHTML = `Health Potion: ${healthPotions}`
  if (healthPotions <= 0) {
    healthPotionButton.classList.add("hide-button");
  }
}

const playerAttack = (attackBonus, attackDie, damageMod) => {
  let dataReturn = 0;
  let enemyAlertDisplay= $("#enemyAlert");
  let playerAttack = getRandomNumber(20)+ attackBonus;
  if (playerAttack > enemyAC) {
    let damage = getRandomNumber(attackDie) + damageMod;
    enemyAlert.innerHTML = `${monsterName} lost -${damage} Health.`;
    dataReturn = damage;

  } else {
    enemyAlert.innerHTML = `You missed.`;
  }

  //hit animation
  enemyAlertDisplay.show().delay( 400 ).fadeOut( 800 );
  return dataReturn;
}

const enemyAttack = (attackBonus, attackDie, damageMod) => {
  let dataReturn = 0;
  let playerAlertDisplay = $("#playerAlert");
  let enemyAttack = getRandomNumber(20)+ attackBonus;
  if (enemyAttack > playerAC) {
    let damage = getRandomNumber(attackDie) + damageMod;
    playerAlert.innerHTML = `You took ${damage} damage.`
    dataReturn = damage;
  } else {
    playerAlert.innerHTML= `The ${monsterName} missed.`
  }

  //hit animation
  playerAlertDisplay.show().delay( 400 ).fadeOut( 800 );
  return dataReturn;
}

const attackRound =()=> {
  // standard round attack
  roundCounter +=1;
  round.innerHTML = "Round " + roundCounter;

  //enemy and player healthBar
  enemyHealth -= playerAttack(playerAttackBonus, playerAttackDie, playerDamageMod);
  enemyHealthBar.style.width = `${Math.floor((enemyHealth/enemyTotalHealth)*100)}%`
  if (enemyHealth <= 0){
    enemyHealthBar.style.width = "0%";
    enemyHealthBarStatus.classList.remove("bg-success");
    enemyHealthBarStatus.classList.add("bg-danger");
  }else if (Math.floor((enemyHealth/enemyTotalHealth)*100)< 25){
    enemyHealthBarStatus.classList.remove("bg-success");
    enemyHealthBarStatus.classList.add("bg-danger");
  }
  enemyHealthDisplay.innerHTML = `Enemy Health: ${enemyHealth}. You are fighting a(n) ${monsterName}.`;
  playerHealth -= enemyAttack(enemyAttackBonus, enemyAttackDie, enemyDamageMod);
  playerHealthBar.style.width = `${Math.floor((playerHealth/playerTotalHealth)*100)}%`;
  if (playerHealth <= 0){
    playerHealthBar.style.width = "0%";
    playerHealthBarStatus.classList.remove("bg-success");
    playerHealthBarStatus.classList.add("bg-danger");
  }else if(Math.floor((playerHealth/playerTotalHealth)*100)< 25){
    playerHealthBarStatus.classList.remove("bg-success");
    playerHealthBarStatus.classList.add("bg-danger");
  }
  playerHealthDisplay.innerHTML = `Player Health: ${playerHealth}`;
  // if statement for outcome of attackround
  if (enemyHealth <= 0 && playerHealth > 0) {
    win += 1;
    levelUp();
    addGold();
    result.innerHTML = "Player Wins!!!";
    fight.classList.add("hide-button");
    healthPotionButton.classList.add("hide-button");
    run.classList.add("hide-button");
    newFight.classList.remove("hide-button");
    totalWins.innerHTML = `Total Wins: ${win}`;
    image.removeChild(image.childNodes[0]);
    image.appendChild(doorImage);
  } else if (playerHealth <=0){
    levelDown();
    loss += 1;
    result.innerHTML = "Player Died!";
    fight.classList.add("hide-button");
    healthPotionButton.classList.add("hide-button");
    run.classList.add("hide-button");
    newFight.classList.remove("hide-button");
    totalLosses.innerHTML =  `Total Losses: ${loss}`;
    image.removeChild(image.childNodes[0]);
    image.appendChild(doorImage);
  } else {
    result.innerHTML = "Next Round";
  }
}

newMonster();

playerHealthDisplay.innerHTML= `Player Health: ${playerHealth}`;
enemyHealthDisplay.innerHTML= `Enemy Health ${enemyHealth}. You are fighting a(n) ${monsterName}.`;
newFight.classList.add("hide-button");

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
  fight.classList.remove("hide-button");
  healthPotionButton.classList.remove("hide-button");
  run.classList.remove("hide-button");
  newFight.classList.add("hide-button");
  adjustStats();
});

run.addEventListener("click", ()=> {
  removeGold();
  image.removeChild(image.childNodes[0]);
  image.appendChild(doorImage);
  playerHealth= 10 + (playerLevel * 5);
  newMonster();
  adjustStats();
});
