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

router.post("/createskill", function (req, res) {

  let skillName = req.body.skillName
  let skillDescription = req.body.skillDescription

  connection.connect((err) => {
    var insert_sql = `INSERT into Skill (Skill_Name, Skill_Description, Is_Active) VALUES ('${skillName}', '${skillDescription}', TRUE );`;
    connection.query(insert_sql, function (err, result) {
      if (err) {
        if (err.code == "ER_DUP_ENTRY") {
          res.send({
            success: false,
            message:
              "Skill Name currently exist, please use a different Skill Name. ",
          });
        } else {
          res.send({
            success: false,
            message: "An error occured, please try again.",
          });
        }
      } else {
        res.send({
          success: true,
          message: "A new skill has been successfully created!",
        });
      }
    });
  });
});

router.post("/deleteskill", function (req, res) {
  let skillName = req.body.skillName;


  connection.connect((err) => {
    var insert_sql = `INSERT into Skill (Skill_Name, Skill_Description, Is_Active) VALUES ('${skillName}', '${skillDescription}', TRUE );`
    connection.query(insert_sql, function (err, result) {
      if (err) {
        if (err.code == 'ER_DUP_ENTRY') {
          res.send({
            success: false,
            message: 'Skill Name currently exist, please use a different Skill Name. '
          })
        }
        else {
          res.send({
            success: false,
            message: "An error occured, please try again."
          })
        }
      }
      else {
        res.send({
          success: true,
          message: "A new skill has been successfully created!"
        });
      }
    });
  })
})

router.post("/createrole", function (req, res) {
  let roleName = req.body.roleName;
  let roleDescription = req.body.roleDescription;
  let department = req.body.department;

  connection.connect((err) => {
    var insert_sql = `INSERT into job_role (Job_Role_Name, Job_Role_Description, Job_Department, Is_Active) VALUES ('${roleName}', '${roleDescription}', '${department}' , TRUE );`;
    connection.query(insert_sql, function (err, result) {
      if (err) {
        if (err.code == "ER_DUP_ENTRY") {
          res.send({
            success: false,
            message:
              "Role Name currently exist, please use a different Skill Name. ",
          });
        } else {
          res.send({
            success: false,
            message: "An error occured, please try again.",
          });
        }
      } else {
        res.send({
          success: true,
          message: "A new role has been successfully created!",
        });
      }
    });
  });
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
