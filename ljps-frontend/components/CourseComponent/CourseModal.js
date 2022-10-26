import React, { useCallback, useRef, useEffect, useState } from "react";
import axios from "axios";
import Router, { useRouter } from "next/router";

export default function CourseModal({ checkSubmit, roleId, skillDetails, roleName, courses }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState('');
  const modal = useRef();
  const nameInput = useRef();


  const handleSubmit = () => {

    var myModal = bootstrap.Modal.getInstance(modal.current)


    if (name) {
      const learningJourneyUrl = `http://localhost:8080/api/learning-journey`;
      axios.post(learningJourneyUrl, {
        learningJourneyName: name,
        staffId: 130001,
        jobRoleId: roleId,
        skills: skillDetails,
        courses: courses
      }).then(res => {
        if (res.data.success) {
          myModal.hide()
          Router.push({
            pathname: "/learning-journey/view-skills/view-courses/confirmation"
          })
          
        } else {
          setErrorMsg("Error has occured");
        }
      }).catch(function (error) {
        setErrorMsg("Error has occured");
        console.log(error);
      });
    }
  }

  useEffect(() => {
    if (modal.current) {
      modal.current.addEventListener("hidden.bs.modal", () => {
        setName("")
        setErrorMsg("")
      });
    }
  }, [modal]);

  
  return (
    <div
      className="modal fade"
      ref={modal}
      id="role-modal"
      data-backdrop="static"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="createRoleModalLabel">
              {checkSubmit ? 'Confirm Learning Journey' : "You have not selected a course yet. Please select at least a single course."}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form>
            <div className="modal-body">
              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="roleName" className="col-form-label">
                    Role Name : {roleName}
                  </label>
                  <br />
                  <label htmlFor="skillName" className="col-form-label">
                    Skills Selected: 
                  </label>
                  <ul>
                    {skillDetails.map((skill)=> (
                      <li> {skill.Skill_Name}</li>
                    ))}
                    </ul>

                  <br />
                  <label htmlFor="learningJourneyName" className="col-form-label">
                    Learning Journey Name
                  </label>

                  <input
                    type="text"
                    id="learningJourneyName"
                    className="form-control"
                    value={name}
                    onChange={({ target }) => setName(target?.value)}
                  />
                  <br />
                  {errorMsg ? <label htmlFor="learningJourneyName" className="col-form-label">
                    {errorMsg} </label>: ''}
                </div>
              </div>
            </div>
          </form>
      
          <div className="modal-footer">
            <button type="button" onClick={()=>handleSubmit(nameInput)} className={checkSubmit ? "btn btn-primary" : "btn btn-primary disabled"} >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
