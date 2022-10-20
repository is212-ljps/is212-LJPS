import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import axios from "axios";
import Router, { useRouter } from "next/router";

export default function ViewConfirmation() {

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
                <h2>Your Learning Journey has been successfully created!</h2>
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
