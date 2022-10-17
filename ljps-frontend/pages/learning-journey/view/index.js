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
        <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
          <h3 className="fw-bold"> My Learning Journeys</h3> 
          {console.log(learningJourney?.length)}
          <h4 className="text-primary"> {Object.keys(learningJourney).length} Learning Journey(s) </h4>
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <Image src="/view-learning-journey.svg" height={350} width={350} />
        </div>
      </div>
      {Object.keys(learningJourney).map(( learningJourneyID, i) => ( 

<div className = "row">
<div className="card mx-auto" style={{width:"90%", border:"1px solid black"}}>
        <div className ="card-body">
            <div className = 'row'>
            <h5 className="card-title">{learningJourney[learningJourneyID].Learning_Journey_Name}</h5>
            </div>
            <div className = 'row'>
                <div className = 'col-md-8'>
                {learningJourney[learningJourneyID].Skills.map(( skill ) => (
                    <span className ="badge bg-primary mx-1">{skill}</span> 
                    ))}

                </div>
                <div className = 'col-md-4 d-flex justify-content-end mt-4'>
                    <button type="button" class="btn btn-light mx-1">View <i class="bi bi-eye-fill mx-1"></i></button>
                    <button type="button" class="btn btn-secondary">Delete <i class="bi bi-trash3 mx-1"></i></button>
                </div>

            </div>
        </div>
      </div>
    </div>    
  )}
