const mongoose = require('mongoose');
var characterSchema = new mongoose.Schema({
  character: { type: String },
  account: { type: String },
  image: { type: String},
  playerLevel: { type: Number },
  playerXp: { type: Number },
  playerHealth: { type: Number },
  playerAC: { type: Number },
  healthPotions: { type: Number },
  playerAttackBonus: { type: Number },
  playerAttackDie: { type: Number },
  playerDamageMod: { type: Number },
  win: { type: Number },
  loss: { type: Number },
  gold: { type: Number }
});

var Character = mongoose.model("Character", characterSchema);
module.exports = Character;
