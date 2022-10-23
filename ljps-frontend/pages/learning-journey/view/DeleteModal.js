import axios from "axios";
import React from "react";
import { useState, useRef, useEffect, useCallback } from "react";

export default function DeleteLearningJourneyModal({ learningJourneyName }) {
  const modal = useRef();
  const toast = useRef();
  const closeButton = useRef();
  const handleSubmit = useCallback((e) => {
    var myToast = new bootstrap.Toast(toast.current);
    var myModal = bootstrap.Modal.getInstance(modal.current);
    // axios
    //   .delete(`http://localhost:8080/api/skills/${skillId}`)
    //   .then(function (response) {
    //     if (response.data.success) {
    //       setErrorMessage("");
    //       myModal.hide();
    //       myToast.show();
    //       onSkillsUpdate();
    //     } else {
    //       setErrorMessage(response.data.message);
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  });
  return (
    <div>
      <div className="modal" tabindex="-1" id="delete-modal" ref={modal}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center w-100 ">
                Delete {learningJourneyName}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-center">
              <p>Are you sure you want to delete this Learning Journey?</p>
            </div>
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
            {learningJourneyName} has been successfully deleted !
          </div>
        </div>
      </div>
    </div>
  );
}
