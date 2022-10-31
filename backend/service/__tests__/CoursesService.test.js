var CoursesService = require('../src/CoursesService');
var utils = require("../../util");

const getCourses = jest.fn()
const getCoursesBySkill = jest.fn()
const getCoursesFromLearningJourney = jest.fn()
const getLearningJourneyCourses = jest.fn()
const getLearningJourneySkills = jest.fn()
const getCoursesByMultipleSkill = jest.fn()
const getCoursesSkills = jest.fn()

var service = CoursesService({
  getCourses,
  getCoursesBySkill,
  getCoursesFromLearningJourney,
  getLearningJourneyCourses,
  getLearningJourneySkills,
  getCoursesByMultipleSkill,
  getCoursesSkills
})

describe("Tests for Courses Service", () => {
  beforeEach(() => {
    getCourses.mockReset()
    getCoursesBySkill.mockReset()
    getCoursesFromLearningJourney.mockReset()
    getLearningJourneyCourses.mockReset(),
      getLearningJourneySkills.mockReset(),
      getCoursesByMultipleSkill.mockReset(),
      getCoursesSkills.mockReset()
  })

  it('Get All Courses By Skill', async () => {
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

  it('Get All Courses', async () => {
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

  it("Get courses from learning journey without learning journey ID", async () => {
    let response = await service.getCoursesFromLearningJourney();
    expect(response).toBe(false)
  })

  it("Get added courses for learning journey ", async () => {
    let mock = [{
      Course_ID: 'COR001',
      Course_Name: 'Systems Thinking and Design',
      Course_Category: 'Core',
      Course_Desc: 'This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,',
      Course_Status: 'Active'
    }]
    getLearningJourneyCourses.mockResolvedValue(mock)
    let response = await service.getCoursesFromLearningJourney(1, 'true');
    expect(response).toBe(mock)
  })

  it("Get unadded courses for learning journey", async () => {
    let getLearningJourneyCoursesMock = [
      {
        Course_ID: 'COR001',
        Course_Name: 'Systems Thinking and Design',
        Course_Category: 'Core',
        Course_Desc: 'This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,',
        Course_Status: 'Active'
      },
      {
        Course_ID: 'MGT001',
        Course_Name: 'People Management',
        Course_Category: 'Management',
        Course_Desc: 'enable learners to manage team performance and development through effective communication, conflict resolution and negotiation skills.',
        Course_Status: 'Active'
      },
      {
        Course_ID: 'tch003',
        Course_Name: 'Canon MFC Mainteance and Troubleshooting',
        Course_Category: 'Technical',
        Course_Desc: 'Troubleshoot and fixing L2,3 issues of Canon ImageRUNNER series of products',
        Course_Status: 'Active'
      },
    ]

    let getLearningJourneySkillsMock = [
      {
        Skill_ID: 10,
        Skill_Name: 'Skill 10',
        Skill_Description: ''
      },
      {
        Skill_ID: 11,
        Skill_Name: 'Skill 11',
        Skill_Description: ''
      }
    ]

    let getCoursesByMultipleSkillMock = [
      {
        Course_ID: 'COR001',
        Course_Name: 'Systems Thinking and Design',
        Course_Category: 'Core',
        Course_Desc: 'This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,',
        Course_Status: 'Active'
      },
      {
        Course_ID: 'MGT001',
        Course_Name: 'People Management',
        Course_Category: 'Management',
        Course_Desc: 'enable learners to manage team performance and development through effective communication, conflict resolution and negotiation skills.',
        Course_Status: 'Active'
      },
      {
        Course_ID: 'tch003',
        Course_Name: 'Canon MFC Mainteance and Troubleshooting',
        Course_Category: 'Technical',
        Course_Desc: 'Troubleshoot and fixing L2,3 issues of Canon ImageRUNNER series of products',
        Course_Status: 'Active'
      },
      {
        Course_ID: 'MGT002',
        Course_Name: 'Workplace Conflict Management for Professionals',
        Course_Category: 'Management',
        Course_Desc: 'This course will address the gaps to build consensus and utilise knowledge of conflict management techniques to diffuse tensions and achieve resolutions effectively in the best interests of the organisation.',
        Course_Status: 'Active'
      },
      {
        Course_ID: 'COR002',
        Course_Name: 'Lean Six Sigma Green Belt Certification',
        Course_Category: 'Core',
        Course_Desc: 'Apply Lean Six Sigma methodology and statistical tools such as Minitab to be used in process analytics',
        Course_Status: 'Active'
      },
    ]

    let getCoursesSkillsMock = [
      {
        Course_ID:"COR002",
        Course_Name:"Lean Six Sigma Green Belt Certification",
        Course_Desc:"Apply Lean Six Sigma methodology and statistical tools such as Minitab to be used in process analytics",
        Course_Status:"Active",
        Course_Type:"Internal",
        Course_Category:"Core",
        Skill_ID:10,
        Skill_Name:"test1221212",
        Skill_Description:"test2",
        Is_Active:"1"
      },
      {
        Course_ID:"COR002",
        Course_Name:"Lean Six Sigma Green Belt Certification",
        Course_Desc:"Apply Lean Six Sigma methodology and statistical tools such as Minitab to be used in process analytics",
        Course_Status:"Active",
        Course_Type:"Internal",
        Course_Category:"Core",
        Skill_ID:10,
        Skill_Name:"test111",
        Skill_Description:"test",
        Is_Active:"1"
      },
      {
        Course_ID:"COR002",
        Course_Name:"Lean Six Sigma Green Belt Certification",
        Course_Desc:"Apply Lean Six Sigma methodology and statistical tools such as Minitab to be used in process analytics",
        Course_Status:"Active",
        Course_Type:"Internal",
        Course_Category:"Core",
        Skill_ID:24,
        Skill_Name:"123123",
        Skill_Description:"",
        Is_Active:"1"
      },
      {
        Course_ID:"COR002",
        Course_Name:"Lean Six Sigma Green Belt Certification",
        Course_Desc:"Apply Lean Six Sigma methodology and statistical tools such as Minitab to be used in process analytics",
        Course_Status:"Active",
        Course_Type:"Internal",
        Course_Category:"Core",
        Skill_ID:25,
        Skill_Name:"test123",
        Skill_Description:"test123",
        Is_Active:"1"
      },
      {
        Course_ID:"COR002",
        Course_Name:"Lean Six Sigma Green Belt Certification",
        Course_Desc:"Apply Lean Six Sigma methodology and statistical tools such as Minitab to be used in process analytics",
        Course_Status:"Active",
        Course_Type:"Internal",
        Course_Category:"Core",
        Skill_ID:26,
        Skill_Name:"teest123",
        Skill_Description:"test",
        Is_Active:"1"
      },
      {
        Course_ID:"COR002",
        Course_Name:"Lean Six Sigma Green Belt Certification",
        Course_Desc:"Apply Lean Six Sigma methodology and statistical tools such as Minitab to be used in process analytics",
        Course_Status:"Active",
        Course_Type:"Internal",
        Course_Category:"Core",
        Skill_ID:29,
        Skill_Name:"Test skill 1",
        Skill_Description:"test",
        Is_Active:"1"
      },
      {
        Course_ID:"MGT002",
        Course_Name:"Workplace Conflict Management for Professionals",
        Course_Desc:"This course will address the gaps to build consensus and utilise knowledge of conflict management techniques to diffuse tensions and achieve resolutions effectively in the best interests of the organisation.",
        Course_Status:"Active",
        Course_Type:"External",
        Course_Category:"Management",
        Skill_ID:10,
        Skill_Name:"test1221212",
        Skill_Description:"test2",
        Is_Active:"1"
      },
    ]

    let expectedResult = [
      {
        Course_ID: 'COR002',
        Course_Name: 'Lean Six Sigma Green Belt Certification',
        Course_Desc: 'Apply Lean Six Sigma methodology and statistical tools such as Minitab to be used in process analytics',
        Course_Status: 'Active',
        Course_Type: 'Internal',
        Course_Category: 'Core',
        Skills: [ 'test1221212','test111', '123123', 'test123', 'teest123', 'Test skill 1']
      },
      {
        Course_ID: 'MGT002',
        Course_Name: 'Workplace Conflict Management for Professionals',
        Course_Desc: 'This course will address the gaps to build consensus and utilise knowledge of conflict management techniques to diffuse tensions and achieve resolutions effectively in the best interests of the organisation.',
        Course_Status: 'Active',
        Course_Type: 'External',
        Course_Category: 'Management',
        Skills: [ 'test1221212' ]
      }
    ]

    getLearningJourneyCourses.mockResolvedValue(getLearningJourneyCoursesMock)
    getLearningJourneySkills.mockResolvedValue(getLearningJourneySkillsMock)
    getCoursesByMultipleSkill.mockResolvedValue(getCoursesByMultipleSkillMock)
    getCoursesSkills.mockResolvedValue(getCoursesSkillsMock)

    let response = await service.getCoursesFromLearningJourney(1, 'false');
    let isEqual = utils.deepEqual(response, expectedResult)
    expect(isEqual).toBe(true)
  })
})