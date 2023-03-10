import express from "express";
import connect from "./database/conn.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
connect();
const port = process.env.PORT || 8080;

import Post from "./model/postModel.js";

app.get("/", (req, res) => {
  try {
    Post.find({})
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        res.status(408).json({ error });
      });
  } catch (error) {
    res.json({ error });
  }
});

app.post("/uploads", async (req, res) => {
  const body = req.body;
  try {
    const newImg = await Post.create(body);
    newImg.save();
    res.status(201).json({ msg: "New Image uploaded" });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost ${port}`);
});
