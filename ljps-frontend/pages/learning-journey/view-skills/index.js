import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";

export default function ViewSkills() {
  var router = useRouter();
  var roleID = router.query["selectedRole"];

  const [roleDescription, setRoleDescription] = useState("");
  const [roleDepartment, setRoleDepartment] = useState("");
  const [roleName, setRoleName] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");


  useEffect(() => {
    if (roleID) {
      const url = `http://localhost:8080/api/roles/` + roleID;
      const axiosFn = axios.get;
      axiosFn(url)
        .then(function (response) {
          if (response.data.success) {
            setRoleDescription(response.data.data[0].Job_Role_Description);
            setRoleDepartment(response.data.data[0].Job_Department);
            setRoleName(response.data.data[0].Job_Role_Name);
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      const skillUrl = `http://localhost:8080/api/roles/${roleID}/skills`;
      axiosFn(skillUrl)
        .then(function (response) {
          if (response.data.success) {
            setSkills(response.data.data);
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  const toggleButton = (e) => {
    setSelectedSkill(e.target.id);
  };

  return (
    <div>
      <div className="row m-4">
        <div className="col-md-5 col-sm-12 d-flex flex-column justify-content-center p-5">
          <h3>
            {" "}
            Select a skill to kickstart your Learning Journey as a{" "}
            <span className="text-primary fw-bold">{roleName}</span>
          </h3>
          <span className="badge text-white bg-dark w-25 mt-3">
            {roleDepartment}
          </span>
        </div>

        <div className="col-md-7 col-sm-12 d-flex justify-content-center">
          <Image src="/view-skill-learner.svg" height={350} width={350} />
        </div>
      </div>

      <div className="row mx-4">
        {skills.length > 0 &&
          skills.map((skill) => (
            <div
              className="col-6 col-md-3"
              style={{ overflowWrap: "break-word" }}
            >
              <button
                type="button"
                id={skill.Skill_ID}
                key={skill.Skill_ID}
                className={
                  skill.Skill_ID === Number(selectedSkill)
                    ? "btn btn-outline-primary my-3 w-100 active"
                    : "btn btn-outline-primary my-3 w-100"
                }
                onClick={toggleButton}
              >
                {skill.Skill_Name}
              </button>
            </div>
          ))}

      </div>

      <div className="d-flex justify-content-end m-3">

          <button type="button" className="btn btn-primary">
            {" "}
            Next{" "}
          </button>
      </div>
    </div>
  );
}
