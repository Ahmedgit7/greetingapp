const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;

// MongoDB connection URL
const mongoUrl = 'mongodb://admin:password@mongo:27017';
const dbName = 'greetings';

// Middleware to parse JSON data
app.use(express.json());

// Serve HTML page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// API endpoint to store usernames in the database
app.post('/store-username', async (req, res) => {
    try {
        const name = req.body.name;

        // Connect to MongoDB
        const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
        const db = client.db('greetings');

        // Insert username into the collection
        await db.collection('usernames').insertOne({ name });

        // Close the database connection
        client.close();

        res.status(200).send('Username stored successfully!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

