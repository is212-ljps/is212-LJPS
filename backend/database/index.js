var mysql = require("mysql");
const { promisify } = require('util')

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "ljps_db",
})

const promiseQuery = promisify(connection.query).bind(connection)

exports.createLearningJourney = async (learningJourneyName, staffId, jobRoleId) => {
  const insertLearningJourney = `INSERT INTO learning_journey (Learning_Journey_Name, Staff_ID, Job_Role_ID) VALUES ("${learningJourneyName}", ${staffId}, ${jobRoleId})`

  try {
    const result = await promiseQuery(insertLearningJourney)
    return result.insertId;
  } catch (err){
    throw err
  }
  
}

exports.createLearningJourneySkill = async (learningJourneyId, skillId) => {

  const insertLearningJourneySkill = `INSERT INTO learning_journey_skill (Learning_Journey_ID, Skill_ID) VALUES (${learningJourneyId}, ${skillId})`;
  try {
    const result = await promiseQuery(insertLearningJourneySkill)
  } catch (err){
    throw err
  }
}

exports.createLearningJourneyCourse = async (courses, learningJourneyId) => {
  for (course of courses) {
    const insertLearningJourneyCourse = `INSERT INTO learning_journey_course (Learning_Journey_ID, Course_ID) VALUES (${learningJourneyId}, "${course}")`;
    try {
      const result = await promiseQuery(insertLearningJourneyCourse)
    } catch (err){
      throw err 
    }
  }
}

exports.getLearningJourney = async (learningJourneyId) => {
  const getLearningJourney = `SELECT * FROM learning_journey WHERE Learning_Journey_ID=${learningJourneyId};`
  try {
    const result = await promiseQuery(getLearningJourney)
    return result
  } catch (err){
    throw err
  }
}

exports.getCourses = async () => {
  const getCourses = `SELECT * FROM course WHERE Is_Active=TRUE`
  try {
    const result = await promiseQuery(getCourses)
    return result
  } catch (err){
    throw err
  }
}

exports.getCoursesBySkill = async (skillId) => {
  const getCoursesBasedOnSkill = `SELECT * FROM course WHERE Course_ID in (SELECT Course_ID FROM course_skill WHERE Skill_ID=${skillId});`
  try {
    const result = await promiseQuery(getCoursesBasedOnSkill)
    return result
  } catch (err){
    throw err
  }
}

exports.getAllSkills = async () => {
  const getSkills = `SELECT * FROM skill WHERE Is_Active=TRUE`
  try {
    const result = await promiseQuery(getSkills)
    return result
  } catch (err){
    throw err
  }
}

exports.getSkillById = async (skillID) => {
  const getSkill = `SELECT * FROM skill WHERE Skill_ID=${skillID} AND Is_Active=TRUE`
  try {
    const result = await promiseQuery(getSkill)
    return result
  } catch (err){
    throw err
  }
}

exports.createSkill = async (skillName, skillDescription) => {
  var insert_sql = `INSERT into Skill (Skill_Name, Skill_Description, Is_Active) VALUES ('${skillName}', '${skillDescription}', TRUE );`;
  try {
    const result = await promiseQuery(insert_sql)
    return result
  } catch (err){
    throw err
  }
}

exports.deleteSkillById = async (skillID) => {
  var update_sql = `UPDATE Skill SET Is_Active=${false} WHERE Skill_ID=${skillID};`;
  try {
    const result = await promiseQuery(update_sql)
    return result
  } catch (err){
    throw err
  }
}

exports.updateSkillById = async (skillID, skillName, skillDescription) => {
  var update_sql = `UPDATE skill SET Skill_Name='${skillName}', Skill_Description='${skillDescription}' WHERE Skill_ID=${skillID}`
  try {
    const result = await promiseQuery(update_sql)
    return result
  } catch (err){
    throw err
  }
}

exports.createRole = async (roleName, roleDescription, department) => {
  var insert_sql = `INSERT into job_role (Job_Role_Name, Job_Role_Description, Job_Department, Is_Active) VALUES ('${roleName}', '${roleDescription}', '${department}' , TRUE );`;
  try {
    const result = await promiseQuery(insert_sql)
    return result
  } catch (err){
    throw err
  }
}

exports.assignSkillsToRoles = async (assignedSkills, result) => {
  var assignSkillsSql = `INSERT into job_role_skill (Job_Role_ID, Skill_ID) VALUES `
  assignedSkills.forEach((item) => {
    assignSkillsSql += `(${result.insertId}, ${item}), `
  })
  assignSkillsSql = assignSkillsSql.slice(0, -2) + `;`
  try {
    const result = await promiseQuery(assignSkillsSql)
    return result
  } catch (err){
    throw err
  }
}

exports.removeSkillsFromRole = async (roleID) => {
  const removeSkillsFromRole = `DELETE FROM job_role_skill WHERE Job_Role_ID=${roleID}`
  try {
    const result = await promiseQuery(removeSkillsFromRole)
    return result
  } catch (err){
    throw err
  }
}

exports.deleteRoleById = async (roleID) => {
  var update_sql = `UPDATE job_role SET Is_Active=${false} WHERE Job_Role_ID=${roleID}`;
  try {
    const result = await promiseQuery(update_sql)
    return result
  } catch (err){
    throw err
  }
}

exports.getAllRoles = async () => {
  const getRoles = `SELECT * FROM job_role WHERE Is_Active=TRUE`
  try {
    const result = await promiseQuery(getRoles)
    return result
  } catch (err){
    throw err
  }
}

exports.getRoleById = async (roleID) => {
  const getRole = `SELECT * FROM job_role WHERE Job_Role_ID=${roleID} AND Is_Active= TRUE`
  try {
    const result = await promiseQuery(getRole)
    return result
  } catch (err){
    throw err
  }
}

exports.getSkillsAssignedToRole = async (roleID) => {
  const getSkills = `SELECT  job_role_skill.Job_Role_ID ,skill.Skill_ID , skill.Skill_Name, skill.Skill_Description
      FROM job_role_skill
      INNER JOIN skill ON skill.Skill_ID=job_role_skill.Skill_ID
      WHERE skill.Is_Active= TRUE AND Job_Role_ID=${roleID};`
  try {
    const result = await promiseQuery(getSkills)
    return result
  } catch (err){
    throw err
  }
}

exports.updateRoleDetails = async (roleID, roleName, roleDescription, jobDepartment) => {
  const updateRole =
        `UPDATE job_role SET Job_Role_Name='${roleName}', 
        Job_Role_Description='${roleDescription}',
        Job_Department='${jobDepartment}'
        WHERE Job_Role_ID=${roleID}`
  try {
    const result = await promiseQuery(updateRole)
    return result.insertId
  } catch (err){
    throw err
  }
}