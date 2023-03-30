import express from "express";
import { connectDB } from "./db.js";
import router from "./router.js";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
app.use("/dumbs", router);

app.listen(process.env.PORT, () => {
  console.log("listening on port 3333");
  connectDB();
});
