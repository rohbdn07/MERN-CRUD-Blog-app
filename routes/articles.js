const express = require("express");
const Article = require("./../models/article");
const router = express.Router();

router.get("/", (req, res) => {
  res.redirect("/articles");
});

//get all the articles to display in index file....
router.get("/articles", (req, res) => {
  Article.find()
    .sort({
      createdAt: "desc",
    })
    .then((data) => {
      res.render("index", {
        title: "all articles",
        articles: data,
      });
    });
});
router.get("/articles/new", (req, res) => {
  res.render("new", { article: new Article() });
});

router.get("/articles/:id", async (req, res) => {
  const id = req.params.id;
  const article = await Article.findById(id);
  if (article == null) res.redirect("/");
  res.render("show", { article: article });
});

router.post("/articles", async (req, res) => {
  let article = new Article({
    studentname: req.body.studentname,
    email: req.body.email,
    phonenumber: req.body.phonenumber,
    address: req.body.address,
    class: req.body.class,
    school: req.body.school,
  });
  try {
    article = await article.save();
    //res.redirect(`/articles/${id}`);
    res.redirect("/articles", {
      article: article,
    });
  } catch (e) {
    res.render("new", { article: article });
  }

  article.save();
});

router.delete("/articles/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const article = await Article.findByIdAndDelete(id);
    res.render("articles/index");
  } catch (err) {
    console.log("could not able to delete", err);
  }
});

module.exports = router;
