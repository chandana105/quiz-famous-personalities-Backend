const express = require("express");
const router = express.Router();
const { Quiz } = require("../models/quizData.model.js");

router
  .route("/")
  .get(async (_, res) => {
    try {
      const quizzes = await Quiz.find({})     ;
      const message =
        quizzes.length === 0
          ? "There are no quizzes in the Collection, please start inserting them."
          : undefined;
      res.json({ success: true, quizzes, message });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to find quizzes",
        errorMessage: err.message,
      });
    }
  })
  .delete(async (_, res) => {
    try {
      await Quiz.deleteMany({});
      res.status(200).json({
        success: true,
        deleted: true,
        message: "All Quizzes are deleted from this Collection",
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        deleted: false,
        message: "Couldn't delete the Collection",
        errorMessage: err.message,
      });
    }
  });

  router.param("quizID", async (req, res, next, quizID) => {
  try {
    const quiz = await Quiz.findById(quizID);
    if (!quiz) {
      return res.status(400).json({
        success: false,
        message: "Couldn't get your quiz, Please check the quizID again.",
      });
    }
    req.quiz = quiz;
    next();
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: "Please check your quizID again" });
  }
});  

router
  .route("/:quizID")
  .get((req, res) => {
    let { quiz } = req;
    quiz.__v = undefined;
    res.json({ success: true, quiz });
  })

module.exports = router;
