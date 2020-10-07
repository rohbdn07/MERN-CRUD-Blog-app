const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

//get all the articles to display in index file....
router.get("/", (req, res) => {
  Article.find()
    .sort({
      createdAt: "desc",
    })
    .then((data) => {
      res.render("articles/index", {
        title: "all articles",
        articles: data,
      });
    });
});
router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);
  if (article == null) res.redirect("/");
  res.render("articles/show", { article: article });
});

router.post("/", async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });
  try {
    article = await article.save();
    //res.redirect(`/articles/${id}`);
    res.redirect("/articles");
  } catch (e) {
    res.render("articles/new", { article: article });
  }

  article.save();
});

module.exports = router;
