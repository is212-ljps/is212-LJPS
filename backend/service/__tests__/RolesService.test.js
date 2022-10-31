var RolesService = require('../src/RolesService');

const getAllRoles = jest.fn()
const getInactiveRoles = jest.fn()
const getRoleById = jest.fn()
const getSkillsAssignedToRole = jest.fn()
const createRole = jest.fn()
const deleteRoleById = jest.fn()
const updateRoleDetails = jest.fn()
const assignSkillsToRoles = jest.fn()

var service = RolesService({
  getAllRoles,
  getInactiveRoles,
  getRoleById,
  getSkillsAssignedToRole,
  createRole,
  deleteRoleById,
  updateRoleDetails,
  assignSkillsToRoles
})

describe("Tests for Roles Service", () => {
  beforeEach(()=>{
    getAllRoles.mockReset()
    getInactiveRoles.mockReset()
    getRoleById.mockReset()
    getSkillsAssignedToRole.mockReset()
    createRole.mockReset()
    deleteRoleById.mockReset()
    updateRoleDetails.mockReset()
  })

  it('Get all roles', async ()=>{
    expectedValue = [
      {
          "Job_Role_ID": 1,
          "Job_Role_Name": "Software",
          "Job_Role_Description": "Description",
          "Job_Department": "Finance",
          "Is_Active": true
      },
      {
        "Job_Role_ID": 2,
        "Job_Role_Name": "Software Engineer",
        "Job_Role_Description": "Description",
        "Job_Department": "Finance",
        "Is_Active": false
    }
    ]
    getAllRoles.mockResolvedValue(expectedValue)
    let response = await service.getAllRoles();
    expect(response).toBe(expectedValue)
    expect(getAllRoles.mock.calls.length).toBe(1)
    expect(getAllRoles.mock.calls[0].length).toBe(0)

  })

  it('Get all inactive roles', async () => {
    expectedValue = [
      {
        "Job_Role_ID": 1,
        "Job_Role_Name": "Software",
        "Job_Role_Description": "Description",
        "Job_Department": "Finance",
        "Is_Active": true
      }
    ]
    getInactiveRoles.mockResolvedValue(expectedValue)
    let response = await service.getInactiveRoles();
    expect(response).toBe(expectedValue)
    expect(getInactiveRoles.mock.calls.length).toBe(1);
    expect(getInactiveRoles.mock.calls[0].length).toBe(0)
  })

  it('Get role by Id', async ()=>{
    roleId = 1
    expectedValue = [
      {
        "Job_Role_ID": 1,
        "Job_Role_Name": "Software",
        "Job_Role_Description": "Description",
        "Job_Department": "Finance",
        "Is_Active": true
      }
    ]
    getRoleById.mockResolvedValue(expectedValue)
    let response = await service.getRoleById(roleId);
    expect(response).toBe(expectedValue)
    expect(getRoleById.mock.calls.length).toBe(1);
    expect(getRoleById.mock.calls[0][0]).toBe(roleId)
  })

  it('Get role by Id should return false when no roleId', async ()=>{

    let response = await service.getRoleById();
    expect(response).toBe(false)
    expect(getRoleById.mock.calls.length).toBe(0);
  })

  it('Get skills assigned to role', async ()=>{
    roleId = 1
    expectedValue = [
      {
        "Job_Role_ID": roleId,
        "Skill_ID": 1,
        "Skill_Name": "Skill name",
        "Skill_Description": "Skill description",
      }
    ]
    getSkillsAssignedToRole.mockResolvedValue(expectedValue)
    let response = await service.getSkillsAssignedToRole(roleId);
    expect(response).toBe(expectedValue)
    expect(getSkillsAssignedToRole.mock.calls.length).toBe(1);
    expect(getSkillsAssignedToRole.mock.calls[0][0]).toBe(roleId)
  })

  it('Get skills assigned to role when no roleId', async ()=>{

    let response = await service.getSkillsAssignedToRole();
    expect(response).toBe(false)
    expect(getRoleById.mock.calls.length).toBe(0);
  })

  it('Create role', async ()=>{
    roleId = 1
    const roleName = "rolename"
    const roleDescription = "role description"
    const department = "Finance"
    const assignSkills = [1, 2]
    expectedValue = [
      {
        "insertId": roleId
      }
    ]
    createRole.mockResolvedValue(expectedValue)
    let response = await service.createRole(roleName, roleDescription, department, assignSkills);
    expect(response).toBe(expectedValue.insertId)
    expect(createRole.mock.calls.length).toBe(1);
    expect(assignSkillsToRoles.mock.calls.length).toBe(1)
    expect(createRole.mock.calls[0][0]).toBe(roleName)
    expect(createRole.mock.calls[0][1]).toBe(roleDescription)
    expect(createRole.mock.calls[0][2]).toBe(department)
    expect(assignSkillsToRoles.mock.calls[0][0]).toBe(assignSkills)
  })
})