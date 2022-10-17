const express = require("express");

function rolesRoutes(database) {
  const router = express.Router();

  router.post("/", async (req, res) => {
    let roleName = req.body.roleName;
    let roleDescription = req.body.roleDescription;
    let department = req.body.jobDepartment;
    const assignedSkills = req.body.skills

    try {
      const data = await database.createRole(roleName, roleDescription, department);
      const result = await database.assignSkillsToRoles(assignedSkills, data);
      
      res.status(201).send({
        success: true,
        message: "A new role has been successfully created!"
      });
    } catch (err) {
      console.log(err)
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).send({
          success: false,
          message: "Role Name currently exist, please use a different Skill Name. "
        });
      } else {
        res.status(500).send({
          success: false,
          message: "An error occured, please try again.",
        });
      }
    }  
  });
  
  router.delete("/:roleID", async (req, res) => {
    let roleID = req.params.roleID;
  
    try {
      const data = await database.deleteRoleById(roleID);
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
  
  router.get('/', async (req, res) => {
    try {
      const data = await database.getAllRoles();
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
  
  router.get('/:roleID', async (req, res) => {
    let roleID = req.params.roleID
    try {
      const data = await database.getRoleById(roleID);
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
  
  router.get('/:roleID/skills', async (req, res) => {
    let roleID = req.params.roleID
    try {
      const data = await database.getSkillsAssignedToRole(roleID);
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
  
  
  router.put('/:roleID', async (req, res) => {
    const roleID = req.params.roleID
    const roleName = req.body.roleName
    const roleDescription = req.body.roleDescription
    const jobDepartment = req.body.jobDepartment
    const assignedSkills = req.body.skills

    console.log(jobDepartment)
    try {
      const data = await database.updateRoleDetails(roleID, roleName, roleDescription, jobDepartment);
      await database.removeSkillsFromRole(roleID)
      await database.assignSkillsToRoles(assignedSkills, roleID);
      res.status(200).send({
        success: true,
        message: "Role updated."
      });
    } catch (err) {
      console.log(err)
      if (err.code == "ER_DUP_ENTRY") {
        res.status(409).send({
          success: false,
          message: "Role Name currently exist, please use a different Skill Name. "
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


module.exports.rolesRoutes = rolesRoutes;