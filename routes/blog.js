const { Router } = require("express");
const Blog = require("../models/blog");
//multer
const multer = require("multer");
const path = require("path");
const router = Router();

//diskStorage

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", { user: req.user });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  try {
    const { title, body } = req.body;

    const blog = await Blog.create({
      title,
      body,
      createdBy: req.user._id,
      coverImageURL: `/uploads/${req.file.filename}`,
    });

    return res.redirect(`/`);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
});
module.exports = router;
