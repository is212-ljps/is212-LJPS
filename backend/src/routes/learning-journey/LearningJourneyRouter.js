const express = require("express");

function learningJourneyRoutes(service) {
  const router = express.Router();
  router.post("/", async (req, res) => {
    let learningJourneyName = req.body.learningJourneyName;
    let staffId = req.body.staffId;
    let jobRoleId = req.body.jobRoleId;
    let skillId = req.body.skillId;
    let courses = req.body.courses;

    try {
      const learningJourneyId = await service.createLearningJourney(
        learningJourneyName,
        skillId,
        jobRoleId,
        courses,
        skillId
      );
      res.status(201).send({
        success: true,
        message: "Learning Journey Created",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        message: "An error occured, please try again ",
      });
    }
  });

  router.get("/:learningJourneyId", async (req, res) => {
    let learningJourneyId = req.params.learningJourneyId;
    try {
      const result = await service.getLearningJourney(learningJourneyId);
      res.status(200).send({
        success: true,
        data: result,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        message: "An error occured, please try again ",
      });
    }
  });

  router.delete("/:learningJourneyId", async (req, res) => {
    let learningJourneyId = req.params.learningJourneyId;
    try {
      const result = await service.deleteLearningJourney(learningJourneyId);
      res.status(200).send({
        success: true,
        data: "",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        success: false,
        message: "An error occured, please try again ",
      });
    }
  });

  router.get("/staff/:staffID", async (req, res) => {
    let staffID = req.params.staffID;

    try {
      const result = await service.getLearningJourneyByStaffId(staffID);
      console.log(result);

      res.status(200).send({
        success: true,
        data: result,
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "An error occured, please try again ",
      });
    }
  });

  return router;
}

module.exports.learningJourneyRoutes = learningJourneyRoutes;
