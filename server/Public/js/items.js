const sword1= document.getElementById("sword1");
const sword2= document.getElementById("sword2");
const sword3= document.getElementById("sword3");
const armor1= document.getElementById("armor1");
const armor2= document.getElementById("armor2");
const armor3= document.getElementById("armor3");
const potion1= document.getElementById("potion1");
const potion2= document.getElementById("potion2");
const potion3= document.getElementById("potion3");

const getSword = (cost, bonus) => {
  if (gold >= cost) {
    playerAttackBonus = bonus;
    gold = gold - cost;
    goldDisplay.innerHTML = gold;
    return true;
  } else {
    alert("You need more money.");
    return false;
  }
}

const getArmor = (cost, bonus) => {
  if (gold >= cost) {
    playerAC += bonus;
    gold = gold - cost;
    goldDisplay.innerHTML = gold;
    return true;
  } else {
    alert("You need more money.");
    return false;
  }
}

const getPotion = (cost, bonus) => {
  if (gold >= cost) {
    playerDamageMod = bonus;
    gold = gold - cost;
    goldDisplay.innerHTML = gold;
    return true;
  } else {
    alert("You need more money.");
    return false;
  }
}

sword1.addEventListener("click", () => {
  if (getSword(30, 7) == true) {
    document.getElementById("sword1").style.borderColor = "green"};
  adjustStats();
});

sword2.addEventListener("click", () => {
   if (getSword(50, 9)== true) {document.getElementById("sword2").style.borderColor = "green"};
  adjustStats();
});

sword3.addEventListener("click", () => {
  if (getSword(150, 12) == true) {document.getElementById("sword3").style.borderColor = "green"};
  adjustStats();
});

armor1.addEventListener("click", () => {
  if (getArmor(40, 1) == true) {document.getElementById("armor1").style.borderColor = "green"};
  adjustStats();
});

armor2.addEventListener("click", () => {
  if (getArmor(60, 1) == true) {document.getElementById("armor2").style.borderColor = "green"};
  adjustStats();
});

armor3.addEventListener("click", () => {
  if (getArmor(200, 2) == true) {document.getElementById("armor3").style.borderColor = "green"};
  adjustStats();
});

potion1.addEventListener("click", () => {
  if (getPotion(35, 6) == true) {document.getElementById("potion1").style.borderColor = "green"};
  adjustStats();
});

potion2.addEventListener("click", () => {
  if (getPotion(55, 8) == true) {document.getElementById("potion2").style.borderColor = "green"};
  adjustStats();
});

potion3.addEventListener("click", () => {
  if (getPotion(180, 12) == true) {document.getElementById("potion3").style.borderColor = "green"};
  adjustStats();
});
