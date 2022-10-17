const express = require("express");
const router = express.Router();

var connection = require('../../../database')


router.get('/', (req, res) => {
  connection.connect(err => {
    const getLearningJourneys = `SELECT * FROM learning_journey`
    connection.query(getLearningJourneys, (err, result) =>{
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