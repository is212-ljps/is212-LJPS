import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";

export default function LearningJourneyDetails() {
  var router = useRouter();
  var learningJourneyId = router.query["learningJourneyID"];

  const [learningJourney, setLearningJourney] = useState({});
  const [ courses , setCourses ] = useState([])

  useEffect(() => {
    if (learningJourneyId) {
      const url = `http://localhost:8080/api/learning-journey/${learningJourneyId}`;
      const axiosFn = axios.get;
      axiosFn(url).then(function (response) {
        if (response.data.success) {
          setLearningJourney(response.data.data);
          setCourses(response.data.data.courses)
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

      <div className="row p-4">
        <div className="container px-5">
          <h4 className="fw-bold"> Courses </h4>
        </div>
      </div>
    </div>
  );
}
