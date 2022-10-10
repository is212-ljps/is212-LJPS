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

router.get('/:skillID', (req, res) => {
  let skilId = req.params.skillID
  connection.connect(err => {
    const getCoursesBasedOnSkill = `SELECT * FROM course_skill WHERE Course_ID in (SELECT Course_ID FROM course WHERE Is_Active=TRUE)`
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
