const express = require("express");
const articleRouter = require("./routes/articles");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

//listing to localhost port....
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
//connection to database...
const dbURI = process.env.mongodb_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Connection to db"))
  .catch((err) => console.log("database connection failed! :" + err));

app.set("view engine", "ejs"); //set Index.ejs as a Html

app.use(express.urlencoded({ extended: false }));

app.use(articleRouter);
//app.use("/articles", articleRouter);
