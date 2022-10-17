const express = require("express");
const router = express.Router();

var connection = require("../../../database");

router.get("/:Staff_ID", (req, res) => {

  let staffID = req.params.Staff_ID
  connection.connect((err) => {
    const getLearningJourneys = `SELECT * from learning_journey INNER join learning_journey_skill on learning_journey.Learning_Journey_ID=learning_journey_skill.Learning_Journey_ID INNER JOIN skill on learning_journey_skill.Skill_ID= skill.Skill_ID WHERE Staff_ID = ${staffID}; `;
    connection.query(getLearningJourneys, (err, result) => {
      if (err) {
        res.send({
          success: false,
          message: "An error occured, please try again ",
        });
      } else {
        console.log(result)
        res.send({
          success: true,
          message: "",
          data: result,
        });
      }
    });
  });
});




module.exports = router;
