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
const htmlSchema = new mongoose.Schema({
  html: {
    // change "content" to "html"
    type: String,
    required: true,
  },
});

const sectionsSchema = mongoose.model("Blog", blogSchema);
const dumbsSchema = mongoose.model("dumb", dumbSchema);
const htmlsSchema = mongoose.model("html", htmlSchema);

export { dumbsSchema, sectionsSchema, htmlsSchema };
