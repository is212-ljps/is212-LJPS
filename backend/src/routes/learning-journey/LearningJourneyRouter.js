const express = require("express");
const router = express.Router();

var connection = require('../../../database')

router.post('/', (req, res) => {
  let learningJourneyName = req.body.learningJourneyName;
  let staffId = req.body.staffId;
  let jobRoleId = req.body.jobRoleId;
  let skillId = req.body.skillId
  connection.connect(err => {
    const insertLearningJourney = `INSERT INTO learning_journey (Learning_Journey_Name,
      Staff_ID, Job_Role_ID) VALUES (${learningJourneyName}, ${staffId}, ${jobRoleId})`
    
    connection.query(insertLearningJourney, (err, result) =>{
      if (err) throw err;
      var learningJourneyId = result.insertId;
      const insertLearningJourneySkill = `INSERT INTO learning_journey_skill 
    (Learning_Journey_ID, Skill_ID) VALUES (${learningJourneyId}, ${skillId})`;
      connection.query(insertLearningJourneySkill, (err, result) => {
        if (err) {
          res.send({
            success: false,
            message: "An error occured, please try again ",
          });
        } else {
          res.send({
            success: true,
            message: ""
          });
        } 
      })
    })
    
    
  })
})

router.get('/skill/:skillID', (req, res) => {
  let skillId = req.params.skillID
  connection.connect(err => {
    const getCoursesBasedOnSkill = `SELECT * FROM course WHERE Course_ID in (SELECT Course_ID FROM course_skill WHERE Skill_ID=${skillId});`
    connection.query(getCoursesBasedOnSkill, (err, result) =>{
      if (err) {
        res.send({
          success: false,
          message: "An error occured, please try again ",
        });
      } else {
        res.send({
          success: true,
          message: "",
          data: result
        });
      } 
    })
  })
})

module.exports = router;
