const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('../database/streamus.db');

// GET special album with special id          
router.get("/albums/:id", (req, res) => {
    let sql = `SELECT * FROM album WHERE album_id = ?`;
    let id = req.params.id;

    db.get(sql, [id], (err, row) => {
        if (err) {
            return console.error(err.message);
        }
        if (row) {
            console.log(row.album_id, row.album_name);
            res.json(row);
        } else {
            console.log("Not Found");
            res.send(404);
        }
    });
});

module.exports = router;
