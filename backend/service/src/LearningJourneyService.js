function learningJourneyService(database){
  const learningJourneyService = {}

  learningJourneyService.createLearningJourney = async (learningJourneyName, staffId, jobRoleId, courses, skills) => {

    try {
      const learningJourneyId = await database.createLearningJourney(learningJourneyName, staffId, jobRoleId);
      await database.createLearningJourneySkill(learningJourneyId, skills);
      await database.createLearningJourneyCourse(learningJourneyId, courses);
      return learningJourneyId;
    } catch (err) {
      throw err;
    }
  }

  learningJourneyService.getLearningJourney = async (learningJourneyId) => {
    try {
      return await database.getLearningJourney(learningJourneyId)
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

  return learningJourneyService;
}

module.exports = learningJourneyService;