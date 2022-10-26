var CoursesService = require('../src/CoursesService');

const getCourses = jest.fn()
const getCoursesBySkill = jest.fn()

var service = CoursesService({
  getCourses,
  getCoursesBySkill
})

describe("Tests for Courses Service", () => {
  beforeEach(()=>{
    getCourses.mockReset()
    getCoursesBySkill.mockReset()
  })

  it('Get All Courses By Skill', async ()=>{
    var skillId = "1"
    expectedValue = [
      {
          "Course_ID": "COR001",
          "Course_Name": "Systems Thinking and Design",
          "Course_Desc": "This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,",
          "Course_Status": "Active",
          "Course_Type": "Internal",
          "Course_Category": "Core"
      }
    ]
    getCoursesBySkill.mockResolvedValue(expectedValue)
    let response = await service.getCoursesBySkill(skillId);
    expect(response).toBe(expectedValue)
    expect(getCoursesBySkill.mock.calls.length).toBe(1)
    expect(getCoursesBySkill.mock.calls[0][0]).toBe(skillId)

  })

  it('Get All Courses', async ()=>{
    var skillId = "1"
    expectedValue = [
      {
          "Course_ID": "COR001",
          "Course_Name": "Systems Thinking and Design",
          "Course_Desc": "This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,",
          "Course_Status": "Active",
          "Course_Type": "Internal",
          "Course_Category": "Core"
      },
      {
        "Course_ID": "COR002",
        "Course_Name": "Systems Thinking and Designs",
        "Course_Desc": "This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,",
        "Course_Status": "Active",
        "Course_Type": "Internal",
        "Course_Category": "Core"
    }
    ]
    getCoursesBySkill.mockResolvedValue(expectedValue)
    let response = await service.getCoursesBySkill(skillId);
    expect(response).toBe(expectedValue)
    expect(getCoursesBySkill.mock.calls.length).toBe(1);
    expect(getCoursesBySkill.mock.calls[0][0]).toBe(skillId);

  })
})