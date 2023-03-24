import mongoose from 'mongoose'
import Grid from 'gridfs-stream'

export const connectDB = async () => {
  try {
    await mongoose
      .connect('mongodb+srv://safak:admin@deneme.yski9vy.mongodb.net/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(console.log('db connected'))
  } catch (e) {
    console.log(e)
  }
}
