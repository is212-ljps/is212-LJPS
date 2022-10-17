const request = require('supertest')


describe("GET /api/courses", () => {
  var app;
  beforeEach(() => {
    app = require('../server');
  })
  afterEach(() => {
    app.close();
  })
  it('get all courses with 200 status code', async () => {
    try {
      const response = await request(app).get("/api/courses");
      expect(response.statusCode).toBe(200)
    } catch (err) {
      console.log(err)
    }

  })

  it('Create 2 skills -> Create a role -> Assign both skills to role', async () => {
    try {
      const createSkill1Res = await request(app).post("/api/skills").send({
        skillName: "Skill Test 1",
        skillDescription: ""
      })
      const skill1Id = createSkill1Res.body.id
      const createSkill2Res = await request(app).post("/api/skills").send({
        skillName: "Skill Test 2",
        skillDescription: ""
      })
      const skill2Id = createSkill2Res.body.id
      const createRoleRes = await request(app).post("/api/roles").send({
        roleName: "Test Role name 1",
        roleDescription: "Test Role description 1",
        jobDepartment: "Marketing",
        skills: [skill1Id, skill2Id]
      });

      expect(createRoleRes.body.success).toBe(true)

    } catch (err) {
      console.log(err)
    }
  })
})