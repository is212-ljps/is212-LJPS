const express = require("express");
const router = express.Router();

var connection = require('../../../database/database')

router.post("/", function (req, res) {
  let roleName = req.body.roleName;
  let roleDescription = req.body.roleDescription;
  let department = req.body.jobDepartment;
  const assignedSkills = req.body.skills

  connection.connect((err) => {
    var insert_sql = `INSERT into job_role (Job_Role_Name, Job_Role_Description, Job_Department, Is_Active) VALUES ('${roleName}', '${roleDescription}', '${department}' , TRUE );`
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
        var assignSkillsSql = `INSERT into job_role_skill (Job_Role_ID, Skill_ID) VALUES `
        assignedSkills.forEach((item) => {
          assignSkillsSql += `(${result.insertId}, ${item}), `
        })
        assignSkillsSql = assignSkillsSql.slice(0, -2) + `;`
        connection.query(assignSkillsSql, (err, result) => {
          if (err) {
            res.send({
              success: false,
              message: "An error occured, please try again.",
            });
            return
          }
          res.send({
            success: true,
            message: "A new role has been successfully created!",
          });
        })

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
    connection.query(getRoles, (err, result) => {
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
    const getRoles = `SELECT * FROM job_role WHERE Job_Role_ID=${role_id} AND Is_Active= TRUE`
    connection.query(getRoles, (err, result) => {
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
    const getSkills = `SELECT  job_role_skill.Job_Role_ID ,skill.Skill_ID , skill.Skill_Name, skill.Skill_Description
    FROM job_role_skill
    INNER JOIN skill ON skill.Skill_ID=job_role_skill.Skill_ID
    WHERE skill.Is_Active= TRUE AND Job_Role_ID=${roleID};`

    connection.query(getSkills, (err, result) => {
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


router.put('/:roleID', (req, res) => {
  const roleID = req.params.roleID
  const roleName = req.body.roleName
  const roleDescription = req.body.roleDescription
  const jobDepartment = req.body.jobDepartment
  const assignedSkills = req.body.skills
  connection.connect(err => {
    const updateRole =
      `UPDATE job_role SET Job_Role_Name='${roleName}', 
      Job_Role_Description='${roleDescription}',
      Job_Department='${jobDepartment}'
      WHERE Job_Role_ID=${roleID}`

    connection.query(updateRole, (err, result) => {
      if (err) {
        res.send({
          success: false,
          message: "An error occured, please try again ",
        });
      } else {
        var deleteSkillsSql = `DELETE FROM job_role_skill WHERE Job_Role_ID=${roleID}`
        connection.query(deleteSkillsSql, (err, result) => {
          if (err) {
            res.send({
              success: false,
              message: "An error occured, please try again.",
            });
            return
          } else {
            var assignSkillsSql = `INSERT into job_role_skill (Job_Role_ID, Skill_ID) VALUES `
            assignedSkills.forEach((item) => {
              assignSkillsSql += `(${roleID}, ${item}), `
            })
            assignSkillsSql = assignSkillsSql.slice(0, -2) + `;`
            connection.query(assignSkillsSql, (err, result) => {
              if (err) {
                res.send({
                  success: false,
                  message: "An error occured, please try again.",
                });
                return
              }
              res.send({
                success: true,
                message: "Role updated",
              });
            })
          }
        })
      }
    })
  })
})

module.exports = router;