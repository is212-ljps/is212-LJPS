import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function LearningJourneyDetails() {
  var router = useRouter();
  var learningJourneyId = router.query["learningJourneyID"];

  const [learningJourney, setLearningJourney] = useState("");

  useEffect(() => {
    if (learningJourneyId) {
      const url = `http://localhost:8080/api/learning-journey/${learningJourneyId}`;
      const axiosFn = axios.get;
      axiosFn(url).then(function (response) {
        if (response.data.success) {
          console.log(response.data.data);
        } else {
        }
      });
    }
  });

  return (
    <div>
      <div className="row">
        <div className="col-md-6"></div>

        <div className="col-md-6"></div>
      </div>
    </div>
  );
}
