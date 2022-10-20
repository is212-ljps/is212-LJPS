import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Home() {
  const { role, setRole } = useState("User");

  console.log(role);

  return (
    <div className="row">
      <div className="col-md-6 d-flex justify-content-center">
        <Player
          src="https://assets3.lottiefiles.com/packages/lf20_9gddhmw6.json"
          className="player"
          loop
          autoplay
          style={{ height: "550px", width: "550px" }}
        />
      </div>

      <div className="col-md-6 d-flex justify-content-center flex-column px-5">
        <div className="d-flex mb-4">
          <button
            type="button"
            className="btn btn-primary btn-circle d-flex justify-content-center align-items-center"
            style={{ width: "30px", height: "30px", borderRadius: "15px" }}
          >
            <i className="bi bi-printer"></i>
          </button>

          <h4 className="ms-3">
            <span className="text-primary fw-bold"> All-In-One </span> Learning
            Journey Planning System
          </h4>
        </div>

        <p className="mb-3"> Select your Role to proceed</p>

        <form>
          <select
            className="form-select mb-4"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="User">User</option>
            <option value="Manager">Manager</option>
            <option value="Admin">Admin</option>
          </select>

          <div className="mt-5 d-flex justify-content-end">
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
