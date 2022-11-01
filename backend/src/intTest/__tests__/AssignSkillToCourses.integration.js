const request = require('supertest');
var database = require("../../../database/DatabaseDao");

describe("Integration test for assiging skill to courses", () => {
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

  it('Create new skill -> Assign 2 mock course to skill', async () => {
    const createSkill1Res = await request(server).post("/api/skills").send({
      skillName: "Skill Test 1",
      skillDescription: "",
      assignedCourses: ["tch019"]
    })
    const skill1Id = createSkill1Res._body.data
    console.log("first skill")
    console.log(skill1Id)
    
    const createSkill2Res = await request(server).post("/api/skills").send({
      skillName: "Skill Test 2",
      skillDescription: "",
      assignedCourses: ["tch019"]
    })
    const skill2Id = createSkill2Res._body.data
    const createRoleRes = await request(server).post("/api/roles").send({
      roleName: "Test Role name 1",
      roleDescription: "Test Role description 1",
      jobDepartment: "Marketing",
      skills: [skill1Id, skill2Id]
    });
    const roleId = createRoleRes._body.data
    const getRole = await request(server).get("/api/roles/" + roleId + "/skills");
    console.log(getRole)
    expect(getRole._body.data[0].Skill_ID).toBe(skill1Id)
    expect(getRole._body.data[1].Skill_ID).toBe(skill2Id)
  })  
})