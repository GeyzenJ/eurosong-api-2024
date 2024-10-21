// importeren van de express module in node_modules
const express = require('express');
// aanmaken van een express app
const app = express();

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