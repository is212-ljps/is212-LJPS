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

  learningJourneyService.getLearningJourney = async (learningJourneyId) => {
    if(!learningJourneyId){
      return false
    }
    try {
      return await database.getLearningJourney(learningJourneyId)
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