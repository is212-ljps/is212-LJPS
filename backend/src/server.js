const database = require('../database')
const { makeApp } = require('./app')

const port = process.env.PORT || '8080';
const server = makeApp(database("ljps_db"))
server.listen(port, () => console.log(`One step closer to graduating ! localhost:${port}`));

module.exports = server;



