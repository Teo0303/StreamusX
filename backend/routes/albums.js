const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3');

let db = new sqlite3.Database("../database/streamus.db");

//GET all albums in a range
router.get('/albums', (req, res, next) => {
    let sql = `SELECT * FROM album`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            return console.error(err.message);
        }
        res.json(rows);
    })
});

module.exports = router;
