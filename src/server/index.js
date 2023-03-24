import express from 'express'
import { connectDB } from './db.js'
import router from './router.js'
import cors from 'cors'
const app = express()
app.use(cors())

app.use(express.json())
app.use('/dumbs', router)

app.listen(3333, () => {
  console.log('listening on port 3333')
  connectDB()
})
