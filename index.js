const categories = require("./routes/categories");
const foods = require("./routes/foods");
const mongoose = require("mongoose");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/categories", categories);
app.use("/api/foods", foods);

mongoose
  .connect("mongodb://localhost/intensive-foods")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.err("Could not connect to MongoDB", err));

app.listen(8000, () => console.log("Listening on port 8000."));
