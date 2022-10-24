const utils = require('../../util')

function learningJourneyService(database){
  const learningJourneyService = {}

  learningJourneyService.createLearningJourney = async (learningJourneyName, staffId, jobRoleId, courses, skillId) => {
    if(!learningJourneyName || !staffId || !jobRoleId || !courses || !skillId){
      return false
    } else if (utils.checkLength(5,20,learningJourneyName) || utils.checkLength(1,9999,courses)) {
      return false
    }
    try {
      const learningJourneyId = await database.createLearningJourney(learningJourneyName, staffId, jobRoleId);
      await database.createLearningJourneySkill(learningJourneyId, skillId);
      await database.createLearningJourneyCourse(learningJourneyId, courses);
      console.log(learningJourneyId)
      return learningJourneyId;
    } catch (err) {
      throw err;
    }
  }

  learningJourneyService.deleteLearningJourney = async (learningJourneyId) => {
    try {
      return await database.deleteLearningJourney(learningJourneyId)
    }
    catch (err) {
      throw err
    }
  }

  learningJourneyService.getLearningJourney = async (learningJourneyId) => {
    if(!learningJourneyId){
      return false
    }
    try {
      const learningJourneyResult = await database.getLearningJourney(learningJourneyId);
      learningJourney.Learning_Journey_ID = learningJourneyResult[0].Learning_Journey_ID;
      learningJourney.Learning_Journey_Name = learningJourneyResult[0].Learning_Journey_Name;

      const learningJourneyCoursesResult = await database.getLearningJourneyCourses(learningJourneyId);
      learningJourney.courses = learningJourneyCoursesResult;

      const courses = learningJourneyCoursesResult.map(({ Course_ID }) => Course_ID);

      const learningJourneySkillsResult = await database.getLearningJourneySkills(learningJourneyId)

      learningJourney.skills = learningJourneySkillsResult
      const coursesSkillsResult = await database.getCoursesSkills(courses);

      const courseSkills = coursesSkillsResult.map(
        ({ Skill_Name, Course_ID }) => {
          return { Skill_Name, Course_ID };
        }
      );

      for (let course of learningJourney.courses) {
        for (let skill of courseSkills) {
          if (skill.Course_ID == course.Course_ID) {
            if (course.skills) {
              course.skills.push(skill.Skill_Name);
            }
            else {
              course.skills = [skill.Skill_Name]
            }
          }
        }
      }
      return learningJourney
    } catch (err) {
      throw err;
    }
  }



  learningJourneyService.getLearningJourneyByStaffId = async (staffId) => {
    if(!staffId){
      return false
    }
    try {
      return await database.getLearningJourneyByStaffID(staffId);
    } catch (err) {
      throw err;
    }
  }

  return learningJourneyService;
}

module.exports = learningJourneyService;