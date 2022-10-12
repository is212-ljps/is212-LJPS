import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import CourseModal from "../../../../components/CourseComponent/CourseModal"

export default function ViewCourses() {
  var router = useRouter();
  var skillID = router.query["selectedSkill"];
  const toast = useRef();


  const [skillDetails, setSkillDetails] = useState({
    skillName: "",
    skillDescription: "",
  });

  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  useEffect(() => {
    if (skillID) {
      const url = `http://localhost:8080/api/skills/${skillID}`
      const axiosFn = axios.get;
      axiosFn(url)
        .then(function (response) {
          if (response.data.success) {
            console.log(response)
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
    if (!selectedCourses.includes(id)){
      setSelectedCourses(()=> [...selectedCourses, id])
    } else {
      setSelectedCourses((currentCourses)=> currentCourses.filter((course)=> course != id))
    }
  };

  const checkSubmit = () => {
    if (selectedCourses.length == 0) {
      setConfirmSubmit(false);
    } else {
      setConfirmSubmit(true);
    }
  };

  const handleSubmit = () => {
    
  }

  return (
    <>
      <CourseModal handleSubmit={handleSubmit} checkSubmit={confirmSubmit} />
      <div className="row m-4">
        <div className="col-md-5 col-sm-12 d-flex flex-column justify-content-center p-5">
          <h3>
            {" "}
            Select courses to fulfill your selected skill as {" "}
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

      <div className="container row mx-auto">
        {courses.length > 0 &&
          courses.map((course) => (
            <div
              className="col-6 col-md-3"
              style={{ overflowWrap: "break-word" }}
            >
              <button
                type="button"
                id={course.Course_ID}
                key={course.Course_ID}
                className={
                  selectedCourses.includes(course.Course_ID)
                    ? "btn btn-outline-primary my-3 w-100 active"
                    : "btn btn-outline-primary my-3 w-100"
                }
                onClick={toggleButton}
              >
                {course.Course_Name}
              </button>
            </div>
          ))}
      </div>
      <div className="container d-flex justify-content-end">
        <button type="button" value="Create Learning Journey" onClick={checkSubmit} data-bs-toggle="modal" data-bs-target="#role-modal" className="float-right btn btn-outline-primary my-3 active">Create Learning Journey</button>
      </div>
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
