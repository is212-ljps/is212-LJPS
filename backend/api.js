const express = require("express");
const router = express.Router();

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ljps_db",
});

router.post("/updateskill", function (req, res) {
  console.log(req.body);

  connection.connect((err) => {
    var sql = "INSERT into Role VALUES ('2', 'Software Engineer')";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted, ID: " + result.insertId);
    });
  });

  res.sendStatus(200);
});

//

module.exports = router;
