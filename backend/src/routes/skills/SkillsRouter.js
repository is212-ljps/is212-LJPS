const express = require("express");

function skillsRoutes(service) {
  const router = express.Router();
  router.get('/', async (req, res) => {
    try {
      const data = await service.getAllSkills();
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
      const data = await service.getSkillById(skillID);
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

  router.get('/:skillID/courses', async (req, res) => {
    let skillID = req.params.skillID
    try {
      const data = await service.getCoursesAssignedToSkill(skillID);
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
    let assignedCourses = req.body.assignedCourses;
    try {
      const data = await service.createSkill(skillName, skillDescription, assignedCourses);
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
      const data = await service.deleteSkillById(skillID);
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
    const assignedCourses = req.body.assignedCourses
    
    try {
      const data = await service.updateSkillById(skillID, skillName, skillDescription, assignedCourses);
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