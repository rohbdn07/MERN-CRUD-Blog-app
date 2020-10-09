const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    studentname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phonenumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
