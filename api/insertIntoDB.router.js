const express = require("express");
const router = express.Router();

const { Quiz } = require("../models/quizData.model.js");
const { quizList } = require("../data/quiz-data.js");


router.route('/quiz')
  .get(async (req, res) => {
    try {
      quizList.forEach(async quiz => {
        const isQuizMatched = await Quiz.findOne({ quizName: quiz.quizName })
        if (isQuizMatched) return;

        const quizQuestions = quiz.questions.map(question => ({
          questionNo: question.questionNo,
          question: question.question,
          choices : question.choices.map(choice => ({
            option : choice.option,
            isRight : choice.isRight
          })),
          points : question.points
        }))
    
    
        const newQuiz = await Quiz({
          quizName: quiz.quizName,
          questions: quizQuestions
        })

          const saved = await newQuiz.save()
          if (!saved) {
            console.log("This quiz is not saved:", saved);
          }
        });
        res.json({
          success: true,
          message: "Entire quizList is inserted into DB",
        });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to insert the quiz",
        errorMessage: err.message,
      })
    }
  })

module.exports = router;


