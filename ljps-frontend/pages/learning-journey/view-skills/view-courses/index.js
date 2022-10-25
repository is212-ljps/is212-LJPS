import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import CourseModal from "../../../../components/CourseComponent/CourseModal";

export default function ViewCourses() {
  var router = useRouter();
  var skills = router.query["selectedSkill"];
  var roleID = router.query["selectedRole"];
  const toast = useRef();

  const [skillDetails, setSkillDetails] = useState([]);

  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [confirmSubmit, setConfirmSubmit] = useState(false);
  const [roleName, setRoleName] = useState("");

  useEffect(() => {
    if (skills && roleID) {
      console.log(skills.length);
      const url = `http://localhost:8080/api/skills/multiple/${skills}`;
      const axiosFn = axios.get;
      axiosFn(url)
        .then(function (response) {
          if (response.data.success) {
            let skills = [];
            Object.values(response.data.data).forEach((skill) => {
              skills.push(skill);
            });
            setSkillDetails(skills);
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      const roleUrl = `http://localhost:8080/api/roles/${roleID}`;
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
      const skillUrl = `http://localhost:8080/api/courses/multiple/skill/${skills}`;
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
      router.push("/learning-journey");
    }
  }, [skills]);

  const toggleButton = (e) => {
    var id = e.target.id;
    if (!selectedCourses.includes(id)) {
      setSelectedCourses(() => [...selectedCourses, id]);
    } else {
      setSelectedCourses((currentCourses) =>
        currentCourses.filter((course) => course != id)
      );
    }
  };

  const checkSubmit = () => {
    if (selectedCourses.length == 0) {
      setConfirmSubmit(false);
    } else {
      setConfirmSubmit(true);
    }
  };

  return (
    <>
      <CourseModal
        checkSubmit={confirmSubmit}
        roleId={roleID}
        skillName={skillDetails.skillName}
        skillId={skills}
        roleName={roleName}
        courses={selectedCourses}
      />
      <div className="row m-4">
        <div className="col-md-5 col-sm-12 d-flex flex-column justify-content-center p-5">
          <h3>
            {" "}
            Select courses to fulfill your selected skill for{" "}
            <span className="text-primary fw-bold">
              {skillDetails.skillName}
            </span>
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
        <div className="row">
          {" "}
          {courses.length > 0 &&
            courses.map((course) => (
              <div className="col-12 col-md-6 col-xl-4">
                {console.log(course)}
                <div className="card mt-2">
                  <div className="card-header bg-primary text-light">
                    {" "}
                    <b>{course.Course_Name}</b>{" "}
                  </div>
                  <div className="row py-3">
                    <div className="col-7">
                      <p className="mx-3">Course ID: {course.Course_ID}</p>
                    </div>
                    <div className="col-5 px-4" align="right">
                      <div className=" badge bg-light text-black">
                        {" "}
                        {course.Course_Category}{" "}
                      </div>
                    </div>
                  </div>

                  <div className="row p-2">
                    <div className="col-12">
                      {skillDetails?.map((skill) => (
                        <span
                          className="badge rounded-pill bg-dark py-2 me-2"
                          key={skill.Skill_Name}
                        >
                          {skill.Skill_Name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="row mx-1">
                    <div className="col-10">
                      {" "}
                      <p>{course.Course_Desc}</p>{" "}
                    </div>
                    <div className="col-2" align="right">
                      <div>
                        {" "}
                        <label
                          style={{ cursor: "pointer" }}
                          for={course.Course_ID}
                        >
                          Add
                        </label>
                        <input
                          type={"checkbox"}
                          id={course.Course_ID}
                          key={course.Course_ID}
                          className={selectedCourses.includes(course.Course_ID)}
                          onClick={toggleButton}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* [LJPS-35] Add button here */}
      </div>
      <div className="container d-flex justify-content-end">
        <button
          type="button"
          value="Create Learning Journey"
          onClick={checkSubmit}
          data-bs-toggle="modal"
          data-bs-target="#role-modal"
          className="float-right btn btn-outline-primary my-3 active"
        >
          Create Learning Journey
        </button>
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
