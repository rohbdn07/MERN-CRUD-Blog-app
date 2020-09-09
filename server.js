const express = require("express");
const articleRouter = require("./routes/articles");
const app = express();

app.set("view engine", "ejs"); //set Index.ejs as a Html

app.use("/articles", articleRouter);

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
app.listen(5000);
