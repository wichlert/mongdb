const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;

// MongoDB connection
const url = "mongodb://localhost:27017"; // Change this if using MongoDB Atlas
const client = new MongoClient(url);
const dbName = "gym_db"; // Select the gym_db database

// Middleware
app.use(express.json());

// Route to find a user by name
app.get("/users/:name", async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("users");

    const userName = req.params.name;
    const user = await collection.findOne({ name: userName });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});