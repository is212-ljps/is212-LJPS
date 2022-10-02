import axios from "axios";
import React, { useCallback } from "react";
import { useState, useRef, useEffect } from "react";
import { validateLength } from "../../util/validation/index";

export default function CreateSkillButton({onCreate, ...props}) {
  const [skillName, setSkillName] = useState("");
  const [skillDescription, setSkillDescription] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const modal = useRef();
  const toast = useRef();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (
      validateLength(skillName, 5, 20) &&
      validateLength(skillDescription, 0, 300)
    ) {
      // pass length validation
      var myToast = new bootstrap.Toast(toast.current);
      axios
        .post("http://localhost:8080/api/createskill", {
          skillName: skillName,
          skillDescription: skillDescription,
        })
        .then(function (response) {
          if (response.data.success) {
            setErrorMessage("");

            e.target.reset();
            myToast.show();
            onSkillsUpdate()
          } else {
            setShowError(true);
            setErrorMessage(response.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // fail validation
      setErrorMessage(" Skill Name must be between 5-20 characters");
      setShowError(true);
    }
  });

  useEffect(() => {
    if (modal.current) {
      modal.current.addEventListener("hidden.bs.modal", () => {
        setShowError(false);
      });
    }
  }, [modal]);

  return (
    <div>
      <div className="row">
        <div className="col-12 d-flex flex-row-reverse">
          <button
            type="button"
            className="btn btn-light"
            data-bs-toggle="modal"
            data-bs-target="#createSkillModal"
          >
            Create Skill <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        ref={modal}
        id="createSkillModal"
        tabIndex="-1"
        aria-labelledby="createSkillModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createSkillModalLabel">
                Create Skill
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-12">
                    <label htmlFor="skillName" className="col-form-label">
                      Skill Name
                    </label>

                    <input
                      type="text"
                      id="skillName"
                      className="form-control"
                      onChange={(event) => setSkillName(event.target.value)}
                    />
                    {showError && <p className="text-danger">{errorMessage}</p>}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12">
                    <label
                      htmlFor="skillDescription"
                      className="col-form-label"
                    >
                      Skill Description
                    </label>

                    <textarea
                      id="skillDescription"
                      className="form-control"
                      onChange={(event) =>
                        setSkillDescription(event.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>

        <div
          className={`toast position-fixed bottom-0 end-0 p-2 m-4 text-white bg-success`}
          ref={toast}
          role="alert"
          aria-live="assertive"
          data-bs-autohide="true"
          aria-atomic="true"
        >
          <div className="d-flex ">
            <div className="toast-body">
              A New Skill Has Been Successfully Created !
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
