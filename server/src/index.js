const express = require("express");
const connectDB = require("./database/mongoose");
const cors = require("cors");

connectDB();
const userRouter = require("./routers/user");
const recipeRouter = require("./routers/recipe");
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/recipes", recipeRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
