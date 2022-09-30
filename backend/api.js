const express = require('express');
const router = express.Router();

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : 'ljps_db'

  });



//------------- Crud of Roles ---------------------------------------------------------

router.post("/deleterole", function (req, res) {
  let roleName = req.body.roleName;


  connection.connect((err) => {
    var delete_sql = `DELETE FROM job_role WHERE Job_Role_Name="${roleName}" ;`;
    connection.query(delete_sql, function (err, result) {
      if (err) {
        res.send({
          success: false,
          message: "An error occured, please try again ",
        });
      } else {
        res.send({
          success: true,
          message: "",
        });
      }
    });
  });
});





module.exports = router;
