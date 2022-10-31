var LearningJourneyService = require("../src/LearningJourneyService");
var utils = require("../../util");

const createLearningJourney = jest.fn();
const createLearningJourneyCourse = jest.fn();
const createLearningJourneySkill = jest.fn();
const getLearningJourney = jest.fn();
const getLearningJourneyByStaffID = jest.fn();
const getLearningJourneyCourses = jest.fn();
const getLearningJourneySkills = jest.fn();
const getCoursesSkills = jest.fn();
const deleteLearningJourney = jest.fn();
const addCourseToLearningJourney = jest.fn();
const removeCourseFromLearningJourney = jest.fn();

var service = LearningJourneyService({
  createLearningJourney,
  createLearningJourneyCourse,
  createLearningJourneySkill,
  getLearningJourney,
  getLearningJourneyByStaffID,
  getLearningJourneyCourses,
  getLearningJourneySkills,
  getCoursesSkills,
  deleteLearningJourney,
  addCourseToLearningJourney,
  removeCourseFromLearningJourney
});

describe("Tests for Learning Journey Service", () => {
  beforeEach(() => {
    createLearningJourney.mockReset();
    createLearningJourneyCourse.mockReset();
    createLearningJourneySkill.mockReset();
    getLearningJourney.mockReset();
    getLearningJourneyByStaffID.mockReset();
    getLearningJourneyCourses.mockReset();
    getLearningJourneySkills.mockReset();
    getCoursesSkills.mockReset();
    deleteLearningJourney.mockReset();
    addCourseToLearningJourney.mockReset();
    removeCourseFromLearningJourney.mockReset()
  });

  it("Create Learning Journey with Learning Journey Name at 51 characters ", async () => {
    var learningJourneyDetails = {
      Learning_Journey_ID: 1,
      Learning_Journey_Name:
        "Learning Journey Test That Exceeds 50 Characters!!!",
      Staff_ID: 130002,
      Job_Role_ID: 1,
    };

    let response = await service.createLearningJourney(learningJourneyDetails);
    expect(response).toBe(false);
  });

  it("Create Learning Journey with Learning Journey Name at 4 characters ", async () => {
    var learningJourneyDetails = {
      Learning_Journey_ID: 1,
      Learning_Journey_Name: "Test",
      Staff_ID: 130002,
      Job_Role_ID: 1,
    };

    let response = await service.createLearningJourney(learningJourneyDetails);
    expect(response).toBe(false);
  });

  it("Create Learning Journey with Valid Learning Journey Details", async () => {
    var skill = [
      {
        Skill_ID: 1,
        Skill_Name: "Python Programming",
        Skill_Description: "",
      },
    ];

    var course1 = ["MGT002"];

    var learningJourneyDetails = {
      Learning_Journey_Name: "Test Learning Journey",
      Staff_ID: 130002,
      Job_Role_ID: 1,
      skills: skill,
      courses: course1,
    };


    createLearningJourney.mockResolvedValue(1)
    createLearningJourneySkill.mockResolvedValue(true)
    createLearningJourneyCourse.mockResolvedValue(true)

    let response = await service.createLearningJourney(
      learningJourneyDetails.Learning_Journey_Name,
      learningJourneyDetails.Staff_ID,
      learningJourneyDetails.Job_Role_ID,
      learningJourneyDetails.courses,
      learningJourneyDetails.skills
    );
    expect(response).toBe(1);
  });

  it("Create Learning Journey with Invalid Learning Journey Details (Empty Skill)", async () => {
    var skill = [];
    var course1 = ["MGT002"];

    var learningJourneyDetails = {
      Learning_Journey_Name: "Test Learning Journey ",
      Staff_ID: 130002,
      Job_Role_ID: 1,
      skills: skill,
      courses: course1,
    };

    let response = await service.createLearningJourney(
      learningJourneyDetails.Learning_Journey_Name,
      learningJourneyDetails.Staff_ID,
      learningJourneyDetails.Job_Role_ID,
      learningJourneyDetails.courses,
      learningJourneyDetails.skills
    );
    expect(response).toBe(false);
  });

  it("Create Learning Journey with Invalid Learning Journey Details (Empty Course)", async () => {
    var skill = [
      {
        Skill_ID: 1,
        Skill_Name: "Python Programming",
        Skill_Description: "",
      },
    ];

    var course1 = [];

    var learningJourneyDetails = {
      Learning_Journey_Name: "Test Learning Journey",
      Staff_ID: 130002,
      Job_Role_ID: 1,
      skills: skill,
      courses: course1,
    };

    let response = await service.createLearningJourney(
      learningJourneyDetails.Learning_Journey_Name,
      learningJourneyDetails.Staff_ID,
      learningJourneyDetails.Job_Role_ID,
      learningJourneyDetails.courses,
      learningJourneyDetails.skills
    );
    expect(response).toBe(false);
  });

  it("Create Learning Journey with Invalid Learning Journey Details (Invalid Staff ID)", async () => {
    var skill = [
      {
        Skill_ID: 1,
        Skill_Name: "Python Programming",
        Skill_Description: "",
      },
    ];

    var course1 = ["MGT002"];
    var learningJourneyDetails = {
      Learning_Journey_Name: "Test Learning Journey",
      Staff_ID: null,
      Job_Role_ID: 1,
      skills: skill,
      courses: course1,
    };

    let response = await service.createLearningJourney(
      learningJourneyDetails.Learning_Journey_Name,
      learningJourneyDetails.Staff_ID,
      learningJourneyDetails.Job_Role_ID,
      learningJourneyDetails.courses,
      learningJourneyDetails.skills
    );
    expect(response).toBe(false);
  });

  it("Create Learning Journey with Invalid Learning Journey Details (Invalid Job Role ID)", async () => {
    var skill = [
      {
        Skill_ID: 1,
        Skill_Name: "Python Programming",
        Skill_Description: "",
      },
    ];

    var course1 = ["MGT002"];
    var learningJourneyDetails = {
      Learning_Journey_Name: "Test Learning Journey",
      Staff_ID: 130002,
      Job_Role_ID: null,
      skills: skill,
      courses: course1,
    };

    let response = await service.createLearningJourney(
      learningJourneyDetails.Learning_Journey_Name,
      learningJourneyDetails.Staff_ID,
      learningJourneyDetails.Job_Role_ID,
      learningJourneyDetails.courses,
      learningJourneyDetails.skills
    );
    expect(response).toBe(false);
  });

  it("Get Learning Journey By Staff Id", async () => {
    var staffId = 1;
    let response = await service.getLearningJourneyByStaffId(staffId);

    expect(getLearningJourneyByStaffID.mock.calls.length).toBe(1);
    expect(getLearningJourneyByStaffID.mock.calls[0][0]).toBe(staffId);
  });

  it("Get Learning Journey Based on Courses and Skills Without Learning Journey ID", async () => {
    let response2 = await service.getLearningJourney();
    expect(response2).toBe(false);
  });

  it("Get Learning Journey by Id With One Course", async () => {
    // learning journey mock values
    var learningJourneyId = 1;
    var learningJourneyName = "Learning Journey Test";
    var staffId = "130001";
    var jobRoleId = "1";

    // learning journey course mock value

    var course1 = {
      Course_ID: "MGT002",
      Course_Name: "Workplace Conflict Management for Professionals",
      Course_Category: "Management",
      Course_Status: "Active",
    };

    // learning journey skills mock value
    var skill = {
      Skill_ID: "1",
      Skill_Name: "Python Programming",
      Skill_Description: "",
    };

    var learningJourney = [
      {
        Learning_Journey_ID: learningJourneyId,
        Learning_Journey_Name: learningJourneyName,
        Staff_ID: staffId,
        Job_Role_ID: jobRoleId,
      },
    ];

    var learningJourneyCourses = [course1];
    const learningJourneySkills = [skill];

    const courseSkills = [
      {
        Course_ID: course1.Course_ID,
        Course_Name: course1.Course_Name,
        Course_Category: course1.Course_Category,
        Course_Status: course1.Course_Status,
        Skill_ID: skill.Skill_ID,
        Skill_Name: skill.Skill_Name,
        Skill_Description: skill.Skill_Description,
      },
    ];

    const expectedValue = {
      Learning_Journey_ID: 1,
      Learning_Journey_Name: "Learning Journey Test",
      courses: learningJourneyCourses,
      skills: learningJourneySkills,
    };

    getLearningJourney.mockResolvedValue(learningJourney);
    getLearningJourneyCourses.mockResolvedValue(learningJourneyCourses);
    getLearningJourneySkills.mockResolvedValue(learningJourneySkills);
    getCoursesSkills.mockResolvedValue(courseSkills);
    let response = await service.getLearningJourney(learningJourneyId);
    const isEqual = utils.deepEqual(response, expectedValue);

    expect(isEqual).toBe(true);
  });

  it("Get Learning Journey by Id With Multiple Courses", async () => {
    // learning journey mock values
    var learningJourneyId = 1;
    var learningJourneyName = "Learning Journey Test";
    var staffId = "130001";
    var jobRoleId = "1";

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

    var skill = {
      Skill_ID: "1",
      Skill_Name: "Python Programming",
      Skill_Description: "",
    };

    var learningJourney = [
      {
        Learning_Journey_ID: learningJourneyId,
        Learning_Journey_Name: learningJourneyName,
        Staff_ID: staffId,
        Job_Role_ID: jobRoleId,
      },
    ];

    var learningJourneyCourses = [course1, course2];

    const learningJourneySkills = [skill];

    const courseSkills = [
      {
        Course_ID: course1.Course_ID,
        Course_Name: course1.Course_Name,
        Course_Category: course1.Course_Category,
        Course_Status: course1.Course_Status,
        Skill_ID: 1,
        Skill_Name: "Skill 1",
        Skill_Description: "",
      },

      {
        Course_ID: course2.Course_ID,
        Course_Name: course2.Course_Name,
        Course_Category: course2.Course_Category,
        Course_Status: course2.Course_Status,
        Skill_ID: 1,
        Skill_Name: "Skill 1",
        Skill_Description: "",
      },

      {
        Course_ID: course2.Course_ID,
        Course_Name: course2.Course_Name,
        Course_Category: course2.Course_Category,
        Course_Status: course2.Course_Status,
        Skill_ID: 2,
        Skill_Name: "Skill 2",
        Skill_Description: "",
      },
    ];

    const expectedValue = {
      Learning_Journey_ID: 1,
      Learning_Journey_Name: "Learning Journey Test",
      courses: learningJourneyCourses,
      skills: learningJourneySkills,
    };

    getLearningJourney.mockResolvedValue(learningJourney);
    getLearningJourneyCourses.mockResolvedValue(learningJourneyCourses);
    getLearningJourneySkills.mockResolvedValue(learningJourneySkills);
    getCoursesSkills.mockResolvedValue(courseSkills);
    let response = await service.getLearningJourney(learningJourneyId);
    const isEqual = utils.deepEqual(response, expectedValue);
    expect(isEqual).toBe(true);
  });

  it("Delete learning journey without ID", async () => {
    let response = await service.deleteLearningJourney();
    expect(response).toBe(false);
  });

  it("Delete learning journey by ID", async () => {
    deleteLearningJourney.mockResolvedValue(true);
    let response = await service.deleteLearningJourney(4);
    expect(response).toBe(true)
  })

  it("Remove course from learning journey without learning journey id", async () => {
    let response = await service.removeCourseFromLearningJourney(null, 1);
    expect(response).toBe(false)
  })

  it("Remove course from learning journey without course id", async () => {
    let response = await service.removeCourseFromLearningJourney(1);
    expect(response).toBe(false)
  })

  it("Remove course from learning journey without course id and learning journey id", async () => {
    let response = await service.removeCourseFromLearningJourney();
    expect(response).toBe(false)
  })

  it("Remove course from learning journey without course id and learning journey id", async () => {
    removeCourseFromLearningJourney.mockResolvedValue(true)
    let response = await service.removeCourseFromLearningJourney(1,1);
    expect(response).toBe(true)
  })

  it("Add courses to learning journey without learning journey id", async () => {
    let response = await service.addCourseToLearningJourney(null, ["COR001"]);
    expect(response).toBe(false)
  })

  it("Add null courses variable array to learning journey", async () => {
    let response = await service.addCourseToLearningJourney(1, null);
    expect(response).toBe(false)
  })
  
  it("Add empty courses array to learning journey", async () => {
    let response = await service.addCourseToLearningJourney(1, []);
    expect(response).toBe(false)
  })

  it("Add courses into learning journey", async () => {
    addCourseToLearningJourney.mockResolvedValue(true)
    let response = await service.addCourseToLearningJourney(1, ["COR001"]);
    expect(response).toBe(true)
  })

  it("Get unadded courses from learning journey", async () => {

  })


});
