import React, { useCallback, useState, useEffect } from "react"
import axios from "axios"


export default function AddCourses({ learningJourneyName, learningJourneyId }) {
  const [courses, setCourses] = useState([])
  console.log(learningJourneyId)
  useEffect(() => {
    getUnaddedCourses()
  }, [learningJourneyId])

  const getUnaddedCourses = useCallback(() => {
    if (!learningJourneyId) return
    const url = `http://localhost:8080/api/courses/learning-journey/${learningJourneyId}?isAdded=false`
    axios.get(url).then((res) => {
      setCourses(res.data.data)
    })
  }, [learningJourneyId])

  return <div className="modal-xl modal fade" id="add-courses-modal" tabIndex="-1" aria-labelledby="add-courses-modal" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add courses to {learningJourneyName}</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div class="row">
            {courses?.map((course) => (
              <div className="col-12 col-md-6 col-xl-4">
                {console.log(course)}
                <div className="card mt-2 shadow border-0">
                  <div className="card-header bg-primary text-light">
                    <b>{course.Course_Name}</b>
                  </div>
                  <div className="row pt-3">
                    <div className="col-7">
                      <p className="mx-3 mb-1">Course ID: {course.Course_ID}</p>
                    </div>
                    <div className="col-5 px-4" align="right">
                      <div className=" badge bg-light text-black">
                        {course.Course_Category}
                      </div>
                    </div>
                  </div>
                  <div className="row p-2">
                    <div className="col-12 px-3">
                      {course.Skills?.map((skill) => (
                        <span className="badge rounded-pill bg-dark py-2 mb-1 me-2" style={{fontSize:"11px"}} key={skill}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="row mx-1">
                    <div className="col-10">

                      <p>{course.Course_Desc}</p>
                    </div>
                    <div className="col-2" align="right">
                      <div>
                        <label style={{ cursor: "pointer" }} htmlFor={course.Course_ID}>
                          Add
                        </label>
                        <input
                          type={"checkbox"}
                          id={course.Course_ID}
                          key={course.Course_ID}
                        // className={selectedCourses.includes(course.Course_ID)}
                        // onClick={toggleButton}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Add courses</button>
        </div>
      </div>
    </div>
  </div>
}