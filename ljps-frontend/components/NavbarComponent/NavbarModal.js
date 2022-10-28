import React, { useCallback, useRef, useEffect, useState } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";

export default function NavBarModal(){
    const role = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('userDetails')).role : null

    return (
        <div>
        {role == "User" && 
        <nav className="navbar navbar-expand-lg navbar-light bg-white m-3">
          <a className="navbar-brand" href="/learning-journey"> <h4>All-in-One LJPS</h4> </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNavDropdown">
            <ul className="navbar-nav">              
              <li className="nav-item active">
                <a className="nav-link" href="/learning-journey"> <strong>Create Learning Journey</strong></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/learning-journey/view"> <strong> View My Learning Journey </strong></a>
              </li>
              <li className="nav-item">
                <a className="nav-link"> {role}</a>
              </li>
            </ul>
          </div>
        </nav>
        }

        {role == "Manager" &&
        <nav className="navbar navbar-expand-lg navbar-light bg-white m-3">
          <a className="navbar-brand" href="/learning-journey"> <h4>All-in-One LJPS</h4> </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/roles"> <strong>Roles</strong></a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/skill"> <strong>Skills</strong></a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/learning-journey"> <strong>Create Learning Journey</strong></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/learning-journey/view"> <strong> View My Learning Journey </strong></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">{role}</a>
              </li>
            </ul>
          </div>
        </nav>
        }

        {role == "Admin" &&
        <nav className="navbar navbar-expand-lg navbar-light bg-white m-3">
          <a className="navbar-brand" href="/learning-journey"> <h4>All-in-One LJPS</h4> </a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex flex-row-reverse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/roles"> <strong>Roles</strong></a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/skill"> <strong>Skills</strong></a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/learning-journey"> <strong>Create Learning Journey</strong></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/learning-journey/view"> <strong> View My Learning Journey </strong></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">{role}</a>
              </li>
            </ul>
          </div>
        </nav>
        }
      </div>
    )

}