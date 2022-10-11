const express = require("express");
const router = express.Router();

var connection = require('../../../database/database')

router.get('/', (req, res) => {
  connection.connect(err => {
    const getCourses = `SELECT * FROM course WHERE Is_Active=TRUE`
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
