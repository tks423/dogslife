const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();

// Create MySQL connection
const db = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: 'password',
    database: 'my_db'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database!');
});

// Parse application/json requests
app.use(bodyParser.json());

// Endpoint to list an owner's dogs
app.get('/owners/:ownerId/dogs', (req, res) => {
    const ownerId = req.params.ownerId;
    const sql = `SELECT * FROM dogs WHERE owner_id = ${ownerId}`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

// Endpoint to list a dog's vets
app.get('/dogs/:dogId/vets', (req, res) => {
    const dogId = req.params.dogId;
    const sql = `SELECT * FROM vets WHERE id IN (SELECT vet_id FROM dog_vet WHERE dog_id = ${dogId})`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

// Endpoint to list available vets
app.get('/vets', (req, res) => {
    const sql = `SELECT * FROM vets WHERE id NOT IN (SELECT vet_id FROM dog_vet)`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

// Endpoint to create a new owner
app.post('/owners', (req, res) => {
    const owner = req.body;
    const sql = `INSERT INTO owners (name, address) VALUES ('${owner.name}', '${owner.address}')`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json({ id: result.insertId });
    });
});

// Endpoint to update an owner
app.put('/owners/:ownerId', (req, res) => {
    const ownerId = req.params.ownerId;
    const owner = req.body;
    const sql = `UPDATE owners SET name = '${owner.name}', address = '${owner.address}' WHERE id = ${ownerId}`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json({ success: true });
    });
});

// Endpoint to delete an owner
app.delete('/owners/:ownerId', (req, res) => {
    const ownerId = req.params.ownerId;
    const sql = `DELETE FROM owners WHERE id = ${ownerId}`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json({ success: true });
    });
});

// Endpoint to create a new dog
app.post('/dogs', (req, res) => {
    const dog = req.body;
    const sql = `INSERT INTO dogs (name, breed, owner_id) VALUES ('${dog.name}', '${dog.breed}', ${dog.owner_id})`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json({ id: result.insertId });
    });
});

// Endpoint to create a new dog
app.post('/dogs', (req, res) => {
    const { name, breed, owner_id } = req.body;
    const sql = `INSERT INTO dogs (name, breed, owner_id) VALUES (?, ?, ?)`;
    const values = [name, breed, owner_id];
    db.query(sql, values, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

// Endpoint to update a dog
app.put('/dogs/:id', (req, res) => {
    const id = req.params.id;
    const { name, breed, owner_id } = req.body;
    const sql = `UPDATE dogs SET name=?, breed=?, owner_id=? WHERE id=?`;
    const values = [name, breed, owner_id, id];
    db.query(sql, values, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});

// Endpoint to delete a dog
app.delete('/dogs/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM dogs WHERE id = ?`;
    db.query(sql, id, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
});


// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});
