const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
let db;
let passwordsCollection;

client.connect()
    .then(() => {
        db = client.db(dbName);
        passwordsCollection = db.collection('passwords');
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error(err));

app.use(bodyParser.json());
app.use(cors());

// GET API : To get all the passwords
app.get('/', async (req, res) => {
    try {
        const passwords = await passwordsCollection.find().toArray();
        res.status(200).json(passwords);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch passwords' });
    }
});

// POST API : To create a new password entry
app.post('/', async (req, res) => {

    try {
        const result = await passwordsCollection.insertOne(req.body);
        res.status(201).json({ message: 'Password added successfully', id: result.insertedId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add password' });
    }
});

// PUT API : To update an existing password entry
app.put('/:uuid', async (req, res) => {
    const { uuid } = req.params;
    // const { title, password } = req.body;

    // if (!title && !password) {
    //     return res.status(400).json({ error: 'At least one field (title or password) is required to update' });
    // }

    try {
        const updateFields = {};
        if (title) updateFields.title = title;
        if (password) updateFields.password = password;

        const result = await passwordsCollection.updateOne(
            { uuid },
            { $set: updateFields }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Password not found' });
        }

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update password' });
    }
});

// DELETE API : To delete a password entry
app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(req.params);

    try {
        const result = await passwordsCollection.deleteOne({ id });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Password not found' });
        }

        res.status(200).json({ message: 'Password deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete password' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
