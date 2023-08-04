const express = require('express');
const cors = require('cors');
const port = process.env.port | 5000;
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()

app.use(cors());
app.use(express.json());




// MongoDB Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jaehzkc.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // Database collections
        const todoCollection = client.db('Task-Manager').collection('tasks')

        // inserting todo data to database
        app.post('/tasks', async (req, res) => {
            const query = req.body;
            const result = await todoCollection.insertOne(query)
            res.send(result);
        })

        // api for data
        app.get('/tasks', async (req, res) => {
            const result = await todoCollection.find().toArray();
            res.send(result);
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


// server tests
app.get('/', (req, res) => {
    res.send('server running')
})

app.listen(port, () => {
    console.log(`server is running or port ${port}`)
})
