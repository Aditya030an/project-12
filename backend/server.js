const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const eventRoutes = require("./routes/eventRoutes.js");
const emailRoutes = require("./routes/storeEmailRoutes.js")
const scrapeEvents = require("./scraper");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://adityaanu20023:Aditya123@cluster0.fu6v1.mongodb.net");

app.use("/api/events", eventRoutes);
app.use("/api/events", emailRoutes);

scrapeEvents();

app.get("/" , (req , res)=>{
  res.send("Api is working");
})

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
  // scrapeEvents(); // Run scraper when server starts
});
