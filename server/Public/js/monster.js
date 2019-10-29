let monsters= [
  { name:"goblin", ac: 12, health: 11, attackBonus: 1, attackDie: 4, damageMod: 1, image: "images/monsterImg/goblin.jpg", cr: 1},
  { name:"zombie", ac: 12, health: 12, attackBonus: 1, attackDie: 4, damageMod: 1, image: "images/monsterImg/zombie.jpg", cr: 2},
  { name:"kobold", ac: 14, health: 10, attackBonus: 2, attackDie: 6, damageMod: 2, image: "images/monsterImg/kobold.jpg", cr:2},
  { name:"plotted plant", ac: 1, health: 20, attackBonus: 0, attackDie: 0, damageMod: 0, image: "images/monsterImg/plottedplant.jpg", cr:0},
  { name:"Reaper", ac: 20, health: 200, attackBonus: 8, attackDie: 8, damageMod: 5, image: "images/monsterImg/reaper.jpg", cr:20},
];

//{name: "", ac: , health: , attackBonus: , attackDie: , damageMod: 0, image: "monsterimg/.jpg", cr: },

let monsterManualMonsters = [
  {name: "ape", ac: 12, health: 19, attackBonus: 5, attackDie: 6, damageMod: 3, image: "images/monsterImg/ape.jpg", cr: 2},
  {name: "axe beak", ac: 11, health: 19, attackBonus: 4, attackDie: 8, damageMod: 2, image: "images/monsterImg/axebeak.jpg", cr: 2},
  {name: "death dog", ac: 12, health: 39, attackBonus: 4, attackDie: 6, damageMod: 2, image: "images/monsterImg/deathdog.jpg", cr: 4},
  {name: "giant fire bettle", ac: 13, health: 4, attackBonus: 1, attackDie: 6, damageMod: -1, image: "images/monsterImg/giantfirebettle.jpg", cr: 0},
  {name: "giant spider", ac: 14, health: 26, attackBonus: 5, attackDie: 8, damageMod: 3, image: "images/monsterImg/giantspider.jpg", cr: 4},
  {name: "phase spider", ac: 13, health: 32, attackBonus: 4, attackDie: 10, damageMod: 2, image: "images/monsterImg/phasespider.jpg", cr: 5},
  {name: "winter wolf", ac: 13, health: 75, attackBonus: 6, attackDie: 12, damageMod: 4, image: "images/monsterImg/winterwolf.jpg", cr: 7},
  {name: "aboleth", ac: 17, health: 135, attackBonus: 9, attackDie: 12, damageMod: 5, image: "images/monsterImg/aboleth.jpg", cr: 15},
  {name: "Deva", ac: 17, health: 136, attackBonus: 8, attackDie: 30, damageMod: 4, image: "images/monsterImg/deva.jpg", cr: 19},
  {name: "Fire Giant", ac: 18, health: 170, attackBonus: 11, attackDie: 36, damageMod: 7, image: "images/monsterImg/firegiant.jpg", cr: 19},
  {name: "Bone Devil", ac: 19, health: 150, attackBonus: 8, attackDie: 16, damageMod: 4, image: "images/monsterImg/bonedevil.jpg", cr: 18},
  {name: "cloaker", ac: 14, health: 78, attackBonus: 6, attackDie: 24, damageMod: 3, image: "images/monsterImg/cloaker.jpg", cr: 18},
  {name: "Oni", ac: 16, health: 110, attackBonus: 7, attackDie: 20, damageMod: 4, image: "images/monsterImg/oni.jpg", cr: 17},
  {name: "Chimera", ac: 14, health: 114, attackBonus: 7, attackDie: 12, damageMod: 4, image: "images/monsterImg/chimera.jpg", cr: 17},
  {name: "Vrock", ac: 15, health: 104, attackBonus: 6, attackDie: 20, damageMod: 3, image: "images/monsterImg/vrock.jpg", cr: 16},
  {name: "Medusa", ac: 15, health: 127, attackBonus: 5, attackDie: 8, damageMod: 2, image: "images/monsterImg/medusa.jpg", cr: 16},
  {name: "Invisible Stalker", ac: 22, health: 50, attackBonus: 6, attackDie: 12, damageMod: 3, image: "images/monsterImg/invisiblestalker.jpg", cr: 15},
  {name: "Troll", ac: 15, health: 84, attackBonus: 7, attackDie: 12, damageMod: 4, image: "images/monsterImg/troll.jpg", cr: 14},
  {name: "Night Hag", ac: 17, health: 112, attackBonus:7, attackDie: 16, damageMod: 4, image: "images/monsterImg/nighthag.jpg", cr: 14},
  {name: "Ettin", ac: 12, health: 85, attackBonus: 7, attackDie: 16, damageMod: 5, image: "images/monsterImg/ettin.jpg", cr: 13},
  {name: "Unicorn", ac: 12, health: 67, attackBonus: 7, attackDie: 12, damageMod: 4, image: "images/monsterImg/unicorn.jpg", cr: 12},
  {name: "Nightmare", ac: 13, health: 68, attackBonus: 6, attackDie: 16, damageMod: 4, image: "images/monsterImg/nightmare.jpg", cr: 12},
  {name: "Mimic", ac: 12, health: 58, attackBonus: 5, attackDie: 8, damageMod: 3, image: "images/monsterImg/mimic.jpg", cr: 10},
];

let ancientRedDragon = [
  {name: "Ancient Red Dragon", ac: 25, health: 250, attackBonus: 10, attackDie: 20, damageMod: 9, image: "images/monsterImg/dragon.jpg", cr: 30},
]

monsters.push(...monsterManualMonsters);

const sortCRs = monsters.sort((a, b) => (a.cr > b.cr) ? 1: -1);

console.log(sortCRs);
