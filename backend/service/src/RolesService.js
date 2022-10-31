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
    try {
      return await database.getRoleById(roleId)
    } catch (err) {
      throw err;
    }
  }

  rolesService.getSkillsAssignedToRole = async (roleId) => {
    try {
      return await database.getSkillsAssignedToRole(roleId)
    } catch (err) {
      throw err;
    }
  }

  rolesService.createRole = async (roleName, roleDescription, department, assignedSkills) => {
    try {
      const data = await database.createRole(roleName, roleDescription, department);
      const result = await database.assignSkillsToRoles(assignedSkills, data.insertId);
      return data.insertId;
    } catch (err) {
      throw err;
    }
  }

  rolesService.deleteRoleById = async (roleId) => {
    try {
      return await database.deleteRoleById(roleId)
    } catch (err) {
      throw err;
    }
  }

  rolesService.updateRoleDetails = async (roleId, roleName, roleDescription, jobDepartment, assignedSkills) => {
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