const express = require("express");
const router = express.Router();
const { LeaderBoard } = require("../models/leaderBoard.model.js");

router
  .route("/")
  .get(async (_, res) => {
    try {
      const leaderBoard = await LeaderBoard.find({})     ;
      res.json({ success: true, leaderBoard });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        errorMessage: err.message,
      });
    }
  })
  .post(async (req,res) => {
    try{
      const data = req.body
      const NewLeaderBoardEntry = await new LeaderBoard(data);
      await NewLeaderBoardEntry.save();
      res.json({success : true, NewLeaderBoardEntry })
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Unable to save new LeaderBoard Entry",
        errorMessage: err.message,
      });
    }
  })




module.exports = router;
