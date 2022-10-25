function learningJourneyService(database) {
  const learningJourneyService = {}

  learningJourneyService.createLearningJourney = async (learningJourneyName, staffId, jobRoleId, courses, skillId) => {
    try {
      const learningJourneyId = await database.createLearningJourney(learningJourneyName, staffId, jobRoleId);
      await database.createLearningJourneySkill(learningJourneyId, skillId);
      await database.createLearningJourneyCourse(learningJourneyId, courses);
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
    const learningJourney = {};
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
    try {
      return await database.getLearningJourneyByStaffID(staffId);
    } catch (err) {
      throw err;
    }
  }

  learningJourneyService.removeCourseFromLearningJourney = async (learningJourneyId, courseId) => {
    if(!learningJourneyId || !courseId){
      return false
    }
    try{
      return await database.removeCourseFromLearningJourney(learningJourneyId, courseId)
    } catch (err){
      throw err
    }
  }

  return learningJourneyService;
}

module.exports = learningJourneyService;