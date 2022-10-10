import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

export default function ViewCourses() {
  var router = useRouter();
  var skillID = router.query["selectedSkill"];
  const toast = useRef();


  const [skillDetails, setSkillDetails] = useState({
    skillName: "",
    skillDescription: "",
  });

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    console.log(skillId)
    if (skillID) {
      const url = `http://localhost:8080/api/skills/${skillId}`
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
      const skillUrl = `http://localhost:8080/api/courses/${skillId}`;
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
  }, [skillId]);

  // const toggleButton = (e) => {
  //   setCourses(()=> [...courses, e.target.id])
  // };

  // const checkSubmit = () => {
  //   if (selectedSkill == "") {
  //     var myToast = new bootstrap.Toast(toast.current);
  //     myToast.show();
  //   } else {
  //     router.push({
  //       pathname: "/learning-journey/view-skills",
  //       query: {selectedSkill},
  //     });
  //   }
  // };

  return (
    <div>
      <div className="row m-4">
        <div className="col-md-5 col-sm-12 d-flex flex-column justify-content-center p-5">
          <h3>
            {" "}
            Select a skill to kickstart your Learning Journey as a{" "}
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

      <div className="row mx-4">
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
                // TODO: LJPS-34
                // className={
                //   course.Course_ID === Number(selectedSkill)
                //     ? "btn btn-outline-primary my-3 w-100 active"
                //     : "btn btn-outline-primary my-3 w-100"
                // }
                // onClick={toggleButton}
              >
                {course.Course_Name}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
