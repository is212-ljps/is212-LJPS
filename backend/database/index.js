var mysql = require("mysql");
const { promisify } = require("util");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "ljps_db",
});

const promiseQuery = promisify(connection.query).bind(connection);

exports.createLearningJourney = async (
  learningJourneyName,
  staffId,
  jobRoleId
) => {
  const insertLearningJourney = `INSERT INTO learning_journey (Learning_Journey_Name, Staff_ID, Job_Role_ID) VALUES ("${learningJourneyName}", ${staffId}, ${jobRoleId})`;

  try {
    const result = await promiseQuery(insertLearningJourney);
    return result.insertId;
  } catch (err) {
    throw err;
  }
};

exports.deleteLearningJourney = async (learningJourneyId) => {
  const deleteLearningJourney = `DELETE FROM learning_journey WHERE Learning_Journey_ID=${learningJourneyId}`
  try {
    const result = await promiseQuery(deleteLearningJourney)
    return result
  } catch (err) {
    throw err
  }

}

exports.createLearningJourneySkill = async (learningJourneyId, skillId) => {
  const insertLearningJourneySkill = `INSERT INTO learning_journey_skill (Learning_Journey_ID, Skill_ID) VALUES (${learningJourneyId}, ${skillId})`;
  try {
    const result = await promiseQuery(insertLearningJourneySkill);
  } catch (err) {
    throw err;
  }
};

exports.createLearningJourneyCourse = async (learningJourneyId, courses) => {
  for (var course of courses) {
    const insertLearningJourneyCourse = `INSERT INTO learning_journey_course (Learning_Journey_ID, Course_ID) VALUES (${learningJourneyId}, "${course}")`;
    try {
      const result = await promiseQuery(insertLearningJourneyCourse);
    } catch (err) {
      throw err;
    }
  }
};

