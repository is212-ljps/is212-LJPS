var RolesService = require("../src/RolesService");
var utils = require("../../util");

const getSkillsAssignedToRole = jest.fn();

var service = RolesService({
  getSkillsAssignedToRole,
});

describe("Tests for Roles Service", () => {
  beforeEach(() => {
    getSkillsAssignedToRole.mockReset();
  });

  it("Get Skills for Role Selected With Role Id", async () => {
    var jobRoleId = 1;

    var expectedValue = [
      {
        Job_Role_ID: 1,
        Skill_ID: 1,
        Skill_Name: "Python Programming",
        Skill_Description: "",
      },

      {
        Job_Role_ID: 1,
        Skill_ID: 2,
        Skill_Name: "Java Programming",
        Skill_Description: "",
      },
    ];

    getSkillsAssignedToRole.mockResolvedValue(expectedValue);
    let response = await service.getSkillsAssignedToRole(jobRoleId);
    const isEqual = utils.deepEqual(response, expectedValue);
    expect(isEqual).toBe(true);
  });

  it("Get All Skill for Role Selected Without Role Id", async () => {
    var jobRoleId = null;
    let response = await service.getSkillsAssignedToRole(jobRoleId);
    expect(response).toBe(false);
  });
});
