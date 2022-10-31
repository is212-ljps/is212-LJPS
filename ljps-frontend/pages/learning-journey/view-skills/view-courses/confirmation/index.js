import React from "react";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { Player } from "@lottiefiles/react-lottie-player";

export default function ViewConfirmation() {
  const checkCreateLearningJourney = () => {
    Router.push({
      pathname: "/learning-journey",
    });
  };

  const checkViewLearningJourney = () => {
    Router.push({
      pathname: "/learning-journey/view",
    });
  };

  return (
    <div className="pb-5">
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md d-flex justify-content-center align-items-center ">
              <Player
                src="https://assets10.lottiefiles.com/packages/lf20_lrlxrdvc.json"
                style={{ height: '350px', width: '350px' }}
                autoplay
                loop
                className="player"
              />
            </div>
          </div>
        </div>


        <div className="container">
          <div className="row my-3 d-flex justify-content-center align-items-center text-center">
            <h3>Your Learning Journey has been successfully created!</h3>
          </div>
        </div>

        <div className="container">
          <div className="row ">
            {/* Create Learning Journey Button */}
            <div className="col-sm-6 d-flex justify-content-center align-items-center mt-4">
              <button
                type="button"
                className="btn btn-primary btn-lg w-75"
                onClick={checkCreateLearningJourney}
              >
                {" "}
                Create Learning Journey{" "}
              </button>
            </div>

            {/* View Learning Journey Button */}
            <div className="col-sm-6 d-flex justify-content-center align-items-center mt-4">
              <button
                type="button"
                className="btn btn-outline-primary btn-lg w-75"
                onClick={checkViewLearningJourney}
              >
                {" "}
                View Learning Journey{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
