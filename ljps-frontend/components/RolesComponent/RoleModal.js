import React, { useCallback, useRef, useEffect, useState } from "react";
import { validateLength } from "../../util/validation";
import axios from "axios";

export default function RoleModal({ selectedRole, onRolesUpdate, ...props }) {
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [descErrorMsg, setDescErrorMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { roleName, roleDescription, roleID, roleDepartment } = selectedRole;
  const [skills, setSkills] = useState([])
  const modal = useRef();
  const toast = useRef();
  const nameInput = useRef();
  const descriptionInput = useRef();
  const departmentInput = useRef();
  const [skillSearch, setSkillSearch] = useState("")

  useEffect(() => {
    if (
      !nameInput.current ||
      !descriptionInput.current ||
      !departmentInput.current
    )
      return;

    nameInput.current.value = roleName;
    descriptionInput.current.value = roleDescription;
    departmentInput.current.value = roleDepartment ? roleDepartment : "Marketing";
  }, [
    roleName,
    roleDescription,
    roleID,
    nameInput,
    descriptionInput,
    departmentInput,
  ]);

  useEffect(() => {
    if (modal.current) {
      modal.current.addEventListener("hidden.bs.modal", function (event) {
        nameInput.current.value = "";
        descriptionInput.current.value = "";
        departmentInput.current.value = roleDepartment ? roleDepartment : "Marketing";
        setNameErrorMsg("");
        setDescErrorMsg("");
      });
    }
  }, [modal.current]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/skills').then((res) => {
      setSkills(res.data.data)
      console.log(res.data.data)
    })
  }, [])

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (
      validateLength(nameInput.current.value, 5, 20) &&
      validateLength(descriptionInput.current.value, 0, 300)
    ) {
      // pass length validation
      var myToast = new bootstrap.Toast(toast.current);
      const url = roleID
        ? "http://localhost:8080/api/roles/" + roleID
        : "http://localhost:8080/api/roles";
      const axiosFn = roleID ? axios.put : axios.post;
      axiosFn(url, {
        roleName: nameInput.current.value,
        roleDescription: descriptionInput.current.value,
        jobDepartment: departmentInput.current.value,
      })
        .then(function (response) {
          if (response.data.success) {
            setNameErrorMsg("");
            setDescErrorMsg("");

            e.target.reset();
            myToast.show();
            onRolesUpdate();
          } else {
            setNameErrorMsg(response.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // fail validation
      if (!validateLength(nameInput.current.value, 5, 20)) {
        setNameErrorMsg("Role Name must be between 5-20 characters");
      }
      if (!validateLength(descriptionInput.current.value, 0, 300)) {
        setDescErrorMsg("Role Description cannot be more than 300 characters");
      }
    }
  });

  const skillsFilter = useCallback((item) => {
    console.log(item)
    const skillName = item.Skill_Name.toLowerCase()
    if (skillName.includes(skillSearch)) {
      return true
    }
    return false
  }, [skillSearch])

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
              {roleID ? "Update Role" : "Create Role"}
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
                    ref={nameInput}
                  />
                  {!!nameErrorMsg.length && (
                    <p className="text-danger">{nameErrorMsg}</p>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="department" className="col-form-label">
                    Department
                  </label>
                  <select
                    id="department"
                    className="form-select"
                    ref={departmentInput}
                  >
                    <option value="Marketing">Marketing</option>
                    <option value="Operations">Operations</option>
                    <option value="HR">HR</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="Assign Skills" className="col-form-label">
                    Assign Skills
                  </label>
                </div>
                <div class="col-12">
                  <input type="text" placeholder="Search Skills" className="form-control my-1" onChange={(e) => setSkillSearch(e.target.value.toLowerCase())} />
                </div>
                <div className="col-12" style={{ height: "100px", overflowY: "auto" }}>
                  <div className="row">

                    {skills.filter(skillsFilter).map((item, index) => {
                      const { Skill_Name, Skill_ID } = item
                      return <div className="col-6" key={Skill_ID}>{Skill_Name}</div>
                    })}
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-12">
                  <label htmlFor="roleDescription" className="col-form-label">
                    Role Description
                  </label>

                  <textarea
                    id="roleDescription"
                    className="form-control"
                    ref={descriptionInput}
                  />
                  {!!descErrorMsg.length && (
                    <p className="text-danger">{descErrorMsg}</p>
                  )}
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
      </div >

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
            {roleID
              ? "Role successfully updated!"
              : "A New Role Has Been Successfully Created!"}
          </div>
        </div>
      </div>
    </div >
  );
}
