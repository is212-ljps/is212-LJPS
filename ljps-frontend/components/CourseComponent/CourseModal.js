import React, { useCallback, useRef, useEffect, useState } from "react";
import { validateLength } from "../../util/validation";
import axios from "axios";

export default function CourseModal({ handleSubmit, checkSubmit, ...props }) {
  // const [nameErrorMsg, setNameErrorMsg] = useState("");
  // const [descErrorMsg, setDescErrorMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  // const { roleName, roleDescription, roleID, roleDepartment } = selectedRole;
  const modal = useRef();
  const toast = useRef();
  // const nameInput = useRef();
  // const descriptionInput = useRef();
  // const departmentInput = useRef();

  // useEffect(() => {
  //   if (
  //     !nameInput.current ||
  //     !descriptionInput.current ||
  //     !departmentInput.current
  //   )
  //     return;

  //   nameInput.current.value = roleName;
  //   descriptionInput.current.value = roleDescription;
  //   departmentInput.current.value = roleDepartment
  //     ? roleDepartment
  //     : "Marketing";
  // }, [
  //   roleName,
  //   roleDescription,
  //   roleID,
  //   nameInput,
  //   descriptionInput,
  //   departmentInput,
  // ]);

  useEffect(() => {
    console.log(checkSubmit)
    if (checkSubmit) {
      setErrorMsg("You have not selected a course yet. Please select at least a single course.");
    }
  }, [checkSubmit]);

  // const handleSubmit = useCallback((e) => {
  //   e.preventDefault();

  //   if (
  //     validateLength(nameInput.current.value, 5, 20) &&
  //     validateLength(descriptionInput.current.value, 0, 300)
  //   ) {
  //     // pass length validation
  //     var myToast = new bootstrap.Toast(toast.current);
  //     const url = roleID
  //       ? "http://localhost:8080/api/roles/" + roleID
  //       : "http://localhost:8080/api/roles";
  //     const axiosFn = roleID ? axios.put : axios.post;
  //     axiosFn(url, {
  //       roleName: nameInput.current.value,
  //       roleDescription: descriptionInput.current.value,
  //       jobDepartment: departmentInput.current.value,
  //     })
  //       .then(function (response) {
  //         if (response.data.success) {
  //           setNameErrorMsg("");
  //           setDescErrorMsg("");

  //           e.target.reset();
  //           myToast.show();
  //           onRolesUpdate();
  //         } else {
  //           setErrorMsg(response.data.message);
  //         }
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   } else {
  //     // fail validation
  //     if (!validateLength(nameInput.current.value, 5, 20)) {
  //       setNameErrorMsg("Role Name must be between 5-20 characters");
  //     }
  //     if (!validateLength(descriptionInput.current.value, 0, 300)) {
  //       setDescErrorMsg("Role Description cannot be more than 300 characters");
  //     }
  //   }
  // });
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
      
          {checkSubmit ? <div className="modal-footer">
            <button type="button" onClick={handleSubmit} className="btn btn-primary">
              Confirm
            </button>
          </div>: ''}
        </div>
      </div>
    </div>
  );
}
