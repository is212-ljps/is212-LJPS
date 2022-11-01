const request = require('supertest');
var database = require("../../../database/DatabaseDao");

describe("Integration test for courses", () => {
  var server;
  const { makeApp } = require('../../app')
  
  server = makeApp(database("ljps_db_test"))
  port = 8000
  server.listen(port, () => console.log(`One step closer to graduating ! localhost:${port}`));
  beforeEach(() => {
  })
  afterEach((done) => {
    done()
  })

  it('Create learning journey', async () => {
    var learningJourneyName = "learning journey name";
    var staffId = 130002
    var jobRoleId = 1
    var courses = ["COR001", "COR002", "COR004"]
    var skillId = 1
    const createLearningJourneyRes = await request(server).post("/api/learning-journey").send({
      learningJourneyName,
      skillId,
      jobRoleId,
      staffId,
      courses
    });
    const learningJourneyId = createLearningJourneyRes._body.data
    console.log(learningJourneyId)
    const getLearningJourneyRes = await request(server).get("/api/learning-journey/" + learningJourneyId)
    var resultArr = []
    for (var course of getLearningJourneyRes._body.data.courses) {
      resultArr.push(course.Course_ID)
    }
    expect(resultArr).toEqual(expect.arrayContaining(courses));
    expect(getLearningJourneyRes._body.data.Learning_Journey_Name).toBe(learningJourneyName)
    expect(getLearningJourneyRes._body.data.skills[0].Skill_ID).toBe(skillId)
  })  
  
  it('Create learning journey for staffID and ensure those learning journeys are under that staff', async () => {
    var learningJourneyName = "learning journey name";
    var staffId = 140001
    var jobRoleId = 2
    var courses = ["COR001", "COR002", "COR004"]
    var skillId = 2
    const createLearningJourneyRes1 = await request(server).post("/api/learning-journey").send({
      learningJourneyName,
      skillId,
      jobRoleId,
      staffId,
      courses
    }); 
    const learningJourneyId1 = createLearningJourneyRes1._body.data
    var learningJourneyName = "learning journey name 2";
    var staffId = 140001
    var jobRoleId = 1
    var courses = ["COR006"]
    var skillId = 1
    const createLearningJourneyRes2 = await request(server).post("/api/learning-journey").send({
      learningJourneyName,
      skillId,
      jobRoleId,
      staffId,
      courses
    });
    const learningJourneyId2 = createLearningJourneyRes2._body.data
    const getLearningJourneyRes = await request(server).get("/api/learning-journey/staff/140001")
    console.log(getLearningJourneyRes)
    console.log(getLearningJourneyRes._body.data)
    var resultArr = []
    for (var learningJourney of getLearningJourneyRes._body.data) {
      resultArr.push(learningJourney.Learning_Journey_ID)
    }
    expect(resultArr).toEqual(expect.arrayContaining([learningJourneyId1, learningJourneyId2]));
  })  
})
