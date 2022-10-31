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
    if(!skillId){
      return false
    }
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
      const learningJourneyAllCourses = await database.getCoursesByMultipleSkill(learningJourneySkillIds)
      const unaddedCourseIds = learningJourneyAllCourses.filter((item) => !existingIds[item.Course_ID]).map(({ Course_ID }) => Course_ID)

      if(!unaddedCourseIds.length){
        return []
      }
      
      const unaddedCoursesWithSkills = await database.getCoursesSkills(unaddedCourseIds)

      const unaddedCourses = {}
      unaddedCoursesWithSkills.forEach((item) => {
        const { Course_ID, Course_Name, Course_Desc, Course_Status, Course_Type, Course_Category, Skill_Name } = item
        if (!unaddedCourses[Course_ID]) {
          unaddedCourses[Course_ID] = { Course_ID, Course_Name, Course_Desc, Course_Status, Course_Type, Course_Category, Skills: [Skill_Name] }
          return
        }
        unaddedCourses[Course_ID].Skills.push(Skill_Name)
      })

      return Object.values(unaddedCourses)
    } catch (err) {
      throw err
    }
  }

  return coursesService;
}

module.exports = coursesService;