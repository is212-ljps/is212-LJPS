function skillsService(database){
  const skillsService = {}

  skillsService.getAllSkills = async () => {
    try {
      return await database.getAllSkills();
    } catch (err) {
      throw err;
    }
  }

  skillsService.getSkillById = async (skillId) => {
    try {
      return await database.getSkillById(skillId)
    } catch (err) {
      throw err;
    }
  }

  skillsService.getCoursesAssignedToSkill = async (skillId) => {
    try {
      return await database.getCoursesAssignedToSkill(skillId)
    } catch (err) {
      throw err;
    }
  }

  skillsService.createSkill = async (skillName, skillDescription, assignedCourses) => {

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
    try {
      return await database.deleteSkillById(skillId)
    } catch (err) {
      throw err;
    }
  }

  skillsService.updateSkillById = async (skillId, skillName, skillDescription, assignedCourses) => {
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