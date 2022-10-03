import axios from "axios";
import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";

// roleName will be passed as a prop to delete role
export default function DeleteRoleButton({ roleID }) {
  const modal = useRef();
  const toast = useRef();
  const closeButton = useRef();

  const [errorMessage, setErrorMessage] = useState("");

  // remove later
  let testData = 1;
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    var myToast = new bootstrap.Toast(toast.current);
    var myModal = bootstrap.Modal.getInstance(modal.current)

    axios
      .delete(`http://localhost:8080/api/roles/${testData}`)
      .then(function (response) {
        if (response.data.success) {
          setErrorMessage("");
          myModal.hide()
          myToast.show()
        } else {
          setErrorMessage(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  })


  useEffect(() => {
    if (modal.current) {
      modal.current.addEventListener("hidden.bs.modal", () => {
        setErrorMessage("");
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
            data-bs-target="#deleteRoleModal"
          >
            Delete Role
          </button>
        </div>
      </div>

      <div
        className="modal"
        id="deleteRoleModal"
        tabIndex="-1"
        aria-labelledby="deleteRoleModalLabel"
        data-backdrop="static"
        ref={modal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title w-100 text-center"
                id="exampleModalLabel"
              >
                Delete {`${testData}`}
              </h5>
            </div>
            <div className="modal-body text-center p-4">
              Are you sure you want to delete this role ?
            </div>

            {errorMessage.length > 0 && (
              <p className="text-danger text-center">{errorMessage}</p>
            )}

            <div className="modal-footer d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
              >
                Yes
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                ref={closeButton}
              >
                No
              </button>
            </div>
          </div>
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
          <div className="toast-body">
          The role has been successfully deleted
          </div>
        </div>
      </div>
    </div>
  );
}
