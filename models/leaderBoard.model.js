const mongoose = require("mongoose");
const { Schema } = mongoose;

const LeaderBoardSchema = new Schema({
  playerName : String,
  quizName : String,
  score : Number
})


const LeaderBoard = mongoose.model("LeaderBoard", LeaderBoardSchema);

module.exports = { LeaderBoard };