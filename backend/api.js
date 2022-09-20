const express = require('express');
const router = express.Router();

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : 'spm_project'

  });



connection.connect((err) => {
    if (err) {
      console.log("Error occurred", err);
    } else {
      console.log("Connected to MySQL Server");
    }
});

router.get('/test', function (req, res) {
    console.log('test')
    res.sendStatus(200)
});



module.exports = router;
