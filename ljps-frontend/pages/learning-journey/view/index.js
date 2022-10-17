import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import axios from "axios";

export default function ViewLearningJourneys() {
  const [learningJourney, setLearningJourney] = useState([]);

  useEffect(() => {
    onLearningJourneyUpdate();
  }, []);

  const onLearningJourneyUpdate = useCallback(() => {
    // currently staffID is hardcoded
    axios
      .get("http://localhost:8080/api/learning-journey/130002")
      .then((res) => {
        parseLearningJourneyObj(res.data.data);
      });
  }, []);

  console.log(learningJourney);
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

  return (
    <div>
      <div className="row p-3">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <h3 className="fw-bold"> My Learning Journeys</h3>
          {/* show number of learning journeys */}
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <Image src="/view-learning-journey.svg" height={350} width={350} />
        </div>
      </div>
      <div className="row">
        <div
          className="card mx-auto"
          style={{ width: "90%", border: "1px solid black" }}
        >
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            <p class="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
