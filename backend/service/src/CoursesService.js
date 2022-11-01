const utils = require('../../util')

function coursesService(database) {
  const coursesService = {};

  coursesService.getCourses = async () => {
    try {
      return await database.getCourses();
    } catch (err) {
      throw err;
    }
  };

  coursesService.getCoursesBySkill = async (skillId) => {
    if(!skillId){
      return false
    }
    try {
      return await database.getCoursesBySkill(skillId);
    } catch (err) {
      throw err;
    }
  };

  coursesService.getCoursesByMultipleSkill = async (skills) => {

    const courseBySkills = {};

    if(utils.checkLength(1,9999, skills)){
      return false
    }


    try {
      
      var courseDetails = await database.getCoursesByMultipleSkill(skills);
      courseBySkills.courseDetails = courseDetails;
      const courses = courseDetails.map(({ Course_ID }) => Course_ID);
      const coursesSkillsResult = await database.getCoursesSkills(courses);
      const courseSkills = coursesSkillsResult.map(
        ({ Skill_Name, Course_ID }) => {
          return { Skill_Name, Course_ID };
        }
      );

      for (let course of courseBySkills.courseDetails) {
        for (let skill of courseSkills) {
          if (skill.Course_ID == course.Course_ID) {
            if (courseDetails.skills) {
              if (!courseDetails.skills.includes(skill.Skill_Name)) {
                course.skills.push(skill.Skill_Name);
              }
            } else {
              course.skills = [skill.Skill_Name];
            }
          }
        }
      }
      
      return courseBySkills;
    } catch (err) {
      throw err;
    }
  };

  coursesService.getCoursesFromLearningJourney = async (learningJourneyId, isAdded) => {
    if(!learningJourneyId) return false

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

      if(!unaddedCourseIds.length) return []
      
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
