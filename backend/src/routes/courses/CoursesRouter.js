const express = require("express");

function courseRoutes(service) {
  const router = express.Router();
  router.get('/', async (req, res) => {
    try {
      const data = await service.getCourses();
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

  
  
  router.get('/skill/:skills', async (req, res) => {
    let skills = req.params.skills

    try {
      const data = await service.getCoursesBySkill(skills);
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

  router.get('/multiple/skill/:skills', async (req, res) => {
    let skills = req.params.skills

    try {
      const data = await service.getCoursesByMultipleSkill(skills);
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
