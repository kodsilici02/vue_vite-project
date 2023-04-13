import express, { request } from "express";
import AWS from "aws-sdk";
import multer from "multer";
import { articlesSchema } from "./models.js";
const router = express();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
  region: "eu-west-3", // Replace with your desired AWS region
});
const s3 = new AWS.S3();
const storage = multer.memoryStorage();
const upload = multer({ storage });
//Tag Filter
router.get("/tags/:tag", async (req, res) => {
  try {
    const page = req.query.p;
    const dataPerPage = req.query.dataPerPage;
    const tag = req.params.tag;
    const articles = await articlesSchema
      .find({ tags: tag })
      .skip(page * dataPerPage)
      .limit(dataPerPage);
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Post article
router.post("/articlepost", upload.single("file"), async (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file provided" });
  }
  const fileBuffer = Buffer.from(file.buffer);
  const fileName = Date.now() + "-" + file.originalname;
  const params = {
    Bucket: "myfckingbucket",
    Key: "images/" + fileName,
    Body: fileBuffer,
    acl: "public-read",
  };
  s3.upload(params, async (err, data) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Failed to upload file", error: err });
    }

    const imageUrl = data.Location; // Get the URL of the uploaded image from S3
    try {
      const article = await articlesSchema.create({
        date: req.body.date,
        title: req.body.title,
        imageUrl: imageUrl,
        content: req.body.content,
        tags: req.body.tags,
      });
      res.status(201).json(article);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
});
//article route
router.get("/articleget", async (req, res) => {
  try {
    const page = req.query.p;
    const dataPerPage = req.query.dataPerPage;
    const articles = await articlesSchema
      .find()
      .skip(page * dataPerPage)
      .limit(dataPerPage);
    res.status(200).json(articles);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

// article get by id
router.get("/articleget/:id", async (req, res) => {
  try {
    const article = await articlesSchema.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "article not found" });
    } else {
      res.status(200).json(article);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//article post
router.post("/articlepost2", async (req, res) => {
  try {
    const article = await articlesSchema.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
