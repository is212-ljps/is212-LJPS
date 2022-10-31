import React, { useEffect, useState, useCallback, useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/router";
import axios from "axios";
import DeleteLearningJourneyModal from "./DeleteModal";
import { store } from "../../../store";

export default function ViewLearningJourneys() {
  const [learningJourney, setLearningJourney] = useState([]);

  const [learningJourneyDetails, setLearningJourneyDetails] = useState({})
  const router = useRouter()

  useEffect(() => {
    onLearningJourneyUpdate();
  }, []);

  const onLearningJourneyUpdate = useCallback(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND}/api/learning-journey/staff/` + store.staffId)
      .then((res) => {
        parseLearningJourneyObj(res.data.data);
      });
  }, [store.staffId]);

  const parseLearningJourneyObj = (data) => {
    const learningJourney = {};
    data.forEach(
      ({ Learning_Journey_ID, Learning_Journey_Name, Skill_Name }) => {
        if (learningJourney[Learning_Journey_ID]) {
          learningJourney[Learning_Journey_ID].Skills.push(Skill_Name);
        } else {
          learningJourney[Learning_Journey_ID] = {
            Learning_Journey_ID,
            Learning_Journey_Name,
            Skills: [Skill_Name],
          };
        }
      }
    );

    setLearningJourney(learningJourney);
  };

  const handleDelete = (learningJourneyID, learningJourneyName) => {
    setLearningJourneyDetails({
      learningJourneyId: learningJourneyID,
      learningJourneyName: learningJourneyName,
    })
  }

  return (
    <div>
      <div className="row p-3">
        <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
          <h3 className="fw-bold"> My Learning Journeys</h3>
          <h4 className="text-primary">
            {" "}
            {Object.keys(learningJourney).length} Learning Journey(s){" "}
          </h4>
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <Player
            src="https://assets6.lottiefiles.com/packages/lf20_rsldksfy.json"
            className="player"
            loop
            autoplay
            style={{ height: "370px", width: "370px" }}
          />
        </div>
      </div>
      {Object.keys(learningJourney).map((learningJourneyID, i) => (
        <div className="row mb-4" key={i}>
          <DeleteLearningJourneyModal
            learningJourneyDetails={learningJourneyDetails}
            onLearningJourneyUpdate={onLearningJourneyUpdate}
          />

          <div
            className="card border shadow-sm mx-auto"
            style={{ width: "90%" }}
          >
            <div className="card-body">
              <div className="row">
                <h5 className="card-title">
                  {learningJourney[learningJourneyID].Learning_Journey_Name}
                </h5>
              </div>
              <div className="row">
                <div className="col-md-8">
                  {learningJourney[learningJourneyID].Skills.map((skill) => (
                    <span className="badge bg-dark mx-1" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="col-md-4 d-flex justify-content-end mt-4">
                  <button
                    type="button"
                    className="btn btn-primary mx-1"
                    onClick={() =>
                      router.push({
                        pathname: "/learning-journey/view/details",
                        query: { learningJourneyID },
                      })
                    }
                  >
                    View <i className="bi bi-eye-fill mx-1"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#delete-modal"
                    onClick={() =>
                      handleDelete(
                        learningJourneyID,
                        learningJourney[learningJourneyID].Learning_Journey_Name
                      )
                    }
                  >
                    Delete <i className="bi bi-trash3 mx-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

 
    </div>
  );
}
