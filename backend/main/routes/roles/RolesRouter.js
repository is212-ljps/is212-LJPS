const express = require("express");
const router = express.Router();

var connection = require('../../../database/database')

router.post("/", function (req, res) {
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

router.delete("/:roleID", function (req, res) {
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

router.get('/', (req, res) => {
  connection.connect(err => {
    const getRoles = `SELECT * FROM job_role WHERE Is_Active=TRUE`
    connection.query(getRoles, (err, result) =>{
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

router.get('/:roleID', (req, res) => {
  let role_id = req.params.roleID
  connection.connect(err => {
    const getRoles = `SELECT * FROM job_role WHERE Job_Role_ID=${role_id}`
    connection.query(getRoles, (err, result) =>{
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

router.get('/:roleID/skills', (req, res) => {
  let roleID = req.params.roleID
  connection.connect(err => {
    const getSkills = `SELECT Skill_ID FROM job_role_skill WHERE Job_Role_ID=${roleID};`
    console.log(getSkills)
    connection.query(getSkills, (err, result) =>{
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

module.exports = router;
