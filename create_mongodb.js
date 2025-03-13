const { MongoClient } = require("mongodb");

// Replace with your MongoDB connection URL
const uri = "mongodb://localhost:27017"; 

// Database name
const dbName = "gym_db";

async function connectDB() {
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(dbName);
        console.log(`Database "${dbName}" created!`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    } finally {
        await client.close();
    }
}


async function createCollection() {
  const client = new MongoClient(uri);

  try {
      await client.connect();
      console.log("Connected to MongoDB");

      const db = client.db(dbName);
      const collection = db.collection("users");

      const sampleData = [
          { name: "Akeera", age: 25 },
          { name: "Tonk", age: 30 }
      ];

      await collection.insertMany(sampleData);
      console.log("Collection 'users' created and data inserted!");
  } catch (error) {
      console.error(error);
  } finally {
      await client.close();
  }
}


connectDB();
createCollection();