const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();  


const RolesRouter = require('./routes/roles/RolesRouter');
const SkillsRouter = require('./routes/skills/SkillsRouter')


app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next)=>{
    console.log(`${req.method} - ${req.url}`)
    
    next()
})
app.use('/api/roles', RolesRouter);
app.use('/api/skills', SkillsRouter)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




const port = process.env.PORT || '8080';
app.set('port', port);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*'); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



// Create HTTP server
const server = http.createServer(app);


server.listen(port, () => console.log(`One step closer to graduating ! localhost:${port}`));

exports.server = server;



