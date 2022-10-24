const request = require('supertest');
var database = require("../../database/index");

describe("Integration test for courses", () => {
  var server;
  beforeEach(() => {
    const { makeApp } = require('../app')
  
    server = makeApp(database("ljps_db_test"))
    port = 8000
    server.listen(port, () => console.log(`One step closer to graduating ! localhost:${port}`));
  })
  afterEach((done) => {
    done()
  })

  it('Get Courses', async () => {
    const getCoursesRes = await request(server).get("/api/courses");
    const courses = getCoursesRes._body.data
    
    expect(courses.length).toBe(19)
  })  
})
