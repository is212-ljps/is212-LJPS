import React from "react";
import { store } from "../../store";
import Link from 'next/link';

export default function NavBarModal() {
  const role = store.role

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white m-3">
      <div className="container-fluid">
        <span className="navbar-brand">
          <Link href="/learning-journey"> All-in-One LJPS </Link>
        </span>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse flex-row-reverse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <span className="nav-link active">
                <Link aria-current="page" href="/learning-journey">Create Learning Journey</Link>
              </span>
            </li>
            <li className="nav-item">
              <span className="nav-link">
                <Link href="/learning-journey/view">View my Learning Journey</Link>
              </span>
            </li>
            {role != "User" &&
              <>
                < li className="nav-item">
                  <span className="nav-link">
                    <Link className="nav-link" href="/roles">Roles</Link>
                  </span>
                </li>
                <li className="nav-item">
                  <span className="nav-link">
                    <Link className="nav-link" href="/skills">Skills</Link>
                  </span>
                </li>
              </>
            }
            <li className="nav-item">
              <span className="nav-link">
                <Link href="/">Logout</Link>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}