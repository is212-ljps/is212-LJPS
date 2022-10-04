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

router.post("/skills", function (req, res) {
  let skillName = req.body.skillName;
  let skillDescription = req.body.skillDescription;

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

router.delete("/skills/:skillID", function (req, res) {
  let skillID = req.params.skillID;

  connection.connect((err) => {
    var update_sql = `UPDATE Skill SET Is_Active=${false} WHERE Skill_ID=${skillID};`;
    console.log(update_sql);
    connection.query(update_sql, function (err, result) {
      if (err) {
        res.send({
          success: false,
          message: "An error occured, please try again.",
        });
      } else {
        res.send({
          success: true,
          message: "The skill has been successfully deleted!",
        });
      }
    });
  });
});

router.post("/roles", function (req, res) {
  let roleName = req.body.roleName;
  let roleDescription = req.body.roleDescription;
  let department = req.body.jobDepartment;

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

router.delete("/roles/:roleID", function (req, res) {
  let roleID = req.params.roleID;
  
  connection.connect((err) => {
    var update_sql = `UPDATE job_role SET Is_Active=${false} WHERE Job_Role_ID=${roleID}`;
    connection.query(update_sql, function (err, result) {
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

router.get('/roles', (req, res) => {
  connection.connect(err => {
    const getRoles = `SELECT * FROM job_role WHERE Is_Active=TRUE`
    connection.query(getRoles, (err, result) =>{
      console.log(err)
      console.log(result)
      if (err) {
        res.send({
          success: false,
          message: "An error occured, please try again ",
        });
      } else {
        res.send({
          success: true,
          message: "",
          data: result
        });
      } 
    })
  })
})

router.get('/skills', (req, res) => {
  connection.connect(err => {
    const getSkills = `SELECT * FROM skill WHERE Is_Active=TRUE`
    connection.query(getSkills, (err, result) => {
      console.log(err)
      console.log(result)
      if (err) {
        res.send({
          success: false,
          message: "An error occured, please try again ",
        });
      } else {
        res.send({
          success: true,
          message: "",
          data: result
        });
      }
    })
  })
})

router.put('/roles/:roleID', (req, res) => {
  const roleID = req.params.roleID
  const roleName = req.body.roleName
  const roleDescription = req.body.roleDescription
  const jobDepartment = req.body.jobDepartment
  connection.connect(err => {
    const updateRole =
      `UPDATE job_role SET Job_Role_Name='${roleName}', 
      Job_Role_Description='${roleDescription}',
      Job_Department='${jobDepartment}'
      WHERE Job_Role_ID=${roleID}`

    connection.query(updateRole, (err, result) => {
      console.log(err)
      console.log(result)
      if (err) {
        res.send({
          success: false,
          message: "An error occured, please try again ",
        });
      } else {
        res.send({
          success: true,
          message: "Role updated"
        });
      }
    })
  })
})

router.put('/skills/:skillID', (req, res) => {
  const skillID = req.params.skillID
  const skillName = req.body.skillName
  const skillDescription = req.body.skillDescription
  connection.connect(err => {
    const updateSkill =
      `UPDATE skill SET Skill_Name='${skillName}', 
      Skill_Description='${skillDescription}'
      WHERE Skill_ID=${skillID}`
    console.log(updateSkill)
    connection.query(updateSkill, (err, result) => {
      console.log(err)
      console.log(result)
      if (err) {
        res.send({
          success: false,
          message: "An error occured, please try again ",
        });
      } else {
        res.send({
          success: true,
          message: "Skill updated"
        });
      }
    })
  })
})

module.exports = router;
