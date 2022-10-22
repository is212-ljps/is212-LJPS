const request = require('supertest')
var { makeApp } = require('../app')

const getCourses = jest.fn()
const getCoursesBySkill = jest.fn()

var app = makeApp({
  getCourses,
  getCoursesBySkill
})

describe("GET /api/courses", () => {
  var app;
  beforeEach(() => {
    app = require('../server');
  })
  afterEach(() => {
    app.close();
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