exports.getLearningJourney = async (learningJourneyId) => {
  const getLearningJourney = `SELECT * FROM learning_journey WHERE Learning_Journey_ID=${learningJourneyId};`;
  try {
    const result = await promiseQuery(getLearningJourney);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.getLearningJourneyByStaffID = async (staffID) => {
  const getLearningJourneys = `SELECT * from learning_journey INNER join learning_journey_skill on learning_journey.Learning_Journey_ID=learning_journey_skill.Learning_Journey_ID INNER JOIN skill on learning_journey_skill.Skill_ID= skill.Skill_ID WHERE Staff_ID = ${staffID}; `;
  try {
    const result = await promiseQuery(getLearningJourneys);
    return result;
  } catch (err) {
    console.log(err)
    throw err;
  }
};

exports.getLearningJourneyCourses = async (learningJourneyID) => {
  const getLearningJourneyCourses = `SELECT Course.Course_ID, Course.Course_Name, Course.Course_Desc, Course.Course_Category, Course.Course_Status from learning_journey INNER JOIN learning_journey_course on learning_journey.Learning_Journey_ID=learning_journey_course.Learning_Journey_ID INNER JOIN course on learning_journey_course.Course_ID= course.Course_ID WHERE learning_journey.Learning_Journey_ID=${learningJourneyID};`;
  try {
    const result = await promiseQuery(getLearningJourneyCourses);
    return result;
  } catch (error) {
    throw err;
  }
};

exports.getLearningJourneySkills = async (learningJourneyID) => {
  const getLearningJourneySkills = `SELECT Skill.Skill_ID, Skill.Skill_Name, Skill.Skill_Description from learning_journey INNER JOIN learning_journey_skill on learning_journey.Learning_Journey_ID=learning_journey_skill.Learning_Journey_ID INNER JOIN skill on learning_journey_skill.Skill_ID= skill.Skill_ID WHERE learning_journey.Learning_Journey_ID=${learningJourneyID};`;
  try {
    const result = await promiseQuery(getLearningJourneySkills);
    return result;
  } catch (error) {
    throw err;
  }
};

exports.getCoursesSkills = async (courses) => {
  let str = "";
  courses.forEach((item) => (str += `course.Course_ID='${item}' OR `));

  const getCoursesSkills = `select * FROM course INNER JOIN course_skill ON course.Course_ID=course_skill.Course_ID INNER JOIN skill on course_skill.Skill_ID= skill.Skill_ID WHERE ${str.slice(
    0,
    -4
  )};`;
  try {
    const result = await promiseQuery(getCoursesSkills);
    return result;
  } catch (error) {
    throw error;
  }
};

exports.getCourses = async () => {
  const getCourses = `SELECT * FROM course WHERE Course_Status="Active"`;
  try {
    const result = await promiseQuery(getCourses);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.getCoursesBySkill = async (skillId) => {
  const getCoursesBasedOnSkill = `SELECT * FROM course WHERE Course_ID in (SELECT Course_ID FROM course_skill WHERE Skill_ID=${skillId});`;
  try {
    const result = await promiseQuery(getCoursesBasedOnSkill);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.getAllSkills = async () => {
  const getSkills = `SELECT * FROM skill WHERE Is_Active=TRUE`;
  try {
    const result = await promiseQuery(getSkills);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.getInactiveSkills = async () => {
  const getInActiveSkills = `SELECT * FROM skill WHERE Is_Active=FALSE`
  try {
    const result = await promiseQuery(getInActiveSkills)
    return result
  } catch (err){
    throw err
  }
}

exports.getSkillById = async (skillID) => {
  const getSkill = `SELECT * FROM skill WHERE Skill_ID=${skillID} AND Is_Active=TRUE`;
  try {
    const result = await promiseQuery(getSkill);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.createSkill = async (skillName, skillDescription) => {
  var insert_sql = `INSERT into Skill (Skill_Name, Skill_Description, Is_Active) VALUES ('${skillName}', '${skillDescription}', TRUE );`;
  try {
    const result = await promiseQuery(insert_sql);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteSkillById = async (skillID) => {
  var update_sql = `UPDATE Skill SET Is_Active=${false} WHERE Skill_ID=${skillID};`;
  try {
    const result = await promiseQuery(update_sql);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.updateSkillById = async (skillID, skillName, skillDescription) => {
  var update_sql = `UPDATE skill SET Skill_Name='${skillName}', Skill_Description='${skillDescription}' WHERE Skill_ID=${skillID}`;
  try {
    const result = await promiseQuery(update_sql);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.createRole = async (roleName, roleDescription, department) => {
  var insert_sql = `INSERT into job_role (Job_Role_Name, Job_Role_Description, Job_Department, Is_Active) VALUES ('${roleName}', '${roleDescription}', '${department}' , TRUE );`;
  try {
    const result = await promiseQuery(insert_sql);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.assignSkillsToRoles = async (assignedSkills, roleId) => {
  var assignSkillsSql = `INSERT into job_role_skill (Job_Role_ID, Skill_ID) VALUES `;
  assignedSkills.forEach((item) => {
    assignSkillsSql += `(${roleId}, ${item}), `;
  });
  assignSkillsSql = assignSkillsSql.slice(0, -2) + `;`;
  try {
    const result = await promiseQuery(assignSkillsSql);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.assignCoursesToSkills = async (assignedCourses, skillID) => {
  var assignCoursesSql = `INSERT into course_skill (Skill_ID, Course_ID) VALUES `;
  assignedCourses.forEach((item) => {
    assignCoursesSql += `(${skillID}, "${item}"), `;
  });
  assignCoursesSql = assignCoursesSql.slice(0, -2) + `;`;
  try {
    const result = await promiseQuery(assignCoursesSql);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.removeCoursesFromSkill = async (skillID) => {
  const removeCoursesFromSkill = `DELETE FROM course_skill WHERE Skill_ID=${skillID}`;
  try {
    const result = await promiseQuery(removeCoursesFromSkill);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.removeSkillsFromRole = async (roleID) => {
  const removeSkillsFromRole = `DELETE FROM job_role_skill WHERE Job_Role_ID=${roleID}`;
  try {
    const result = await promiseQuery(removeSkillsFromRole);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.deleteRoleById = async (roleID) => {
  var update_sql = `UPDATE job_role SET Is_Active=${false} WHERE Job_Role_ID=${roleID}`;
  try {
    const result = await promiseQuery(update_sql);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.getAllRoles = async () => {
  const getRoles = `SELECT * FROM job_role WHERE Is_Active=TRUE`;
  try {
    const result = await promiseQuery(getRoles);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.getInactiveRoles = async () => {
  const getInactiveRoles = `SELECT * FROM job_role WHERE Is_Active=FALSE`
  try {
    const result = await promiseQuery(getInactiveRoles)
    return result
  } catch (err){
    throw err
  }
}

exports.getRoleById = async (roleID) => {
  const getRole = `SELECT * FROM job_role WHERE Job_Role_ID=${roleID} AND Is_Active= TRUE`;
  try {
    const result = await promiseQuery(getRole);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.getSkillsAssignedToRole = async (roleID) => {
  const getSkills = `SELECT  job_role_skill.Job_Role_ID ,skill.Skill_ID , skill.Skill_Name, skill.Skill_Description
      FROM job_role_skill
      INNER JOIN skill ON skill.Skill_ID=job_role_skill.Skill_ID
      WHERE skill.Is_Active= TRUE AND Job_Role_ID=${roleID};`;
  try {
    const result = await promiseQuery(getSkills);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.getCoursesAssignedToSkill = async (skillID) => {
  const getCourses = `SELECT  course_skill.Skill_ID ,course.Course_ID , course.Course_Name, course.Course_Desc
      FROM course_skill
      INNER JOIN course ON course.Course_ID=course_skill.Course_ID
      WHERE course.Course_Status="Active" AND Skill_ID=${skillID};`;
  try {
    const result = await promiseQuery(getCourses);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.updateRoleDetails = async (
  roleID,
  roleName,
  roleDescription,
  jobDepartment
) => {
  const updateRole = `UPDATE job_role SET Job_Role_Name='${roleName}', 
        Job_Role_Description='${roleDescription}',
        Job_Department='${jobDepartment}'
        WHERE Job_Role_ID=${roleID}`;
  try {
    const result = await promiseQuery(updateRole);
    return result.insertId;
  } catch (err) {
    throw err;
  }
};

exports.removeCourseFromLearningJourney = async (learningJourneyId, courseId) => {
  const removeCourseFromLearningJourney = `DELETE FROM learning_journey_course WHERE Learning_Journey_Id=${learningJourneyId} AND Course_ID='${courseId}';`
  try {
    const result = await promiseQuery(removeCourseFromLearningJourney);
    return true;
  } catch (err) {
    console.log(err)
    throw err;
  }
}

exports.getCoursesBySkills = async (skills) => {

  skills = skills.split(",")
  let str = "";
  skills.forEach((skill) => (str += `Skill_ID='${skill}' OR `));
  const getCoursesBasedOnSkill = `SELECT * FROM course WHERE Course_ID in (SELECT Course_ID FROM course_skill WHERE ${str.slice(0, -4)});`;


  try {
    const result = await promiseQuery(getCoursesBasedOnSkill);
    return result;
  } catch (err) {
    throw err;
  }
};

exports.addCourseToLearningJourney = async (learningJourneyId, courseIds) => {
  var addCourseToLearningJourney = `INSERT into learning_journey_course (Learning_Journey_ID, Course_ID) VALUES `;
  console.log(courseIds)
  courseIds.forEach((courseId) => {
    addCourseToLearningJourney += `(${learningJourneyId}, '${courseId}'), `;
  });
  addCourseToLearningJourney = addCourseToLearningJourney.slice(0, -2) + `;`;
  console.log(addCourseToLearningJourney)
  try {
    const result = await promiseQuery(addCourseToLearningJourney);
    return result;
  } catch (err) {
    console.log(err)
    throw err;
  }
}