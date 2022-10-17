const express = require("express");

function skillsRoutes(database) {
  const router = express.Router();
  router.get('/', async (req, res) => {
    try {
      const data = await database.getAllSkills();
      res.status(200).send({
        success: true,
        data: data
      });
    } catch (err) {
      console.log(err)
      res.status(500).send({
        success: false,
        message: "An error occured, please try again ",
      })
    }
  })

  router.get('/:skillID', async (req, res) => {
    var skillID = req.params.skillID
    try {
      const data = await database.getSkillById(skillID);
      res.status(200).send({
        success: true,
        data: data
      });
    } catch (err) {
      console.log(err)
      res.status(500).send({
        success: false,
        message: "An error occured, please try again ",
      })
    }
  })

  router.post("/", async (req, res) => {
    let skillName = req.body.skillName;
    let skillDescription = req.body.skillDescription;

    try {
      const data = await database.createSkill(skillName, skillDescription);
      res.status(201).send({
        success: true,
        message: "A new skill has been successfully created!",
      });
    } catch (err) {
      console.log(err)
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).send({
          success: false,
          message:
            "Skill Name currently exist, please use a different Skill Name. ",
        });
      } else {
        res.status(500).send({
          success: false,
          message: "An error occured, please try again.",
        });
      }
    }
  });

  router.delete("/:skillID", async (req, res) => {
    let skillID = req.params.skillID;

    try {
      const data = await database.deleteSkillById(skillID);
      res.status(200).send({
        success: true,
        message: "The skill has been successfully deleted!",
      });
    } catch (err) {
      console.log(err)
      res.status(500).send({
        success: false,
        message: "An error occured, please try again ",
      })
    }
  });

  router.put('/:skillID', async (req, res) => {
    const skillID = req.params.skillID
    const skillName = req.body.skillName
    const skillDescription = req.body.skillDescription

    try {
      const data = await database.updateSkillById(skillID, skillName, skillDescription);
      res.status(200).send({
        success: true,
        message: "Skill updated",
      });
    } catch (err) {
      console.log(err)
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).send({
          success: false,
          message:
            "Skill Name currently exist, please use a different Skill Name. ",
        });
      } else {
        res.status(500).send({
          success: false,
          message: "An error occured, please try again.",
        });
      }
    }
  })
  return router;
}

module.exports.skillsRoutes = skillsRoutes;