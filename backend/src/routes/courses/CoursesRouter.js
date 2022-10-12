const express = require("express");
const router = express.Router();

var connection = require('../../../database/database')

router.get('/', (req, res) => {
  connection.connect(err => {
<<<<<<< Updated upstream
    const getCourses = `SELECT * FROM course`
=======
    // Changed the SQL statement from Is_Active = True to Course_status='active'
    const getCourses = `SELECT * FROM course WHERE Course_Status='active'`
>>>>>>> Stashed changes
    connection.query(getCourses, (err, result) =>{
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

router.get('/skill/:skillID', (req, res) => {
  let skillId = req.params.skillID
  connection.connect(err => {
<<<<<<< Updated upstream
=======
    // Change the SQL statement to include the WHERE statement Course_Status='Active'
>>>>>>> Stashed changes
    const getCoursesBasedOnSkill = `SELECT * FROM course WHERE Course_Status="Active" AND Course_ID in (SELECT Course_ID FROM course_skill WHERE Skill_ID=${skillId});`
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
