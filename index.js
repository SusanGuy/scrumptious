const express = require("express");
const connectDB = require("./src/database/mongoose");
const cors = require("cors");

connectDB();
const userRouter = require("./src/routers/user");
const recipeRouter = require("./src/routers/recipe");
const ingredientRouter = require("./src/routers/ingredient");
const adminRouter = require("./src/routers/admin");
const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/recipes", recipeRouter);
app.use("/ingredients", ingredientRouter);
app.use("/admin", adminRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
