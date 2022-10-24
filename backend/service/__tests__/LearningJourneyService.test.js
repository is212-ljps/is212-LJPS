var LearningJourneyService = require('../src/LearningJourneyService');

const createLearningJourney = jest.fn()
const createLearningJourneyCourse = jest.fn()
const createLearningJourneySkill = jest.fn()
const getLearningJourney = jest.fn()
const getLearningJourneyByStaffID = jest.fn()
const deleteLearningJourney= jest.fn()

var service = LearningJourneyService({
  createLearningJourney,
  createLearningJourneyCourse,
  createLearningJourneySkill,
  getLearningJourney,
  getLearningJourneyByStaffID,
  deleteLearningJourney
})

describe("Tests for Learning Journey Service", () => {

  beforeEach(()=>{
    createLearningJourney.mockReset()
    createLearningJourneyCourse.mockReset()
    createLearningJourneySkill.mockReset()
    getLearningJourney.mockReset()
    getLearningJourneyByStaffID.mockReset()
  })

  it('Create learning Journey', async ()=>{
    var name = "Learning Journey"
    var staffId = 1
    var jobRoleId = 1
    var skillId = 1
    var courses = ["tch012", "tch013"]
    var learningJourneyId = 1
    createLearningJourney.mockResolvedValue(learningJourneyId)
    let response = await service.createLearningJourney(name, staffId, jobRoleId, courses, skillId)

    expect(createLearningJourney.mock.calls.length).toBe(1)
    expect(createLearningJourney.mock.calls[0][0]).toBe(name)
    expect(createLearningJourney.mock.calls[0][1]).toBe(staffId)
    expect(createLearningJourney.mock.calls[0][2]).toBe(jobRoleId)
    expect(createLearningJourneySkill.mock.calls[0][0]).toBe(learningJourneyId)
    expect(createLearningJourneySkill.mock.calls[0][1]).toBe(skillId)
    expect(createLearningJourneyCourse.mock.calls[0][0]).toBe(learningJourneyId)
    expect(createLearningJourneyCourse.mock.calls[0][1]).toStrictEqual(courses)

  })

  it('Get Learning Journey By Staff Id', async ()=>{
    var staffId = 1
    let response = await service.getLearningJourneyByStaffId(staffId)

    expect(getLearningJourneyByStaffID.mock.calls.length).toBe(1)
    expect(getLearningJourneyByStaffID.mock.calls[0][0]).toBe(staffId)

  })

  it('Delete Learning Journey', async ()=>{
    var learningJourneyId = 1
    deleteLearningJourney.mockResolvedValue(learningJourneyId)

    let response = await service.deleteLearningJourney(learningJourneyId)
    expect(deleteLearningJourney.mock.calls.length).toBe(1)
    expect(deleteLearningJourney.mock.calls[0][0]).toBe(learningJourneyId )


  })
})