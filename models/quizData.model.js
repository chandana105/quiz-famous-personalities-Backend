const mongoose = require("mongoose");
const { Schema } = mongoose;

const QuizSchema = new Schema({
    quizName : String,
    questions : [{
      questionNo : Number,
      question : String,
      choices: { 
        type : Array,
        option: String, 
        isRight: Boolean 
      },
      points : Number
    }]
},{
    timestamps: true,
})



const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = { Quiz };