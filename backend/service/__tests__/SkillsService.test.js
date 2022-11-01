var SkillsService = require("../src/SkillsService");
var utils = require("../../util");

const getSkillByMultipleId = jest.fn();

var service = SkillsService({
  getSkillByMultipleId,
});

describe("Tests for Courses Service", () => {
  beforeEach(() => {
    getSkillByMultipleId.mockReset();
  });

  it("Get Skills with No Skill Id", async () => {
    let response = await service.getSkillByMultipleId();
    expect(response).toBe(false);
  });

  it("Get Skills with 1 Skill Id", async () => {
    var skills = '1';

    var skillResult = [
      {
        Skill_ID: 1,
        Skill_Name: "Python Programming",
        Skill_Description: "",
      },
    ];

    getSkillByMultipleId.mockResolvedValue(skillResult);
    let response = await service.getSkillByMultipleId(skills);
    expect(response).toBe(skillResult);
  });


  it("Get Skills with 2 Skill Id", async () => {
    var skills = '1,2';

    var skillResult = [
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

    getSkillByMultipleId.mockResolvedValue(skillResult);
    let response = await service.getSkillByMultipleId(skills);
    expect(response).toBe(skillResult);
  });
});
