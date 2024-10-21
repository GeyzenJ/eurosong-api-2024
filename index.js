// importeren van de express module in node_modules
const express = require('express');
const Database = require('./classes/database.js');

// aanmaken van een express app
const app = express();

// endpoints
app.get('/', (req, res) => {
    res.send("Hello world");
});

app.get('/api/artists', (req, res) => {
    const db = new Database();
    db.getQuery('SELECT * FROM artists').then((artists) => {
        res.send(artists);
    });
});

//ranking song_id, totaal punten, artiestNaam, songNaam
app.get('/api/ranking', (req, res) => {
    const db = new Database();
    db.getQuery(`SELECT s.song_id, s.name AS song_name, sum(vs.points) as points, a.name AS artist_name
                FROM votes AS vs
                INNER JOIN songs AS s ON vs.song_id = s.song_id
                INNER JOIN artists AS a ON s.artist_id = a.artist_id
                GROUP BY s.song_id 
                ORDER BY sum(vs.points) DESC;`).then((ranking) => {
        res.send(ranking);
    });
});

app.get('/api/songs', (req, res) => {
    const db = new Database();
    db.getQuery(`SELECT song_id, s.name  as songname, a.name as artistname
                FROM songs as s
                INNER JOIN artists as a on s.artist_id = a.artist_id;`).then((songs) => {
        res.send(songs);
    });
});



// Starten van de server en op welke poort de server moet luisteren
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});