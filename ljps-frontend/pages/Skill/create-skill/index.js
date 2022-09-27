import axios from "axios";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { validateLength } from "../../../util/validation/index";

export default function CreateSkill() {
  const [skillTitle, setSkillTitle] = useState("");
  const [skillDescription, setSkillDescription] = useState("");
  const [lengthValidationMessage, setlengthValidationMessage] = useState(false);
  const [successNotification, setSuccessNotification] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const modal = useRef();
  const toast = useRef();

  function handleSubmit(e) {

    setToastMessage('')
    setSuccessNotification(false)
    e.preventDefault();


    if (
      validateLength(skillTitle, 5, 20) &&
      validateLength(skillDescription, 0, 300)
    ) {
      // pass length validation
      var myToast = new bootstrap.Toast(toast.current);
      axios
        .post("http://localhost:8080/api/updateskill", {
          skillTitle: skillTitle,
          skillDescription: skillDescription,
        })
        .then(function (response) {
          if (response.data.success) {
            console.log(`trying to set success toast message: ${response.data.message}`)
            setToastMessage(response.data.message);
            setSuccessNotification(true);
            myToast.show();
            return;
          } 
          else {
            setToastMessage(response.data.message);
            myToast.show();
            return;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // fail validation
      setlengthValidationMessage(true);
    }
  }

  useEffect(() => {
    if (modal.current) {
      modal.current.addEventListener("hidden.bs.modal", () => {
        setlengthValidationMessage(false);
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
                    <label htmlFor="skillTitle" className="col-form-label">
                      Skill Title
                    </label>

                    <input
                      type="text"
                      id="skillTitle"
                      className="form-control"
                      onChange={(event) => setSkillTitle(event.target.value)}
                    />
                    {lengthValidationMessage && (
                      <p className="text-danger">
                        Skill Title must be between 5-20 characters
                      </p>
                    )}
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

        {/* // dynamic rendering not working  */}

        <div
          className={successNotification ? "toast position-fixed bottom-0 end-0 p-2 m-4 text-white bg-primary" : "toast position-fixed bottom-0 end-0 p-2 m-4 text-white bg-danger"}
          ref={toast}
          role="alert"
          aria-live="assertive"
          data-bs-autohide="true"
          aria-atomic="true"
        >
          <div className="d-flex ">
          <div className="toast-body">{console.log(successNotification)}</div>

            <div className="toast-body">{toastMessage}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
