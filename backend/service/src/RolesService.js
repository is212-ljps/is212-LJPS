const utils = require('../../util')

function rolesService(database){
  const rolesService = {}

  rolesService.getAllRoles = async () => {
    try {
      return await database.getAllRoles();
    } catch (err) {
      throw err;
    }
  }

  rolesService.getInactiveRoles = async () => {
    try {
      return await database.getInactiveRoles();
    } catch (err) {
      throw err;
    }
  }

  rolesService.getRoleById = async (roleId) => {
    if(!roleId){
      return false
    }
    try {
      return await database.getRoleById(roleId)
    } catch (err) {
      throw err;
    }
  }

  rolesService.getSkillsAssignedToRole = async (roleId) => {
    if(!roleId){
      return false
    }
    try {
      return await database.getSkillsAssignedToRole(roleId)
    } catch (err) {
      throw err;
    }
  }

  rolesService.createRole = async (roleName, roleDescription, department, assignedSkills) => {
    if(!roleName || !department || !assignedSkills){
      return false
    } else if (utils.checkLength(5,50, roleName) || utils.checkLength(0,300, roleDescription) || utils.checkLength(1,9999, assignedSkills)) {
      return false
    }

    try {
      const data = await database.createRole(roleName, roleDescription, department);
      const result = await database.assignSkillsToRoles(assignedSkills, data.insertId);
      return data.insertId;
    } catch (err) {
      throw err;
    }
  }

  rolesService.deleteRoleById = async (roleId) => {
    if(!roleId){
      return false
    }
    try {
      return await database.deleteRoleById(roleId)
    } catch (err) {
      throw err;
    }
  }

  rolesService.updateRoleDetails = async (roleId, roleName, roleDescription, jobDepartment, assignedSkills) => {
    if(!roleId || !roleName || !roleDescription || !jobDepartment || !assignedSkills){
      return false
    } else if (utils.checkLength(5,50, roleName) || utils.checkLength(0,300, roleDescription) || utils.checkLength(1,9999, assignedSkills)) {
      return false
    }
    try {
      const data = await database.updateRoleDetails(roleId, roleName, roleDescription, jobDepartment);
      await database.removeSkillsFromRole(roleId)
      await database.assignSkillsToRoles(assignedSkills, roleId);
      return data;
    } catch (err) {
      throw err;
    }
  }

  return rolesService;
}

module.exports = rolesService;