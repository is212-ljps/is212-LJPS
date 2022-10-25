import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";
import RemoveCourseModal from '../../../../components/LearningJourneyComponent/RemoveCourseModal'
import AddCourseModal from '../../../../components/LearningJourneyComponent/AddCourseModal'

export default function LearningJourneyDetails() {
  var router = useRouter();
  var learningJourneyId = router.query["learningJourneyID"];

  const [learningJourney, setLearningJourney] = useState({});
  const [selectedCourse, setSelectedCourse] = useState()

  useEffect(() => {
    getLearningJourney()
  }, [learningJourneyId]);

  const getLearningJourney = useCallback(() => {
    if (!learningJourneyId) return
    const url = `http://localhost:8080/api/learning-journey/${learningJourneyId}`;
    const axiosFn = axios.get;
    axiosFn(url).then(function (response) {
      if (response.data.success) {
        setLearningJourney(response.data.data);
      }
    });
  }, [learningJourneyId])

  const removeCourse = useCallback(() => {
    const getUrl = `http://localhost:8080/api/learning-journey/${learningJourneyId}`
    const removeUrl = `http://localhost:8080/api/learning-journey/${learningJourneyId}/${selectedCourse.Course_ID}`
    axios.delete(removeUrl).then(() => {
      axios.get(getUrl).then((res) => {
        setLearningJourney(res.data.data)
      })
    });
  }, [selectedCourse?.Course_ID])

  return (
    <div className="container">
      <RemoveCourseModal course={selectedCourse} removeCourse={removeCourse} />
      <AddCourseModal learningJourneyName={learningJourney.Learning_Journey_Name} />
      <div className="row py-4">
        <div className="col-md-5 d-flex justify-content-center flex-column">
          <div>
            <h3 className="text-primary">
              {learningJourney.Learning_Journey_Name}
            </h3>
            <h4 className="fw-bold">
              {learningJourney.courses?.length} courses
            </h4>
          </div>
          <div className="row mt-4 ">
            <hr></hr>
            <h5 className="mt-2 mb-4">Selected Skills: </h5>
            <div className="col-12">
              {learningJourney.skills?.map((skill) => (
                <span className="badge rounded-pill bg-dark py-2 me-2" key={skill.Skill_Name}>
                  {skill.Skill_Name}
                </span>
              ))}
            </div>
          </div>
        </div>


        <div className="col-md-7 d-flex justify-content-center">
          <Player
            src="https://assets3.lottiefiles.com/packages/lf20_DMgKk1.json"
            className="player"
            autoplay
            loop
            style={{ height: "370px", width: "400px" }}
          ></Player>
        </div>
      </div>


      <h4 className="fw-bold"> Courses <span><button className="btn btn-light shadow-sm ms-3" data-bs-target="#add-courses-modal" data-bs-toggle="modal">Add courses</button></span></h4>
      <div className="row">
        {learningJourney.courses?.map((course) => (
          <div className="col-md-6 col-sm-6 col-lg-4 mb-5" key={course.Course_ID}>
            <div className="card mt-2">
              <div className="card-header bg-primary text-light">
                <b>{course.Course_Name}</b>
              </div>
              <div className="row pt-3 px-3">
                <div className="col-8">
                  <p>Course ID: {course.Course_ID}</p>
                </div>
                <div className="col-4" align="right">
                  <div className=" badge bg-light text-black">
                    {course.Course_Category}
                  </div>
                </div>
              </div>

              <div className="px-3">
                {course.skills?.map((skill) => (
                  <span className="badge rounded-pill bg-dark py-1 me-2" key={skill} style={{ fontSize: "11px" }}>
                    {skill}
                  </span>
                ))}
              </div>

              <div className="row mx-1">
                <div className="col-12">
                  <p>{course.Course_Desc}</p>
                </div>
              </div>

              <div className="d-flex justify-content-end m-2">
                <button type="button" onClick={() => { setSelectedCourse(course) }} className="btn btn-outline-primary" data-bs-target="#remove-course-modal" data-bs-toggle="modal">
                  Remove <i className="bi bi-trash3-fill"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
