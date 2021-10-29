const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser')
const cors = require("cors");
const { initializeDBConnection } = require("./db/db.connect.js");
const { errorHandler } = require("./middlewares/error-handler.middleware.js");
const {
  routeNotFound,
} = require("./middlewares/route-not-found.middleware.js");

const app = express();
app.use(bodyParser.json());
app.use(cors());

initializeDBConnection();

const insertIntoDB = require("./routes/insertIntoDB.router");
const quizzes = require("./routes/quizData.router");
const leaderBoard = require("./routes/leaderBoard.router");



app.get('/', (req, res) => {
  res.send('Welcome to Quiz on Famous Personalities')
});

app.use("/insert", insertIntoDB);
app.use("/quiz", quizzes);
app.use('/leaderBoard', leaderBoard)



app.use(routeNotFound);
app.use(errorHandler);

const PORT = 5000;

app.listen(PORT, () => {
  console.log('server started at port' , PORT);
});