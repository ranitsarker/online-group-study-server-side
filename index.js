const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Configuration
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wgcoqid.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const assignmentCollection = client.db('onlineGroupStudyDB').collection('assignments');

    // Create a new endpoint for creating assignments
    app.post('/create-assignment', async (req, res) => {
      const { title, description, marks, difficulty, dueDate, thumbnailUrl, createdBy } = req.body;

      if (!title || !description || !marks || !difficulty || !dueDate || !thumbnailUrl || !createdBy) {
          return res.status(400).json({ message: 'All fields are required' });
      }

      try {
          const result = await assignmentCollection.insertOne({
              title,
              description,
              marks,
              difficulty,
              dueDate,
              thumbnailUrl,
              createdBy,
          });

          if (result.insertedId) {
              return res.status(201).json({ message: 'Assignment created successfully' });
          }
      } catch (error) {
          console.error('Error creating assignment:', error);
          return res.status(500).json({ message: 'Internal server error' });
      }
    });
    // to get all assignment
    app.get('/all-assignment', async(req, res) => {
      const cursor = assignmentCollection.find();
      const result = await cursor.toArray();
      res.send(result);
  })





    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

// Define other routes and endpoints here

app.get('/', (req, res) => {
    res.send('Online group study is running');
})

app.listen(port, () => {
    console.log(`Online group study is running on port: ${port}`);
})
