require("dotenv").config({ path: ".env" });

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 3000;
const posts = require("./src/nodejs/routes/posts");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });

    console.log("Yeay MongoDB has been connected!");
  } catch (error) {
    console.log(`Nay to connect MongoDB with error: ${error}`);
  }
})();

const app = express();
app.use(logger("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:8001" }));
app.get("/", (req, res) => {
  res.json({
    author: "Abdur Rohman",
    github: "https://github.com/abdur-rohman2883",
    linkedin: "https://www.linkedin.com/in/abdur-rohman-2b1455140/",
  });
});
app.use("/api/v1/posts", posts);
app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: "Oops page not fund",
  });
});

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
