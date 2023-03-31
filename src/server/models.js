import mongoose from "mongoose";

const dumbSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sections: [sectionSchema],
});

//deneme
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  content: {
    // change "content" to "html"
    type: String,
    required: true,
  },
});

const sectionsSchema = mongoose.model("Blog", blogSchema);
const dumbsSchema = mongoose.model("dumb", dumbSchema);
const articlesSchema = mongoose.model("Article", articleSchema);

export { dumbsSchema, sectionsSchema, articlesSchema };
