import React from "react";
import Image from "next/image";
import axios from "axios";


export default function ViewLearningJourneys() {
  return (
    <div>
      <div className="row">
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <h3 className="fw-bold"> My Learning Journeys</h3>
        </div>

        <div className="col-md-6">
          <Image src="/view-learning-journey.svg" height={350} width={350} />
        </div>
      </div>
    </div>
  );
}
