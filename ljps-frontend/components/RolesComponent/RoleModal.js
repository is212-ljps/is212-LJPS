import React, { useCallback, useRef, useEffect, useState } from "react";
import { validateLength } from "../../util/validation";
import axios from "axios";


const errorDefaultVal = {
  name: "",
  description: "",
  assignedSkills: ""
}

export default function RoleModal({ selectedRole, onRolesUpdate, resetSelectedRole, ...props }) {
  const [errors, setErrors] = useState(errorDefaultVal)

  const { roleName, roleDescription, roleID, roleDepartment } = selectedRole;
  const [skills, setSkills] = useState([])
  const modal = useRef();
  const toast = useRef();
  const nameInput = useRef();
  const descriptionInput = useRef();
  const departmentInput = useRef();
  const [skillSearch, setSkillSearch] = useState("")
  useEffect(() => {
    if (!nameInput.current || !descriptionInput.current || !departmentInput.current)
      return;

    nameInput.current.value = roleName;
    descriptionInput.current.value = roleDescription;
    departmentInput.current.value = roleDepartment ? roleDepartment : "Marketing";
  }, [roleName, roleDescription, roleID, nameInput, descriptionInput, departmentInput]);

  useEffect(() => {
    if (modal.current) {
      modal.current.addEventListener("hidden.bs.modal", function (event) {
        nameInput.current.value = "";
        descriptionInput.current.value = "";
        departmentInput.current.value = roleDepartment ? roleDepartment : "Marketing";
        setErrors(errorDefaultVal)

        resetSkillsSelected()
        resetSelectedRole();
      });
    }
  }, [modal.current]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/skills`).then((res) => {
      setSkills(parseSkillsObj(res.data.data))
    })
  }, [])

  useEffect(() => {
    if (!roleID) return
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/roles/${roleID}/skills`).then((res) => {
      const skillIds = Object.values(res.data.data)
      const newState = { ...skills }
      skillIds.forEach(item => {
        const id = "skill-checkbox-" + item.Skill_ID
        newState[id].isChecked = true
      })
      setSkills(newState)
    })
  }, [roleID])


  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const selectedSkills = getSelectedSkillIds()
    if (validateLength(nameInput.current.value, 5, 50) && validateLength(descriptionInput.current.value, 0, 300) && selectedSkills.length > 0) {
      setErrors(errorDefaultVal)
      var myToast = new bootstrap.Toast(toast.current);
      const url = roleID ? `${process.env.NEXT_PUBLIC_BACKEND}/api/roles/` + roleID : `${process.env.NEXT_PUBLIC_BACKEND}/api/roles`;
      const axiosFn = roleID ? axios.put : axios.post;
      axiosFn(url, {
        roleName: nameInput.current.value,
        roleDescription: descriptionInput.current.value,
        jobDepartment: departmentInput.current.value,
        skills: selectedSkills
      }).then(function (response) {
        if (response.data.success) {

          if (!roleID) {
            e.target.reset();
            resetSkillsSelected()
          }
          myToast.show();
          onRolesUpdate();
          return
        }
        setErrors({ ...errorDefaultVal, name: response.data.message });
      }).catch(function (error) {
        console.log(error);
        setErrors({ ...errorDefaultVal, name: error.response.data.message });
      });
    } else {
      // fail validation
      const err = { ...errorDefaultVal }
      if (!validateLength(nameInput.current.value, 5, 20)) {
        err.name = "Role Name must be between 5-20 characters"
      }
      if (!validateLength(descriptionInput.current.value, 0, 300)) {
        err.description = "Role Description cannot be more than 300 characters"
      }
      if (selectedSkills.length == 0) {
        err.assignedSkills = "Please select at least 1 skill"
      }
      setErrors(err)
    }
  });

  const skillsFilter = useCallback((item) => {
    const skillName = item.Skill_Name.toLowerCase()
    if (skillName.includes(skillSearch)) {
      return true
    }
    return false
  }, [skillSearch])

  const setSkillChecked = useCallback((e) => {
    const newState = { ...skills }
    newState[e.target.id].isChecked = !newState[e.target.id].isChecked
    setSkills(newState)
  }, [skills])

  const getSelectedSkillIds = useCallback(() => {
    const values = Object.values(skills)
    const selectedSkills = values.map((item) => {
      const { isChecked, Skill_ID } = item
      return isChecked ? Skill_ID : null
    })
    return selectedSkills.filter(Number)
  }, [skills])

  const resetSkillsSelected = useCallback(() => {
    const newState = { ...skills }
    const keys = Object.keys(newState)
    keys.forEach(key => {
      newState[key].isChecked = false
    })
    setSkills(newState)
  }, [skills])

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
                  {!!errors.name.length && (
                    <p className="text-danger">{errors.name}</p>
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
                <div className="col-12">
                  <input type="text" placeholder="Search Skills" className="form-control my-1" onChange={(e) => setSkillSearch(e.target.value.toLowerCase())} />
                </div>
                <div className="col-12">
                  <div className="bg-light p-2 rounded-2" style={{ height: "100px", overflowY: "auto", overflowX: "hidden" }}>
                    <div className="row" >
                      {Object.values(skills).filter(skillsFilter).map((item, index) => {
                        const { Skill_Name, Skill_ID, isChecked } = item
                        return <div className="col-6" key={Skill_ID}>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" id={"skill-checkbox-" + Skill_ID} onChange={setSkillChecked} checked={isChecked} value={Skill_ID} />
                            <label className="form-check-label" htmlFor={"skill-checkbox-" + Skill_ID}>{Skill_Name}</label>
                          </div>
                        </div>
                      })}
                    </div>
                  </div>
                </div>
              </div>
              {!!errors.assignedSkills.length && (
                <p className="text-danger">{errors.assignedSkills}</p>
              )}

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
                  {!!errors.description.length && (
                    <p className="text-danger">{errors.description}</p>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Save Changes
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

function parseSkillsObj(skills) {
  const obj = {}
  skills?.forEach((item, index) => {
    const { Skill_ID, Skill_Name } = item
    obj["skill-checkbox-" + Skill_ID] = { Skill_ID, Skill_Name, isChecked: false }
  })
  return obj
}