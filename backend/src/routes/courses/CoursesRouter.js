const express = require("express");

function courseRoutes(database) {
  const router = express.Router();
  router.get('/', async (req, res) => {
    try {
      const data = await database.getCourses();
      res.status(200).send({
        success: true,
        data: data
      });
    } catch (err) {
      console.log(err)
      res.status(500).send({
        success: false,
        message: "An error occured, please try again ",
      })
    }  
  })
  
  router.get('/skill/:skillID', async (req, res) => {
    let skillId = req.params.skillID
    try {
      const data = await database.getCoursesBySkill(skillId);
      res.status(200).send({
        success: true,
        data: data
      });
    } catch (err) {
      console.log(err)
      res.status(500).send({
        success: false,
        message: "An error occured, please try again ",
      })
    }  
  }) 
  
  return router;
}

module.exports.courseRoutes = courseRoutes;
