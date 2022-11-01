import React, { useCallback, useState, useEffect, useRef } from "react"
import axios from "axios"


const defaultError = {
  minCourseLength: ''
}

export default function AddCourses({ learningJourneyName, learningJourneyId, getLearningJourney, coursesLength }) {
  const [courses, setCourses] = useState([])
  const [error, setError] = useState(defaultError)
  const modal = useRef()

  useEffect(() => {
    getUnaddedCourses()
  }, [learningJourneyId, coursesLength])

  useEffect(() => {
    if (!modal.current) return
    modal.current.addEventListener("hidden.bs.modal", (e) => {
      setError(defaultError)
    })

  }, [modal.current])

  const getUnaddedCourses = useCallback(() => {
    if (!learningJourneyId) return
    const url = `${process.env.NEXT_PUBLIC_BACKEND}/api/courses/learning-journey/${learningJourneyId}?isAdded=false`
    axios.get(url).then((res) => {
      setCourses(res.data.data)
    })
  }, [learningJourneyId])

  const handleSubmit = useCallback(() => {
    const courseElements = Array.from(document.getElementsByName("course-checkbox")).filter((item) => item.checked)
    const courseIds = courseElements.map((item) => item.value)
    if (!courseIds.length) {
      const err = { ...defaultError, minCourseLength: 'Please select at least one course to add' }
      setError(err)
      return
    }
    const addCourseModal = bootstrap.Modal.getInstance(modal.current);
    addCourseModal.hide()

    setError(defaultError)
    updateLearningJourneyCourses(courseIds)
    courseElements.forEach(item => item.checked = false)
  })

  const updateLearningJourneyCourses = useCallback((courseIds) => {
    const url = `${process.env.NEXT_PUBLIC_BACKEND}/api/learning-journey/${learningJourneyId}/courses`
    axios.put(url, { courseIds }).then(() => {
      getUnaddedCourses()
      getLearningJourney()
    })
  }, [learningJourneyId])

  return <div ref={modal} className="modal-xl modal fade" id="add-courses-modal" tabIndex="-1" aria-labelledby="add-courses-modal" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add courses to {learningJourneyName}</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className="row">
            {courses?.map((course) => (
              <div className="col-12 col-lg-6 col-xl-4" key={course.Course_ID}>
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
                        <span className="badge rounded-pill bg-dark py-2 mb-1 me-2" style={{ fontSize: "11px" }} key={skill}>
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
                          className="form-check-input ms-2"
                          type={"checkbox"}
                          id={course.Course_ID}
                          key={course.Course_ID}
                          name="course-checkbox"
                          value={course.Course_ID}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {courses.length == 0 && <p>There are currently no available courses for your selected skills.</p>}
          </div>
        </div>
        <div className="modal-footer">
          {error.minCourseLength && <p className="text-danger">{error.minCourseLength}</p>}
          <div>
            <button type="button" className="btn btn-secondary mx-1" data-bs-dismiss="modal">Cancel</button>
            <button type="button" className="btn btn-primary mx-1" onClick={handleSubmit}>Add courses</button>
          </div>
        </div>
      </div>
    </div>
  </div>
}