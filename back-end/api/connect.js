import { MongoClient } from "mongodb";

const URI =
  "mongodb+srv://mmichelato1508:ftfAsjvATA6kbg23@cluster0.rfid0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(URI);

export const db = client.db("spotify");

// const songCollection = await db.collection("songs").find({}).toArray();

// console.log(songCollection);
