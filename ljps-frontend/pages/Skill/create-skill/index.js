import axios from "axios";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { validateLength } from "../../../util/validation/index";

export default function CreateSkill() {
  const [skillTitle, setSkillTitle] = useState("");
  const [skillDescription, setSkillDescription] = useState("");
  const [openToast, setOpenToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const modal = useRef();
  const toast = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    if (
      validateLength(skillTitle, 5, 20) &&
      validateLength(skillDescription, 0, 300)
    ) {
      // pass validation

      var successMessage = new bootstrap.Toast(toast.current)
      successMessage.show()


      axios.post("http://localhost:8080/api/updateskill", {
        skillTitle: skillTitle,
        skillDescription: skillDescription,
      })
      
    } else {
      // fail validation
      setErrorMessage(true);
    }
  }

  useEffect(() => {
    if (modal.current) {
      modal.current.addEventListener("hidden.bs.modal", () => {
        setErrorMessage(false);
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
        tabindex="-1"
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
                    <label for="skillTitle" className="col-form-label">
                      Skill Title
                    </label>

                    <input
                      type="text"
                      id="skillTitle"
                      className="form-control"
                      onChange={(event) => setSkillTitle(event.target.value)}
                    />
                    {errorMessage && (
                      <p className="text-danger">
                        Skill Title must be between 5-20 characters
                      </p>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12">
                    <label for="skillDescription" className="col-form-label">
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
        className="toast position-fixed bottom-0 end-0 p-2 m-4 text-white bg-success"
        ref={toast}
        role="alert"
        aria-live="assertive"
        data-bs-autohide="true"
        aria-atomic="true"
      >
        <div className="d-flex ">
          <div class="toast-body">New Skill : <span className="fw-bold">{`${skillTitle}`}</span> created</div>
        </div>
      </div>
      </div>


    </div>
  );
}
