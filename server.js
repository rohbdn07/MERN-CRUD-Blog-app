const express = require("express");
const articleRouter = require("./routes/articles");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://localhost/blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.set("view engine", "ejs"); //set Index.ejs as a Html

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const articles = [
    {
      title: "test articles",
      createdAt: new Date(),
      description: "test descriptions",
    },
    {
      title: "test articles 2",
      createdAt: new Date(),
      description: "test descriptions 2",
    },
  ];
  res.render("articles/index", { articles: articles });
});

app.use("/articles", articleRouter);
app.listen(3000);
