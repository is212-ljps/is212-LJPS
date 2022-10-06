const express = require("express");
const router = express.Router();

var connection = require('../../../database/database')

router.get('/', (req, res) => {
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

router.post("/", function (req, res) {
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

router.delete("/:skillID", function (req, res) {
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

router.put('/:skillID', (req, res) => {
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
