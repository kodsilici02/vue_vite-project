import mongoose from "mongoose";
//deneme
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  content: {
    // change "content" to "html"
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const articlesSchema = mongoose.model("Article", articleSchema);

export { articlesSchema };
