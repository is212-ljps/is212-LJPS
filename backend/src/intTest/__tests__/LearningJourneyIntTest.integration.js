const request = require('supertest');
var database = require("../../../database/DatabaseDao");

describe("Integration test for courses", () => {
  var server;
  beforeEach(() => {
    const { makeApp } = require('../../app')
  
    server = makeApp(database("ljps_db_test"))
    port = 8000
    server.listen(port, () => console.log(`One step closer to graduating ! localhost:${port}`));
  })
  afterEach((done) => {
    done()
  })

  it('Get Courses', async () => {
    var learningJourneyName = "learning journey name";
    var skillId = 1
    var jobRoleId = 1
    var courses = ["COR001", "COR002", "COR004"]
    var skillId = 1
    const getCoursesRes = await request(server).post("/api/courses").send({
      learningJourneyName,
      skillId,
      jobRoleId,
      
    });
    const courses = getCoursesRes._body.data
    
    expect(courses.length).toBe(19)
  })  
})
