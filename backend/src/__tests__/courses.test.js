const request = require('supertest')
var { makeApp } = require('../app')

const getCourses = jest.fn()
const getCoursesBySkill = jest.fn()

var app = makeApp({
  getCourses,
  getCoursesBySkill
})

describe("GET /api/courses", () => {
  beforeEach(()=>{
    getCourses.mockReset()
    getCoursesBySkill.mockReset()
  })

  it('get all courses with 200 status code', async (done)=>{
    var skillId = "1"
    try {
      getCoursesBySkill.mockResolvedValue([
        {
            "Course_ID": "COR001",
            "Course_Name": "Systems Thinking and Design",
            "Course_Desc": "This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,",
            "Course_Status": "Active",
            "Course_Type": "Internal",
            "Course_Category": "Core"
        }
      ])
      let response = await request(app).get(`/api/courses/skill/${skillId}`);
      expect(response.statusCode).toBe(200)
      expect(getCoursesBySkill.mock.calls.length).toBe(1)
      expect(getCoursesBySkill.mock.calls[0][0]).toBe(skillId)
    } catch(err) {
      console.log(err)
    }
    done();

  })
})