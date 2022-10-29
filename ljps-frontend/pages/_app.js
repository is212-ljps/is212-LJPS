import "../styles/globals.css";
import Script from "next/script";
import Head from "next/head";
import "bootstrap-icons/font/bootstrap-icons.css";
//import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import NavBarModal from "../components/NavbarComponent/NavbarModal"

function MyApp({ Component, pageProps }) {
  // Get Role details here
 
  // var role = ""
  // if (typeof window !== 'undefined') {
  //   role = JSON.parse(localStorage.getItem('userDetails')).role;
  // }
  const role = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('userDetails')).role : null
  //const [role, setRole] = useState(null) 
  //useEffect(()=> setRole(JSON.parse(localStorage.getItem('userDetails')).role), [])

  console.log(role)
  // const [role, setRole] = useState()
  // if( typeof window !== 'undefined'){
  //   useEffect(() => setRole(JSON.parse(localStorage.getItem('userDetails').role)),[]);
  // }
  

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossOrigin="anonymous"/>
      </Head>

      <NavBarModal></NavBarModal>



      {/* <div>
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
      </div> */}


      <Component {...pageProps} />

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8"
        crossOrigin="anonymous"
      ></Script>
    </>
  );
}

export default MyApp;
