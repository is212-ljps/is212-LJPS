import axios from "axios";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { validateLength } from "../../util/validation/index";

export default function CreateRoleButton() {
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const modal = useRef();
  const toast = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("")

    if (
      validateLength(roleName, 5, 20) &&
      validateLength(roleDescription, 0, 300)
    ) {
      // pass length validation
      var myToast = new bootstrap.Toast(toast.current);
      axios
        .post("http://localhost:8080/api/createrole", {
          roleName: roleName,
          roleDescription: roleDescription,
        })
        .then(function (response) {
          if (response.data.success) {
            e.target.reset()
            myToast.show();  
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
      setErrorMessage(" Role Name must be between 5-20 characters");
      setShowError(true);
    }
  }

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
            data-bs-target="#createRoleModal"
          >
            Create Role <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        ref={modal}
        id="createRoleModal"
        tabIndex="-1"
        aria-labelledby="createRoleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createRoleModalLabel">
                Create Role
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
                    <label htmlFor="roleName" className="col-form-label">
                        Role Name
                    </label>

                    <input
                      type="text"
                      id="roleName"
                      className="form-control"
                      onChange={(event) => setRoleName(event.target.value)}
                    />
                    {showError && <p className="text-danger">{errorMessage}</p>}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-12">
                    <label
                      htmlFor="roleDescription"
                      className="col-form-label"
                    >
                      Role Description
                    </label>

                    <textarea
                      id="roleDescription"
                      className="form-control"
                      onChange={(event) =>
                        setRoleDescription(event.target.value)
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
              A New Role Has Been Successfully Created !
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
