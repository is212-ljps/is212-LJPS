const utils = require('../../util')

function skillsService(database){
  const skillsService = {}

  skillsService.getAllSkills = async () => {
    try {
      return await database.getAllSkills();
    } catch (err) {
      throw err;
    }
  }

  skillsService.getInactiveSkills = async () => {
    try {
      return await database.getInactiveSkills();
    } catch (err) {
      throw err;
    }
  }

  skillsService.getSkillById = async (skillId) => {
    if(!skillId){
      return false
    }
    try {
      return await database.getSkillById(skillId)
    } catch (err) {
      throw err;
    }
  }

  skillsService.getSkillByMultipleId = async (skills) => {
    try {
      return await database.getSkillByMultipleId (skills)
    } catch (err) {
      throw err;
    }
  } 

  skillsService.getCoursesAssignedToSkill = async (skillId) => {
    if(!skillId){
      return false
    }
    try {
      return await database.getCoursesAssignedToSkill(skillId)
    } catch (err) {
      throw err;
    }
  }

  skillsService.createSkill = async (skillName, skillDescription, assignedCourses) => {
    if(!skillName || !assignedCourses){
      return false
    } else if (utils.checkLength(5,50, skillName) || utils.checkLength(0,300, skillDescription) || utils.checkLength(1,9999, assignedCourses)) {
      return false
    }

    try {
      const data = await database.createSkill(skillName, skillDescription);
      if (assignedCourses) {
        await database.assignCoursesToSkills(assignedCourses, data.insertId)
      }
      return data.insertId;
    } catch (err) {
      throw err;
    }
  }

  skillsService.deleteSkillById = async (skillId) => {
    if(!skillId){
      return false
    }
    try {
      return await database.deleteSkillById(skillId)
    } catch (err) {
      throw err;
    }
  }

  skillsService.updateSkillById = async (skillId, skillName, skillDescription, assignedCourses) => {
    if(!skillId || !skillName || !assignedCourses){
      return false
    } else if (utils.checkLength(5,50, skillName) || utils.checkLength(0,300, skillDescription) || utils.checkLength(1,9999, assignedCourses)) {
      return false
    }
    try {
      const data = await database.updateSkillById(skillId, skillName, skillDescription);
      await database.removeCoursesFromSkill(skillId)
      await database.assignCoursesToSkills(assignedCourses, skillId)
      return data;
    } catch (err) {
      throw err;
    }
  }

  return skillsService;
}

module.exports = skillsService;