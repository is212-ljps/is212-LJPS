import axios from "axios";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { validateLength } from "../../util/validation/index";

// skillTitle will be passed as a prop to delete skill
export default function DeleteSkillButton({ skillName }) {
  const modal = useRef();
  const toast = useRef();

  const [errorMessage, setErrorMessage] = useState("");

  let testData = "Software Engineering";
  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("")

    var myToast = new bootstrap.Toast(toast.current);
    var myModal = new bootstrap.Modal(modal.current);


    axios
      .post("http://localhost:8080/api/deleteskill", {
        // testData will be replaced with skillName that is passed from props
        skillName: testData,
      })
      .then(function (response) {
        console.log(response.data)
        if (response.data.success) {
          myToast.show();
          myModal.hide();

        }
        else{
            setErrorMessage(response.data.message)
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

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
            data-bs-target="#deleteSkillModal"
          >
            Delete Skill
          </button>
        </div>
      </div>

      

      <div
        className="modal fade"
        id="deleteSkillModal"
        tabIndex="-1"
        aria-labelledby="deleteSkillModalLabel"
        ref={modal}
      >
        <div className="modal-dialog">
          <div className="modal-content">
          <div className="modal-header text-center">
            <h5 className="modal-title text-center" id="exampleModalLabel">
              Delete {`${testData}`}
            </h5>
          </div>
            <div className="modal-body text-center p-4">
              Are you sure you want to delete this skill ?
            </div>

            {errorMessage.length>0 && <p className="text-danger text-center">{errorMessage}</p>}

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
              A skill has been successfully deleted
            </div>
          </div>
        </div>
    </div>
  );
}
