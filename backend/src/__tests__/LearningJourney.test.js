const { get } = require('superagent')
const request = require('supertest')
var { makeApp } = require('../app')

const createLearningJourney = jest.fn()
const createLearningJourneyCourse = jest.fn()
const createLearningJourneySkill = jest.fn()
const getLearningJourney = jest.fn()

var app = makeApp({
  createLearningJourney,
  createLearningJourneyCourse,
  createLearningJourneySkill,
  getLearningJourney
})

describe("GET /api/courses", () => {

  beforeEach(()=>{
    createLearningJourney.mockReset()
    createLearningJourneyCourse.mockReset()
    createLearningJourneySkill.mockReset()
    getLearningJourney.mockReset()
  })

  it('get all courses with 200 status code', async ()=>{
    var name = "Learning Journey Name"
    var staffId = 1
    var jobRoleId = 1
    var skillId = 1
    var courses = ["tch012", "tch013"]
    createLearningJourney.mockResolvedValue(1)
    let response = await request(app).post("/api/learning-journey"). send ( {
      learningJourneyName: name,
      staffId: staffId,
      jobRoleId: jobRoleId,
      skillId: skillId,
      courses: courses
    });
    expect(response.statusCode).toBe(201)
    var learningJourneyId = 1
    getLearningJourney.mockResolvedValue(
      [
        {
            "Learning_Journey_ID": 1,
            "Learning_Journey_Name": "Learning Journey Name",
            "Staff_ID": 1,
            "Job_Role_ID": 1
        }
      ]
    )
    response = await request(app).get("/api/learning-journey/" + learningJourneyId);
    const {Learning_Journey_ID, Learning_Journey_Name, Staff_ID, Job_Role_ID} = response._body.data[0]
    expect(createLearningJourney.mock.calls.length).toBe(1)
    expect(createLearningJourney.mock.calls[0][0]).toBe(Learning_Journey_Name)
    expect(createLearningJourney.mock.calls[0][1]).toBe(Staff_ID)
    expect(createLearningJourney.mock.calls[0][2]).toBe(Job_Role_ID)
    expect(createLearningJourneySkill.mock.calls[0][0]).toBe(Learning_Journey_ID)
    expect(createLearningJourneySkill.mock.calls[0][1]).toBe(skillId)
    expect(createLearningJourneyCourse.mock.calls[0][0]).toBe(Learning_Journey_ID)
    expect(createLearningJourneyCourse.mock.calls[0][1]).toStrictEqual(courses)

  })  
})