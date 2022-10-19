import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import axios from "axios";
import Router, { useRouter } from "next/router";

export default function ViewConfirmation() {
//   const [learningJourney, setLearningJourney] = useState([]);

//   useEffect(() => {
//     onLearningJourneyUpdate();
//   }, []);

//   const onLearningJourneyUpdate = useCallback(() => {
//     // currently staffID is hardcoded
//     axios
//       .get("http://localhost:8080/api/learning-journey/staff/130002")
//       .then((res) => {
//         parseLearningJourneyObj(res.data.data);
//       });
//   }, []);

//   const parseLearningJourneyObj = (data) => {
//     const learningJourney = {};
//     data.forEach(
//       ({ Learning_Journey_ID, Learning_Journey_Name, Skill_Name }) => {
//         if (learningJourney[Learning_Journey_ID]) {
//           learningJourney[Learning_Journey_ID].Skills.push(Skill_Name);
//         } else {
//           learningJourney[Learning_Journey_ID] = {
//             Learning_Journey_ID,
//             Learning_Journey_Name,
//             Skills: [Skill_Name],
//           };
//         }
//       }
//     );

//     setLearningJourney(learningJourney);
//   };

  const checkCreateLearningJourney = () => {
    Router.push({
        pathname: "/learning-journey"
    })
  }

  const checkViewLearningJourney = () => {
    Router.push({
        pathname: "/learning-journey/view"
    })
  }


  return (
    <div>

    <div>
        <nav className="navbar navbar-light bg-light p-3">
            <span className="navbar-brand mb-0 h1"> All-in-one LJPS </span>
        </nav>

        <div className="container">
            <div className="row p-3" style={{"marginTop":100}}>
                <div className="col-md d-flex justify-content-center align-items-center ">
                    <Image src="/ConfirmationLogo.jpg" height={350} width={350} />
                </div>
            </div>
        </div>

        <br></br>

        <div className="container">
            <div className="row p-3 d-flex justify-content-center align-items-center text-center">
                <h2>Your learning Journey Has been Successfully Created!</h2>
            </div>

        </div>

        <div className="container">
            <div className="row p-3 ">
                {/* Create Learning Journey Button */}
                <div className="col-sm-6 d-flex justify-content-end align-items-center">
                    <button type="button" className="btn btn-primary btn-lg" onClick={checkCreateLearningJourney}>
                        {" "} Create Learning Journey {" "}
                    </button>
                </div>

                {/* View Learning Journey Button */}
                <div className="col-sm-6 d-flex justify-content-start align-items-center">
                    <button type="button" className="btn btn-primary btn-lg" onClick={checkViewLearningJourney}>
                        {" "} View Learning Journey {" "}
                    </button>
                </div>


            </div>
        </div>


    </div>
  </div>
  )
}
