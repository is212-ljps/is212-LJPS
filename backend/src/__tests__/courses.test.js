const request = require('supertest')


describe("GET /api/courses", () => {
  var app;
  beforeEach(()=>{
    app = require('../server');
  })
  afterEach(()=>{
    app.close();
  })
  it('get all courses with 200 status code', async ()=>{
    try {
      const response = await request(app).get("/api/courses");
      expect(response.statusCode).toBe(200)
    } catch(err) {
      console.log(err)
    }
  
  })
})