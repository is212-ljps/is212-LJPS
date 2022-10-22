const express = require("express");

function learningJourneyRoutes(database) {
  const router = express.Router();
  router.post("/", async (req, res) => {
    let learningJourneyName = req.body.learningJourneyName;
    let staffId = req.body.staffId;
    let jobRoleId = req.body.jobRoleId;
    let skillId = req.body.skillId;
    let courses = req.body.courses;

    try {
      const learningJourneyId = await database.createLearningJourney(
        learningJourneyName,
        staffId,
        jobRoleId
      );
      await database.createLearningJourneySkill(learningJourneyId, skillId);
      await database.createLearningJourneyCourse(learningJourneyId, courses);
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
    let learningJourney = {};
    try {

      const learningJourneyResult = await database.getLearningJourney(
        learningJourneyId
      );
      learningJourney.Learning_Journey_ID =
        learningJourneyResult[0].Learning_Journey_ID;
      learningJourney.Learning_Journey_Name =
        learningJourneyResult[0].Learning_Journey_Name;

      const learningJourneyCoursesResult =
        await database.getLearningJourneyCourses(learningJourneyId);

      learningJourney.courses = learningJourneyCoursesResult;

      const courses = learningJourneyCoursesResult.map(
        ({ Course_ID }) => Course_ID
      );

      const learningJourneySkillsResult = await database.getLearningJourneySkills(learningJourneyId)

      learningJourney.skills = learningJourneySkillsResult
      const coursesSkillsResult = await database.getCoursesSkills(courses);

      const courseSkills = coursesSkillsResult.map(
        ({ Skill_Name, Course_ID }) => {
          return { Skill_Name, Course_ID };
        }
      );

      for (let course of learningJourney.courses) {
        for (let skill of courseSkills) {
          if (skill.Course_ID == course.Course_ID) {
            if (course.skills) {
              course.skills.push(skill.Skill_Name);
            }
            else{
              course.skills=[skill.Skill_Name]
            }
          }
        }
      }


      res.status(200).send({
        success: true,
        data: learningJourney,
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
      const result = await database.getLearningJourneyByStaffID(staffID);

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
