function coursesService(database) {
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

  coursesService.getUnaddedCoursesFromLearningJourney = async (learningJourneyId, isAdded) => {
    try {
      if (isAdded == "true") {
        return await database.getLearningJourneyCourses(learningJourneyId)
      }  
      const existingIds = {}
      const learningJourneyCourses = await database.getLearningJourneyCourses(learningJourneyId)
      learningJourneyCourses.forEach(({ Course_ID }) => { existingIds[Course_ID] = true })
      const learningJourneySkills = await database.getLearningJourneySkills(learningJourneyId)
      const learningJourneySkillIds = learningJourneySkills.map(({ Skill_ID }) => Skill_ID).join(",")
      const learningJourneyAllCourses = await database.getCoursesBySkills(learningJourneySkillIds)
      const unaddedCourses = learningJourneyAllCourses.filter((item) => !existingIds[item.Course_ID])
      return unaddedCourses
    } catch (err) {
      throw err
    }
  }

  return coursesService;
}

module.exports = coursesService;