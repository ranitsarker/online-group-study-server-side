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
    const submittedAssignment = client.db('onlineGroupStudyDB').collection('submitted');

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
    // single assignment
    app.get('/assignment/:id', async (req, res) => {
      const assignmentId = req.params.id;
    
      try {
        const assignment = await assignmentCollection.findOne({ _id: new ObjectId(assignmentId) });
    
        if (assignment) {
          return res.status(200).json(assignment);
        } else {
          return res.status(404).json({ message: 'Assignment not found' });
        }
      } catch (error) {
        console.error('Error getting assignment by ID:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    });
    
    // update assignment get
    app.get('/update-assignment/:id', async(req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id)}
      const assignment = await assignmentCollection.findOne(query)
      res.send(assignment);
    })

    // update assignment put 
    app.put('/update-assignment/:id', async (req, res) => {
      const id = req.params.id;
      const updatingAssignment = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateAssignment = {
        $set: {
          title: updatingAssignment.title,
          description: updatingAssignment.description,
          marks: updatingAssignment.marks,
          difficulty: updatingAssignment.difficulty,
          thumbnailUrl: updatingAssignment.thumbnailUrl,
          createdBy: updatingAssignment.createdBy,
        }
      };
      const result = await assignmentCollection.updateOne(filter, updateAssignment, options);
      res.send(result);
    });
    
    // Endpoint to handle assignment submission
    app.post('/assignment-submission', async (req, res) => {
      const { pdfLink, quickNote, userEmail, assignmentTitle, assignmentMarks } = req.body;
    
      // Ensure that pdfLink, quickNote, and userEmail are provided
      if (!pdfLink || !quickNote || !userEmail) {
        return res.status(400).json({ message: 'All fields are required' });
      }
    
      // Create a new assignment submission object
      const submission = {
        pdfLink,
        quickNote,
        userEmail,
        assignmentTitle,
        assignmentMarks,
        status: 'pending',
      };
    
      try {
        const result = await submittedAssignment.insertOne(submission);
        if (result.insertedId) {
          return res.status(201).json({ message: 'Assignment submitted successfully' });
        } else {
          return res.status(500).json({ message: 'Failed to insert assignment submission' });
        }
      } catch (error) {
        console.error('Error submitting assignment:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }
    });

    // submitted assignment get endpoint use by use with status
    
    app.get('/submitted-assignment/:userEmail', async (req, res) => {
      const userEmail = req.params.userEmail;
    
      try {
        const submittedAssignments = await submittedAssignment
          .find({ userEmail, status: 'pending' }) // Filter by user email and pending status
          .toArray();
    
        res.status(200).json(submittedAssignments);
      } catch (error) {
        console.error('Error fetching pending submitted assignments:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    });
    


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
