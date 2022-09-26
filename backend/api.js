const express = require("express");
const router = express.Router();

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ljps_db",
});

//------------- Crud of Skills ---------------------------------------------------------

router.post("/updateskill", function (req, res) {
  
  let skillTitle = req.body.skillTitle
  let skillDescription = req.body.skillDescription


  connection.connect((err) => {
    var sql = `INSERT into Skill (Skill_Name, Skill_Description, Is_Active) VALUES ('${skillTitle}', '${skillDescription}', TRUE );`
    connection.query(sql, function (err, result) {
      if (err){
        throw err
      }
      else{
        res.sendStatus(200);

      }
    });

  });

});

//

module.exports = router;
