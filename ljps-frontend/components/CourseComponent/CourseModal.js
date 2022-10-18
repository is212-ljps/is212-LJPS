import React, { useCallback, useRef, useEffect, useState } from "react";
import axios from "axios";

export default function CourseModal({ checkSubmit, skillId, roleId, skillName, roleName, courses }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState('');
  const modal = useRef();
  const nameInput = useRef();

  const handleSubmit = () => {
    if (name) {
      const learningJourneyUrl = `http://localhost:8080/api/learning-journey`;
      axios.post(learningJourneyUrl, {
        learningJourneyName: name,
        staffId: 130001,
        jobRoleId: roleId,
        skillId: skillId,
        courses: courses
      }).then(res => {
        if (res.data.success) {
          console.log("SUCCESS")
          // Add router.push here
        } else {
          console.log("FAIL")
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  }

  
  return (
    <div
      className="modal fade"
      ref={modal}
      id="role-modal"
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
                    Skill Name : {skillName}
                  </label>
                  <br />
                  <label htmlFor="learningJourneyName" className="col-form-label">
                    Learning Journey Name
                  </label>

                  <input
                    type="text"
                    id="learningJourneyName"
                    className="form-control"
                    onChange={({ target }) => setName(target?.value)}
                  />
                </div>
              </div>
            </div>
          </form>
      
          {checkSubmit ? <div className="modal-footer">
            <button type="button" onClick={()=>handleSubmit(nameInput)} className="btn btn-primary">
              Confirm
            </button>
          </div>: ''}
        </div>
      </div>
    </div>
  );
}
