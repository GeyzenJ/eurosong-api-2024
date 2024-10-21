// importeren van de express module in node_modules
const express = require('express');
const mysql = require('mysql2/promise');

// aanmaken van een express app
const app = express();

// Create the connection to database
const connect = async () => {
   const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'eurosongdb',
    port: 3306,
  });

  const [rows ] = await connection.execute('SELECT * FROM artists');
  console.log(rows);
}
connect();

// endpoints
app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/api/artists', (req, res) => {
    res.send([
        "JB",
        "Beyonce",
    ]);
});

// Starten van de server en op welke poort de server moet luisteren
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});