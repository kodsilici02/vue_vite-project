import mongoose from 'mongoose'

const dumbSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
})

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  sections: [sectionSchema]
})
const sectionsSchema = mongoose.model('Blog', blogSchema)
const dumbsSchema = mongoose.model('dumb', dumbSchema)

export { dumbsSchema, sectionsSchema }
