import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";

export default function LearningJourneyDetails() {
  var router = useRouter();
  var learningJourneyId = router.query["learningJourneyID"];

  const [learningJourney, setLearningJourney] = useState({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (learningJourneyId) {
      const url = `http://localhost:8080/api/learning-journey/${learningJourneyId}`;
      const axiosFn = axios.get;
      axiosFn(url).then(function (response) {
        if (response.data.success) {
          setLearningJourney(response.data.data);
          setCourses(response.data.data.courses);
        } else {
        }
      });
    }
  }, [learningJourneyId]);

  return (
    <div>
      <div className="row py-4">
        <div className="col-md-5 d-flex flex-column justify-content-center align-items-center">
          <h3 className="text-primary">
            {learningJourney.Learning_Journey_Name}
          </h3>
          <h4 className="fw-bold">{learningJourney.courses?.length} courses</h4>
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
      {console.log(courses)}

      <div className="container">
        <h4 className="fw-bold"> Courses </h4>
        <div className="row">
          {courses.map((course) => (
            <div className="col-md-4 col-sm-6 mb-5">
              <div className="card mt-2">
                <div className="card-header bg-primary text-light">
                  {" "}
                  <b>{course.Course_Name}</b>{" "}
                </div>
                <div className="card-body"></div>
                <div className="row">
                  <div className="col-5">
                    {/* <p className="mx-3">{skillDetails.skillName}</p> */}
                  </div>
                  <div className="col-7 px-4" align="right">
                    <div className=" badge bg-light text-black">
                      {" "}
                      {course.Course_Category}{" "}
                    </div>
                  </div>
                </div>
                <div className="row pe-3">
                  <div className="col-9">
                    <div className="col-9 mx-3">
                      {" "}
                      <b>Course ID: {course.Course_ID}</b>
                    </div>
                  </div>

     
                </div>
                <div className="row mx-1">
                  <div className="col-10">
                    {" "}
                    <p>{course.Course_Desc}</p>{" "}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
