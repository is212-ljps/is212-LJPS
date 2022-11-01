const request = require('supertest');
var database = require("../../../database/DatabaseDao");

describe("Integration test for assigning skill to courses", () => {
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

  it('Create 1 new skill -> Assign 3 mock courses to skill', async () => {
    const createSkillRes = await request(server).post("/api/skills").send({
      skillName: "Skill Test 1",
      skillDescription: "",
      assignedCourses: ["tch012", "tch013", "tch019"]
    })
    
    const skillId = createSkillRes._body.data
    console.log(skillId)
    console.log("Skill Created with 3 assigned courses")
    
    const getSkill = await request(server).get("/api/skills/" + skillId);
    //console.log(getSkill)
    //expect(getSkill._body.data[0].assignedCourses).toBe(courses)
  })  
})