const express = require("express");
const articleRouter = require("./routes/articles");
const app = express();

app.set("view engine", "ejs"); //set Index.ejs as a Html

app.use("/articles", articleRouter);

app.get("/", (req, res) => {
  const articles = [
    {
      title: "test articles",
      createdAt: new Date().now,
      description: "test descriptions",
    },
  ];
  res.render("index", { articles: articles });
});
app.listen(5000);
