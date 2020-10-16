const express = require("express");
const Article = require("./../models/article");
const Comment= require('../models/comment');
 
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
  res.render("show", {
     article: article,
     comment:article,
    });
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
     
    res.redirect('/');
  } catch (e) {
    res.render("new", { article: article });
  }
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

router.post('/articles/:id/comment', async (req,res)=>{
   //res.send("routhing is ok")
   
  try{
    const id = req.params.id;
    const post = await Article.findOne({_id:id});
    const comment = new Comment();
    comment.username=req.body.username;
    comment.content=req.body.content;
    comment.post=post._id;
    console.log(comment.post)
    await comment.save();
    //associate Article with comment
    post.comments.push(comment._id);
    await post.save();
    res.render('commentList',{
      comment:comment,
    })
    console.log('posted comment successful'+  res)

  } catch(err){
    console.log('there is error to comment ' + err)
  } 

})

router.get('/articles/:id/comment', async (req,res)=>{
  //res.send({ok:true})
   const id = req.params.id;
    const post = await Article.findOne({_id:id});
    res.render('commentList',{
       comment:post,
    }),
    console.log(post)
    //res.send(post)
    
})

module.exports = router;
