var SkillsService = require("../src/SkillsService");

const getAllSkills = jest.fn();
const getInactiveSkills = jest.fn();
const getSkillById = jest.fn();
const getCoursesAssignedToSkill = jest.fn();
const createSkill = jest.fn();
const deleteSkillById = jest.fn();
const updateSkillById = jest.fn();
const assignCoursesToSkills = jest.fn();
const removeCoursesFromSkill = jest.fn();

var service = SkillsService({
  getAllSkills,
  getInactiveSkills,
  getSkillById,
  getCoursesAssignedToSkill,
  createSkill,
  deleteSkillById,
  updateSkillById,
  assignCoursesToSkills,
  removeCoursesFromSkill
});

describe("Tests for Skills Service", () => {
  beforeEach(() => {
    getAllSkills.mockReset();
    getInactiveSkills.mockReset();
    getSkillById.mockReset();
    getCoursesAssignedToSkill.mockReset();
    createSkill.mockReset();
    deleteSkillById.mockReset();
    updateSkillById.mockReset();
    assignCoursesToSkills.mockReset();
    removeCoursesFromSkill.mockReset();
  });

  it("Get active skills", async () => {
    expectedValue = [
      {
        "Skill_ID": 1,
        "Skill_Name": "People Management",
        "Skill_Description": "Ability to manage people at the workplace",
        "Is_Active": 1
      },
      {
        "Skill_ID": 2,
        "Skill_Name": "Online Marketing",
        "Skill_Description": "Marketing on digital platforms to reach online users",
        "Is_Active": 1
      },
      {
        "Skill_ID": 3,
        "Skill_Name": "Canon Product Servicing",
        "Skill_Description": "Troubleshooting of Canon products",
        "Is_Active": 1
      },
      {
        "Skill_ID": 4,
        "Skill_Name": "Network Security",
        "Skill_Description": "Maintain network security and fix vulnerabilities",
        "Is_Active": 1
      },
      {
        "Skill_ID": 5,
        "Skill_Name": "System Architecture",
        "Skill_Description": "Knowledge on fundamental concepts of system architecture",
        "Is_Active": 1
      }
    ]

    getAllSkills.mockResolvedValue(expectedValue)
    let response = await service.getAllSkills();

    expect(response).toBe(expectedValue)
    expect(getAllSkills.mock.calls.length).toBe(1);
  });

  it("Get inactive skills", async () => {
    expectedValue = [
      {
        "Skill_ID": 1,
        "Skill_Name": "People Management",
        "Skill_Description": "Ability to manage people at the workplace",
        "Is_Active": 0
      },
      {
        "Skill_ID": 2,
        "Skill_Name": "Online Marketing",
        "Skill_Description": "Marketing on digital platforms to reach online users",
        "Is_Active": 0
      },
      {
        "Skill_ID": 3,
        "Skill_Name": "Canon Product Servicing",
        "Skill_Description": "Troubleshooting of Canon products",
        "Is_Active": 0
      },
      {
        "Skill_ID": 4,
        "Skill_Name": "Network Security",
        "Skill_Description": "Maintain network security and fix vulnerabilities",
        "Is_Active": 0
      },
      {
        "Skill_ID": 5,
        "Skill_Name": "System Architecture",
        "Skill_Description": "Knowledge on fundamental concepts of system architecture",
        "Is_Active": 0
      }
    ]

    getInactiveSkills.mockResolvedValue(expectedValue)
    let response = await service.getInactiveSkills();

    expect(response).toBe(expectedValue)
    expect(getInactiveSkills.mock.calls.length).toBe(1);
  });

  it("Create skill", async () => {
    var skillId = 1;
    var name = "Python Programming"
    var description = "Proficiency in Python progamming language"
    var courses = ["tch012", "tch013"];

    createSkill.mockResolvedValue(skillId);
    let response = await service.createSkill(
      name,
      description,
      courses
    );

    expect(createSkill.mock.calls.length).toBe(1);
    expect(assignCoursesToSkills.mock.calls.length).toBe(1);
    expect(createSkill.mock.calls[0][0]).toBe(name);
    expect(createSkill.mock.calls[0][1]).toBe(description);
    expect(assignCoursesToSkills.mock.calls[0][0]).toBe(courses);
  })


  it("Delete skill by Id", async () => {
    deleteSkillById.mockResolvedValue(true);
    let response = await service.deleteSkillById(1);
    expect(response).toBe(true)
  })

  it("Delete skill without Id", async () => {
    let response = await service.deleteSkillById();
    expect(response).toBe(false)
  })

  it("Get skill by ID", async () => {
    var skillId = 1;

    expectedValue = [
      {
        "Skill_ID": 1,
        "Skill_Name": "People Management",
        "Skill_Description": "Ability to manage people at the workplace",
        "Is_Active": 1
      }
    ]

    getSkillById.mockResolvedValue(expectedValue)
    let response = await service.getSkillById(skillId);
    expect(response).toBe(expectedValue)
    expect(getSkillById.mock.calls.length).toBe(1)
    expect(getSkillById.mock.calls[0][0]).toBe(skillId)

  });

  it("Get courses assigned to skill", async () => {
    var skillId = 1;
    expectedValue = ['MGT001', 'MGT002', 'MGT004']

    getCoursesAssignedToSkill.mockResolvedValue(expectedValue);
    let response = await service.getCoursesAssignedToSkill(skillId);
    expect(response).toBe(expectedValue)
    expect(getCoursesAssignedToSkill.mock.calls.length).toBe(1)
  });

  it("Update skill with Id", async () => {
    var skillId = 1
    var name = "Kotlin Programming"
    var desc = "Proficiency in Kotlin Programming"
    var courses = ["tch012", "tch013"];

    expectedValue = {
      Skill_ID: 1,
      Skill_Name: "Kotlin Programming",
      Skill_Description: "Proficiency in Kotlin Programming",
      Is_Active: 1
    }

    updateSkillById.mockResolvedValue(expectedValue)
    let response = await service.updateSkillById(skillId, name, desc, courses)

    expect(updateSkillById.mock.calls.length).toBe(1);
    expect(removeCoursesFromSkill.mock.calls.length).toBe(1);
    expect(assignCoursesToSkills.mock.calls.length).toBe(1);
    expect(updateSkillById.mock.calls[0][1]).toBe(name);
    expect(updateSkillById.mock.calls[0][2]).toBe(desc);
    expect(assignCoursesToSkills.mock.calls[0][0]).toBe(courses);
    expect(response).toBe(expectedValue)
  })

  it("Update skill without Id", async () => {
    let response = await service.updateSkillById();
    expect(response).toBe(false)
  })




})
