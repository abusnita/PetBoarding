//const fs = require("file-system");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
console.log(MONGO_URI);
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const { customers } = require("./data");
console.log(customers);

const batchImport = async () => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("PetBoarding");

    await db.collection("customers").insertMany(customers);

    client.close();
    console.log("Data added successfully!");
  } catch (err) {
    console.log(err.stack);
  }
};

batchImport();
