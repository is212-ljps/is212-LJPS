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
    console.log(err)
    return;
  }
  
}

exports.createLearningJourneySkill = async (learningJourneyId, skillId) => {

  const insertLearningJourneySkill = `INSERT INTO learning_journey_skill (Learning_Journey_ID, Skill_ID) VALUES (${learningJourneyId}, ${skillId})`;
  try {
    const result = await promiseQuery(insertLearningJourneySkill)
  } catch (err){
    console.log(err)
    return;
  }
}

exports.createLearningJourneyCourse = async (courses, learningJourneyId) => {
  for (course of courses) {
    const insertLearningJourneyCourse = `INSERT INTO learning_journey_course (Learning_Journey_ID, Course_ID) VALUES (${learningJourneyId}, "${course}")`;
    try {
      const result = await promiseQuery(insertLearningJourneyCourse)
    } catch (err){
      console.log(err)
      return;
    }
  }
}

exports.getLearningJourney = async (learningJourneyId) => {
  const getLearningJourney = `SELECT * FROM learning_journey WHERE Learning_Journey_ID=${learningJourneyId};`
  try {
    const result = await promiseQuery(getLearningJourney)
    return result
  } catch (err){
    console.log(err)
    return;
  }
}

exports.getCourses = async () => {
  const getCourses = `SELECT * FROM course WHERE Is_Active=TRUE`
  try {
    const result = await promiseQuery(getCourses)
    return result
  } catch (err){
    console.log(err)
    return;
  }
}

exports.getCoursesBySkill = async (skillId) => {
  const getCoursesBasedOnSkill = `SELECT * FROM course WHERE Course_ID in (SELECT Course_ID FROM course_skill WHERE Skill_ID=${skillId});`
  try {
    const result = await promiseQuery(getCoursesBasedOnSkill)
    return result
  } catch (err){
    console.log(err)
    return;
  }
}
