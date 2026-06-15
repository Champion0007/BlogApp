const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const Blog = require("./models/blog");

const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Error:", error.message);
  });

const PORT = process.env.PORT || 8000;

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// Authentication Middleware
app.use(checkForAuthenticationCookie("token"));

// Static Files Middleware (IMPORTANT)
app.use(express.static(path.resolve("./public")));

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Home Route
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});

  return res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

// Routes
app.use("/user", userRoute);
app.use("/blog", blogRoute);

// Server
app.listen(PORT, () => {
  console.log(`Server listening on Port ${PORT}`);
});
