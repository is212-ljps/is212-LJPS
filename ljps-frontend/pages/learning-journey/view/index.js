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
    axios.get("http://localhost:8080/api/learning-journey/130002").then((res) => {
      setLearningJourney(res.data.data);
    });
  }, []);


  console.log(learningJourney)



  return (
    <div>
      <div className="row p-3">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <h3 className="fw-bold"> My Learning Journeys</h3>
        </div>

        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <Image src="/view-learning-journey.svg" height={350} width={350} />
        </div>
      </div>
    </div>
  );
}
