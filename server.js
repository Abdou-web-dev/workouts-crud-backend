require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const cors = require("cors");

// express app
const app = express();

// middleware
app.use(express.json());
//
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.send("API is running");
});

// routes
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

const port = process.env.PORT || 5000;

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(port, () => {
      console.log("listening for requests on port", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// const port = process.env.PORT || 5000;
// const mongo_uri = process.env.MONGO_URI ;
// const secret_word = process.env.SECRET ;
