import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import CourseModal from "../../../../components/CourseComponent/CourseModal"

export default function ViewCourses() {
  var router = useRouter();
  var skillID = router.query["selectedSkill"];
  var roleID = router.query["selectedRole"];
  const toast = useRef();


  const [skillDetails, setSkillDetails] = useState({
    skillName: "",
    skillDescription: "",
  });

  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    if (skillID && roleID) {
      const url = `http://localhost:8080/api/skills/${skillID}`
      const axiosFn = axios.get;
      axiosFn(url)
        .then(function (response) {
          if (response.data.success) {
            let newSkillDetails = {
              skillName: response.data.data[0].Skill_Name,
              skillDescription: response.data.data[0].Skill_Description,
            };
            setSkillDetails(newSkillDetails)
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      const roleUrl = `http://localhost:8080/api/roles/${roleID}`
      axiosFn(roleUrl)
        .then(function (response) {
          if (response.data.success) {
            setRoleName(response.data.data[0].Job_Role_Name);
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      const skillUrl = `http://localhost:8080/api/courses/skill/${skillID}`;
      axiosFn(skillUrl)
        .then(function (response) {
          if (response.data.success) {
            setCourses(response.data.data);
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      // router.push("/learning-journey");
    }
  }, [skillID]);

  const toggleButton = (e) => {
    var id = e.target.id;
    if (!selectedCourses.includes(id)) {
      setSelectedCourses(() => [...selectedCourses, id])
    } else {
      setSelectedCourses((currentCourses) => currentCourses.filter((course) => course != id))
    }
  };

  const checkSubmit = () => {
    if (selectedCourses.length == 0) {
      setConfirmSubmit(false);
    } else {
      setConfirmSubmit(true);
    }
  };

  const checkPreviousPage = () => {
    router.push({
      pathname: "/learning-journey/view-skills",
      query: {selectedSkill:skillID, selectedRole:roleID}
    })
  }

  return (
    <>
      <CourseModal checkSubmit={confirmSubmit} roleId={roleID} skillName={skillDetails.skillName} skillId={skillID} roleName={roleName} courses={selectedCourses} />
      <div className="row m-4">
        <div className="col-md-5 col-sm-12 d-flex flex-column justify-content-center p-5">
          <h3>
            {" "}
            Select courses to fulfill your selected skill for {" "}
            <span className="text-primary fw-bold">{skillDetails.skillName}</span>
          </h3>
          <span className="badge text-white bg-dark w-25 mt-3">
            {skillDetails.skillDescription}
          </span>
        </div>

        <div className="col-md-7 col-sm-12 d-flex justify-content-center">
          <Image src="/view-skill-learner.svg" height={350} width={350} />
        </div>
      </div>
      <div className="container mx-6 px-3">
        <div className="row"> {courses.length > 0 && courses.map((course) => (
          <div className="col-12 col-md-6 col-xl-4">
            <div className="card mt-2">
              <div className="card-header bg-primary text-light"> <b>{course.Course_Name}</b> </div>
              <div className="card-body"></div>
              <div className="row">
                <div className="col-5">
                  <p className="mx-3">{skillDetails.skillName}</p>
                </div>
                <div className="col-7 px-4" align="right">
                  <div className=" badge bg-light text-black"> {course.Course_Category} </div>
                </div>

              </div>
              <div className="row pe-3">
                <div className="col-9">
                  <div className="col-9 mx-3"> <b>Course ID: {course.Course_ID}</b></div>
                </div>

                <div className="col-3" align="right">
                  <label style={{ cursor: "pointer" }} for={course.Course_ID}>Add</label>
                </div>


              </div>
              <div className="row mx-1">
                <div className="col-10"> <p>{course.Course_Desc}</p> </div>
                <div className="col-2" align="right">
                  <div > <input type={"checkbox"} id={course.Course_ID} key={course.Course_ID} className={selectedCourses.includes(course.Course_ID)} onClick={toggleButton}></input></div>
                </div>
              </div>
            </div>

          </div>
        ))}

        </div>
        {/* [LJPS-35] Add button here */}
      </div>

      <div className="container p-3" style={{"marginTop":50}}>
        <div className="row">
          <div className="col-6">
            <button type="button" value="back" onClick={checkPreviousPage} className="btn btn-primary" style={{"width":150}}> Back </button>
          </div>

          <div className="col-6 justify-content-end d-flex ">
            <button type="button" value="Create Learning Journey" onClick={checkSubmit} data-bs-toggle="modal" data-bs-target="#role-modal" className="btn btn-primary" style={{"width":150}}> {" "}Create{" "}</button>
          </div>
        </div>
      </div>
      {/* <div className="container d-flex justify-content-start">
        <button type="button" value="Create Learning Journey" onClick={checkPreviousPage} className="float-left btn btn-outline-primary my-3 active">Back</button>
      </div>

      <div className="container d-flex justify-content-end">
        <button type="button" value="Create Learning Journey" onClick={checkSubmit} data-bs-toggle="modal" data-bs-target="#role-modal" className="float-right btn btn-outline-primary my-3 active">Create Learning Journey</button>
      </div> */}

      <div
        className="toast position-fixed bottom-0 end-0 p-2 m-4 text-white bg-danger"
        ref={toast}
        role="alert"
        aria-live="assertive"
        data-bs-autohide="true"
        aria-atomic="true"
      >
        <div className="d-flex ">
          <div className="toast-body">Please select at least one course!</div>
        </div>
      </div>
    </>
  );
}
