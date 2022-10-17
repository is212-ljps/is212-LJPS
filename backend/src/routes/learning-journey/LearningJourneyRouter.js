const express = require("express");

function learningJourneyRoutes(database){
  const router = express.Router();
  router.post('/', async (req, res) => {
    let learningJourneyName = req.body.learningJourneyName;
    let staffId = req.body.staffId;
    let jobRoleId = req.body.jobRoleId;
    let skillId = req.body.skillId;
    let courses = req.body.courses;

    try {
      const learningJourneyId = await database.createLearningJourney(learningJourneyName, staffId, jobRoleId);
      await database.createLearningJourneySkill(learningJourneyId, skillId);
      await database.createLearningJourneyCourse(learningJourneyId, courses);
      res.status(201).send({
        success: true,
        message: "Learning Journey Created"
      });
    } catch (err) {
      console.log(err)
      res.status(500).send({
        success: false,
        message: "An error occured, please try again ",
      })
    }  
  })
  
  router.get('/:learningJourneyId', async (req, res) => {
    let learningJourneyId = req.params.learningJourneyId
    try {
      
      const result = await database.getLearningJourney(learningJourneyId);
      res.status(200).send({
        success: true,
        data: result
      });
    } catch (err) {
      console.log(err)
      res.status(500).send({
        success: false,
        message: "An error occured, please try again ",
      })
    }  
  })


  router.get("/staff/:staffID", async (req, res) => {

    
    let staffID = req.params.staffID

    console.log('-------')
    console.log(staffID)

    try {
      
      const result = await database.getLearningJourneyByStaffID(staffID);

      console.log(result)
      res.status(200).send({
        success: true,
        data: result
      });
    } catch (err) {
      console.log(err)
      res.status(500).send({
        success: false,
        message: "An error occured, please try again ",
      })
    }  



  });

  return router;
}

module.exports.learningJourneyRoutes = learningJourneyRoutes;
