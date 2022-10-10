const express = require("express");
const router = express.Router();

var connection = require('../../../database/database')

router.get('/:courseID', (req, res) => {
    let course_id = req.params.courseID
    connection.connect(err => {
      const getCourse = `SELECT * FROM course WHERE Course_ID="${course_id}" AND Course_status = 'Active' `
      connection.query(getCourse, (err, result) =>{
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