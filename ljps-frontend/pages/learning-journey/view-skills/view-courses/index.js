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
      const url = `${process.env.NEXT_PUBLIC_BACKEND}/api/skills/multiple/${skills}`
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
      const roleUrl = `${process.env.NEXT_PUBLIC_BACKEND}/api/roles/${roleID}`
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
      const skillUrl = `${process.env.NEXT_PUBLIC_BACKEND}/api/courses/skills/${skills}`;
      axiosFn(skillUrl)
        .then(function (response) {
          if (response.data.success) {
            setCourses(response.data.data.courseDetails);
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

  const checkPreviousPage = () => {
    router.push({
      pathname: "/learning-journey/view-skills",
      query: { selectedSkill: skillID, selectedRole: roleID },
    });
  };

  return (
    <div className="container">
      <CourseModal
        checkSubmit={confirmSubmit}
        roleId={roleID}
        skillDetails={skillDetails}
        roleName={roleName}
        courses={selectedCourses}
      />
      <div className="row m-4">
        <div className="col-md-5 col-sm-12 d-flex flex-column justify-content-center p-2">
          <h3>
            Select courses to fulfill your selected skill for:
            {skillDetails.length == 1 && (
              <span className="text-primary fw-bold">
                {skillDetails[0].Skill_Name}
              </span>
            )}
          </h3>

          {skillDetails.length > 1 && (
            <ul className="mt-2">
              {skillDetails.map((skill) => (
                <li className="fw-bold text-primary">
                  <h5>{skill.Skill_Name}</h5>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="col-md-7 col-sm-12 d-flex justify-content-center">
          <Image src="/view-skill-learner.svg" height={350} width={350} />
        </div>
      </div>
      <div className="container mx-6 px-3">
        <div className="row">
          {courses?.length > 0 &&
            courses.map((course) => (
              <div className="col-12 col-md-6 col-xl-4" key={course.Course_ID}>
                <div className="card mb-3 shadow border-0">
                  <div className="card-header bg-primary text-light">
                    <b>{course.Course_Name}</b>
                  </div>
                  <div className="row p-3">
                    <div className="col-8">
                      <b>Course ID: {course.Course_ID}</b>
                    </div>
                    <div className="col-4" align="right">
                      <div className=" badge bg-light text-black">
                        {course.Course_Category}
                      </div>
                    </div>
                  </div>
                  <div className="row p-3">
                    <div className="col-12">
                      {course.skills?.map((skill) => (
                        <span
                          className="badge rounded-pill bg-dark py-2 me-2"
                          key={skill}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="row mx-1">
                    <div className="col-10">
                      <p>{course.Course_Desc}</p>
                    </div>
                    <div className="col-2" align="right">
                      <label style={{ cursor: "pointer" }} htmlFor={course.Course_ID}>
                        Add
                      </label>
                      <div>
                        <input
                          type={"checkbox"}
                          id={course.Course_ID}
                          key={course.Course_ID}
                          onClick={toggleButton}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="container p-3 mt-2">
        <div className="row">
          <div className="col-6">
            <button type="button" value="back" onClick={checkPreviousPage} className="btn btn-primary px-4"  >
              Back
            </button>
          </div>
          <div className="col-6 justify-content-end d-flex ">
            <button
              type="button"
              value="Create Learning Journey"
              onClick={checkSubmit}
              data-bs-toggle="modal"
              data-bs-target="#role-modal"
              className="btn btn-primary px-4"
            >
              Create
            </button>
          </div>
        </div>
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
    </div>
  );
}
