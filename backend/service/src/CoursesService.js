function coursesService(database){
  const coursesService = {}

  coursesService.getCourses = async () => {
    try {
      return await database.getCourses();
    } catch (err) {
      throw err;
    }
  }

  coursesService.getCoursesBySkill = async (skillId) => {
    try {
      return await database.getCoursesBySkill(skillId)
    } catch (err) {
      throw err;
    }
  }

  coursesService.getCoursesByMultipleSkill = async (skills) => {
    try {
      return await database.getCoursesByMultipleSkill(skills);
    } catch (err) {
      throw err;
    }
  }


  return coursesService;
}



module.exports = coursesService;