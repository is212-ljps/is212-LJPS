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

var service = LearningJourneyService({
  createLearningJourney,
  createLearningJourneyCourse,
  createLearningJourneySkill,
  getLearningJourney,
  getLearningJourneyByStaffID,
  getLearningJourneyCourses,
  getLearningJourneySkills,
  getCoursesSkills,
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
  });

  it("Create learning Journey", async () => {
    var name = "Learning Journey";
    var staffId = 1;
    var jobRoleId = 1;
    var skillId = 1;
    var courses = ["tch012", "tch013"];
    var learningJourneyId = 1;
    createLearningJourney.mockResolvedValue(learningJourneyId);
    let response = await service.createLearningJourney(
      name,
      staffId,
      jobRoleId,
      courses,
      skillId
    );

    expect(createLearningJourney.mock.calls.length).toBe(1);
    expect(createLearningJourney.mock.calls[0][0]).toBe(name);
    expect(createLearningJourney.mock.calls[0][1]).toBe(staffId);
    expect(createLearningJourney.mock.calls[0][2]).toBe(jobRoleId);
    expect(createLearningJourneySkill.mock.calls[0][0]).toBe(learningJourneyId);
    expect(createLearningJourneySkill.mock.calls[0][1]).toBe(skillId);
    expect(createLearningJourneyCourse.mock.calls[0][0]).toBe(learningJourneyId);
    expect(createLearningJourneyCourse.mock.calls[0][1]).toStrictEqual(courses);
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

    var learningJourneyCourses = [course1,course2];

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
});
