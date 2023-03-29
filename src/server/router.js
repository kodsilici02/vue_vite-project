import express from "express";
import { dumbsSchema, sectionsSchema } from "./models.js";

const router = express.Router();
//test
router.post("/blogpost", async (req, res) => {
  try {
    const blog = await sectionsSchema.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.get("/blogget", async (req, res) => {
  try {
    const page = req.query.p || 0;
    const dataPerPage = req.query.d || 1;
    const sections = await sectionsSchema
      .find()
      .skip(page * dataPerPage)
      .limit(dataPerPage);
    res.status(200).json(sections);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});
router.get("/blogget/:id", async (req, res) => {
  try {
    const blog = await sectionsSchema.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//working
router.post("/post", async (req, res) => {
  try {
    const dumb = await dumbsSchema.create(req.body);
    res.status(201).json(dumb);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.get("/", async (req, res) => {
  try {
    const dumbs = await dumbsSchema.find();
    res.status(200).json(dumbs);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, iq } = req.body;
    const updateddumb = await dumbsSchema.findByIdAndUpdate(
      id,
      { name, iq },
      { new: true }
    );
    res.status(201).json(updateddumb);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteddumb = await dumbsSchema.findByIdAndDelete(id);
    res.status(200).json(deleteddumb);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
