var CoursesService = require("../src/CoursesService");
var utils = require("../../util");

const getCourses = jest.fn();
const getCoursesBySkill = jest.fn();
const getCoursesByMultipleSkill = jest.fn();
const getCoursesSkills = jest.fn();

var service = CoursesService({
  getCourses,
  getCoursesBySkill,
  getCoursesByMultipleSkill,
  getCoursesSkills,
});

describe("Tests for Courses Service", () => {
  beforeEach(() => {
    getCourses.mockReset();
    getCoursesBySkill.mockReset();
    getCoursesByMultipleSkill.mockReset();
  });

  it("Get All Courses By Skill", async () => {
    var skillId = "1";
    expectedValue = [
      {
        Course_ID: "COR001",
        Course_Name: "Systems Thinking and Design",
        Course_Desc:
          "This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,",
        Course_Status: "Active",
        Course_Type: "Internal",
        Course_Category: "Core",
      },
    ];
    getCoursesBySkill.mockResolvedValue(expectedValue);
    let response = await service.getCoursesBySkill(skillId);
    expect(response).toBe(expectedValue);
    expect(getCoursesBySkill.mock.calls.length).toBe(1);
    expect(getCoursesBySkill.mock.calls[0][0]).toBe(skillId);
  });

  it("Get All Courses", async () => {
    var skillId = "1";
    expectedValue = [
      {
        Course_ID: "COR001",
        Course_Name: "Systems Thinking and Design",
        Course_Desc:
          "This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,",
        Course_Status: "Active",
        Course_Type: "Internal",
        Course_Category: "Core",
      },
      {
        Course_ID: "COR002",
        Course_Name: "Systems Thinking and Designs",
        Course_Desc:
          "This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,",
        Course_Status: "Active",
        Course_Type: "Internal",
        Course_Category: "Core",
      },
    ];
    getCoursesBySkill.mockResolvedValue(expectedValue);
    let response = await service.getCoursesBySkill(skillId);
    expect(response).toBe(expectedValue);
    expect(getCoursesBySkill.mock.calls.length).toBe(1);
    expect(getCoursesBySkill.mock.calls[0][0]).toBe(skillId);
  });

  it("Get Courses Assigned to a Skill With No Skills Selected", async () => {
    var skills = [];
    let response = await service.getCoursesByMultipleSkill(skills);
    expect(response).toBe(false);
  });

  it("Get Courses Assigned to a Skill With 1 Skill Selected", async () => {
    var skills = [
      {
        Skill_ID: 1,
        Skill_Name: "Python Programming",
        Skill_Description: "",
      },
    ];

    var course1 = {
      Course_ID: "MGT002",
      Course_Name: "Workplace Conflict Management for Professionals",
      Course_Category: "Management",
      Course_Status: "Active",
    };

  
    var courseDetails = [
      {
        Course_ID: course1.Course_ID,
        Course_Name: course1.Course_Name,
        Course_Category: course1.Course_Category,
        Course_Status: course1.Course_Status,
      }
    ];

    var courseSkill =[{
      Course_ID: course1.Course_ID,
      Course_Name: course1.Course_Name,
      Course_Category: course1.Course_Category,
      Course_Status: course1.Course_Status,
      Skill_ID: 1,
      Skill_Name: "Python Programming",
      Skill_Description: "",
    }]

    var expectedValue = {
      courseDetails:[{
        Course_ID: 'MGT002',
        Course_Name: 'Workplace Conflict Management for Professionals',
        Course_Category: 'Management',
        Course_Status: 'Active',
        skills : ['Python Programming']
      }]
    }



    getCoursesByMultipleSkill.mockResolvedValue(courseDetails);
    getCoursesSkills.mockResolvedValue(courseSkill)
    let response = await service.getCoursesByMultipleSkill(skills);
    const isEqual = utils.deepEqual(response, expectedValue);

    expect(isEqual).toBe(true);
  });



  it("Get Courses Assigned to a Skill With 2 Skills Selected", async () => {
    var skills = [
      {
        Skill_ID: 1,
        Skill_Name: "Python Programming",
        Skill_Description: "",
      },

      {
        Skill_ID: 2,
        Skill_Name: "Java Programming",
        Skill_Description: "",
      },
    ];

    var course1 = {
      Course_ID: "MGT002",
      Course_Name: "Workplace Conflict Management for Professionals",
      Course_Category: "Management",
      Course_Status: "Active",
    };

    var course2 = {
      Course_ID: "MGT001",
      Course_Name: "People Management",
      Course_Category: "Management",
      Course_Status: "Active",
    };

  
    var courseDetails = [
      {
        Course_ID: course1.Course_ID,
        Course_Name: course1.Course_Name,
        Course_Category: course1.Course_Category,
        Course_Status: course1.Course_Status,
      },

      {
        Course_ID: course2.Course_ID,
        Course_Name: course2.Course_Name,
        Course_Category: course2.Course_Category,
        Course_Status: course2.Course_Status,  
      }
    ];

    var courseSkill =[{
      Course_ID: course1.Course_ID,
      Course_Name: course1.Course_Name,
      Course_Category: course1.Course_Category,
      Course_Status: course1.Course_Status,
      Skill_ID: 1,
      Skill_Name: "Python Programming",
      Skill_Description: "",
    }, {
      Course_ID: course2.Course_ID,
      Course_Name: course2.Course_Name,
      Course_Category: course2.Course_Category,
      Course_Status: course2.Course_Status,
      Skill_ID: 2,
      Skill_Name: "Java Programming",
      Skill_Description: "",
    }

    
  ]

    var expectedValue ={
      courseDetails:[{
        Course_ID: 'MGT002',
        Course_Name: 'Workplace Conflict Management for Professionals',
        Course_Category: 'Management',
        Course_Status: 'Active',
        skills : ['Python Programming']
      },

      {
        Course_ID: 'MGT001',
        Course_Name: 'People Management',
        Course_Category: 'Management',
        Course_Status: 'Active',
        skills : ['Java Programming']
      },

    ]    
    }

    getCoursesByMultipleSkill.mockResolvedValue(courseDetails);
    getCoursesSkills.mockResolvedValue(courseSkill)
    let response = await service.getCoursesByMultipleSkill(skills);
    const isEqual = utils.deepEqual(response, expectedValue);
    expect(isEqual).toBe(true);
  });
});
