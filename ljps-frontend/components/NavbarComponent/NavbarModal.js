import React, { useCallback, useRef, useEffect, useState } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import { store } from "../../store";

export default function NavBarModal(){

    const role = store.role

    console.log(role)
    return (
        <div>

        {role == "User" && 
        <nav className="navbar navbar-expand-lg navbar-light bg-white m-3">
          <div className="container-fluid">
            <a className="navbar-brand" href="/learning-journey"> <h4>All-in-One LJPS</h4> </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse flex-row-reverse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/learning-journey">Create Learning Journey</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/learning-journey/view">View my Learning Journey</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        }


        {role == "Manager" && 
        <nav className="navbar navbar-expand-lg navbar-light bg-white m-3">
          <div className="container-fluid">
            <a className="navbar-brand" href="/learning-journey"><h4>All-in-One LJPS</h4></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse flex-row-reverse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/learning-journey">Create Learning Journey</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/learning-journey/view">View My Learning Journey</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/roles">Roles</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Skill">Skills</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        }

        {role == "Admin" && 
        <nav className="navbar navbar-expand-lg navbar-light bg-white m-3">
          <div className="container-fluid">
            <a className="navbar-brand" href="/learning-journey"><h4>All-in-One LJPS</h4></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse flex-row-reverse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/learning-journey">Create Learning Journey</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/learning-journey/view">View My Learning Journey</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/roles">Roles</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Skill">Skills</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        }


      
      </div>
      
    )

}