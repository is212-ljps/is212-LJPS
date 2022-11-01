import React, { useCallback, useRef, useEffect, useState } from 'react'
import { validateLength } from '../../util/validation'
import axios from 'axios'


export default function SkillModal({ selectedSkill, onSkillsUpdate, resetSelectedSkill, ...props }) {
  const [nameErrorMsg, setNameErrorMsg] = useState('')
  const [descErrorMsg, setDescErrorMsg] = useState('')
  const [courseErrorMsg, setCourseErrorMsg] = useState('')
  const { skillName, skillDescription, skillID } = selectedSkill
  const [courses, setCourses] = useState([])
  const [assignedCourses, setAssignedCourses] = useState([])
  const modal = useRef()
  const toast = useRef()
  const nameInput = useRef()
  const descriptionInput = useRef()


  function handleChangeItem(e) {
    const temp = [...assignedCourses]
    const index = assignedCourses.indexOf(e.target.value)
    if (index >= 0) {
      temp.splice(index, 1)
    }
    else {
      temp.push(e.target.value)
    }
    setAssignedCourses(temp)
  }

  useEffect(() => {
    if (!nameInput.current || !descriptionInput.current)
      return

    nameInput.current.value = skillName
    descriptionInput.current.value = skillDescription
  }, [skillName, skillDescription, skillID, nameInput, descriptionInput])

  useEffect(() => {
    if (modal.current) {
      modal.current.addEventListener("hidden.bs.modal", function (event) {
        nameInput.current.value = ""
        descriptionInput.current.value = ""
        setAssignedCourses([])
        setNameErrorMsg("")
        setDescErrorMsg("")
        setCourseErrorMsg("")
        resetSelectedSkill()
      })
    }
  }, [modal.current])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/courses`).then((res) => {
      setCourses(res.data.data)
      console.log(courses)
    })
  }, [])

  useEffect(() => {
    if (!skillID) return
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/skills/${skillID}/courses`).then((res) => {
      setAssignedCourses(res.data.data.map(item => item.Course_ID))
    })
  }, [skillID])


  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (
      validateLength(nameInput.current.value, 5, 20) &&
      validateLength(descriptionInput.current.value, 0, 300) &&
      assignedCourses.length > 0
    ) {
      // pass length validation
      var myToast = new bootstrap.Toast(toast.current);
      const url = skillID ? `${process.env.NEXT_PUBLIC_BACKEND}/api/skills/` + skillID : `${process.env.NEXT_PUBLIC_BACKEND}/api/skills`
      const axiosFn = skillID ? axios.put : axios.post
    
      axiosFn(url, {
        skillName: nameInput.current.value,
        skillDescription: descriptionInput.current.value,
        assignedCourses: Array.from(document.getElementsByName("course-checkbox")).filter((item) => item.checked).map(item => item.value)
      })
        .then(function (response) {
          if (response.data.success) {
            setNameErrorMsg('')
            setDescErrorMsg('')
            setCourseErrorMsg('')

            if (!skillID) {
              e.target.reset();
              setAssignedCourses([])
            }
            myToast.show();
            onSkillsUpdate()
          } else {
            setNameErrorMsg(response.data.message)
          }
        })
        .catch(function (error) {
          console.log(error);
          setNameErrorMsg(error.response.data.message)
        });
    } else {
      // fail validation
      if (!validateLength(nameInput.current.value, 5, 20)) {
        setNameErrorMsg('Skill Name must be between 5-20 characters')
      }
      if (!validateLength(descriptionInput.current.value, 0, 300)) {
        setDescErrorMsg('Skill Description cannot be more than 300 characters')
      }
      if (assignedCourses.length < 1) {
        setCourseErrorMsg('Please assign the skill to at least 1 course')
      }
    }
  });
  return <div className="modal fade" ref={modal} id="skill-modal" tabIndex="-1" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="createSkillModalLabel">
            {skillID ? 'Update Skill' : 'Create Skill'}
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
                  ref={nameInput}
                />
                {!!nameErrorMsg.length && <p className="text-danger">{nameErrorMsg}</p>}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-12">
                <label htmlFor="Assign Skills" className="col-form-label">
                  Assign Courses
                </label>
              </div>
              <div className="col-12">
                <div className="bg-light p-2 rounded-2" style={{ height: "100px", overflowY: "auto", overflowX: "hidden" }}>
                <div className="row">
                  {courses.map((item, index) => {
                    const {Course_Name, Course_ID} = item
                    return <div className="col-12" key={Course_ID}>
                    <div className="form-check">
                      <input onChange={(e)=>handleChangeItem(e)} checked={assignedCourses.includes(Course_ID)}className="form-check-input" name="course-checkbox" type="checkbox" id={"course-checkbox-" + Course_ID} value={Course_ID} />
                      <label className="form-check-label" htmlFor={"course-checkbox-" + Course_ID}>{Course_Name}</label>
                    </div>
                  </div>
                  })}
                </div>
                </div>
                {!!courseErrorMsg.length && <p className="text-danger">{courseErrorMsg}</p>}
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
                  ref={descriptionInput}
                />
                {!!descErrorMsg.length && <p className="text-danger">{descErrorMsg}</p>}
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
          {skillID ? 'Skill successfully updated!' : 'A New Skill Has Been Successfully Created!'}
        </div>
      </div>
    </div>
  </div>
}


