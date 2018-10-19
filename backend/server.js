const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

let db = new sqlite3.Database('./database/streamus.db');

app.use("/data", express.static("./database"));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/albums', (req, res) => {
    let sql = `SELECT * FROM album`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        return console.error(err.message);
      }
      res.json(rows);
    });
})

app.get("/albums/:id/songs", (req, res) => {
  let id = req.params.id;
  let sql = `SELECT al.album_id, al.artist_id, al.album_name, al.album_cover, s.isExplicit, s.song_name, s.song_src, ar.artist_name, ar.artist_id
               FROM album al 
               JOIN song s, artist ar 
               WHERE al.album_id = s.album_id
               AND al.artist_id = ar.artist_id
               AND s.album_id = ${id};
    `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    const album = rows.find(row => row.album_name);
    res.json({
        info: {
            name: album.album_name,
            artist: album.artist_name,
            cover: album.album_cover
        },
        songs: rows
    });
  });
});



const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port 3000...') );