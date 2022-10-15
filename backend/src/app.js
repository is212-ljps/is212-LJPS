const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
var app = express();  


const RolesRouter = require('./routes/roles/RolesRouter');
const SkillsRouter = require('./routes/skills/SkillsRouter')
const CourseRouter = require('./routes/courses/CoursesRouter')
const LearningJourneyRouter = require('./routes/learning-journey/LearningJourneyRouter');


function makeApp (database) {
  app.use(cors())
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use((req, res, next)=>{
      console.log(`${req.method} - ${req.url}`)
      
      next()
  })
  app.use('/api/roles', RolesRouter.rolesRoutes(database));
  app.use('/api/skills', SkillsRouter.skillsRoutes(database))
  app.use('/api/courses', CourseRouter.courseRoutes(database));
  app.use('/api/learning-journey', LearningJourneyRouter.learningJourneyRoutes(database));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  return app
}

module.exports.makeApp = makeApp;