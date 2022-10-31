import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Tooltip from "../../../components/LearningJourneyComponent/Tooltip";
import Image from "next/image";



export default function ViewSkills() {
  var router = useRouter();
  var roleID = router.query["selectedRole"];
  const toast = useRef();

  const [roleDetails, setRoleDetails] = useState({
    roleName: "",
    roleDepartment: "",
    roleDescription: "",
  });

  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState([]);

  useEffect(() => {
    if (roleID) {
      const url = `${process.env.NEXT_PUBLIC_BACKEND}/api/roles/` + roleID;
      const axiosFn = axios.get;
      axiosFn(url)
        .then(function (response) {
          if (response.data.success) {
            let newRoleDetails = {
              roleName: response.data.data[0].Job_Role_Name,
              roleDepartment: response.data.data[0].Job_Department,
              roleDescription: response.data.data[0].Job_Role_Description,
            };
            setRoleDetails(newRoleDetails);
          } else {
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      const skillUrl = `${process.env.NEXT_PUBLIC_BACKEND}/api/roles/${roleID}/skills`;
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
    } else {
      router.push("/learning-journey");
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.checked) {
      setSelectedSkill((selectedSkill) => [
        ...selectedSkill,
        Number(e.target.value),
      ]);
    } else {
      setSelectedSkill(
        selectedSkill.filter((skill) => skill !== Number(e.target.value))
      );
    }
  };

  const checkSubmit = () => {
    if (selectedSkill.length == 0) {
      var myToast = new bootstrap.Toast(toast.current);
      myToast.show();
    } else {
      router.push({
        pathname: "/learning-journey/view-skills/view-courses",
        query: { selectedSkill, selectedRole: roleID },
      });
    }
  };

  const checkPreviousPage = () => {
    router.push({
      pathname: "/learning-journey"
    })
  }

  return (
    <div>
      <div className="row m-4">
        <div className="col-md-5 col-sm-12 d-flex flex-column justify-content-center p-5">
          <h3>
            {" "}
            Select your skill(s) to kickstart your Learning Journey as a{" "}
            <span className="text-primary fw-bold">{roleDetails.roleName}</span>
          </h3>
          <span className="badge text-white bg-dark w-50 mt-3">
            {roleDetails.roleDepartment}
          </span>

          <p className="mt-4">
            Click on <i className="bi bi-info-circle-fill text-primary  "/> to view the skill description
          </p>
        </div>

        <div className="col-md-7 col-sm-12 d-flex justify-content-center">
          <Image src="/view-skill-learner.svg" height={350} width={350} />
        </div>
      </div>

      <div className="row mx-4">
        {skills?.length > 0 &&
          skills.map((skill) => (
            <div
              className="col-12 col-md-4 mb-5"
              style={{ overflowWrap: "break-word" }}
              key={skill.Skill_ID}
            >
              <div
                className={
                  selectedSkill.includes(skill.Skill_ID)
                    ? "rounded border border-white bg-primary text-white p-3 d-flex"
                    : "rounded border border-primary p-3 d-flex"
                }
              >
                <input
                  type="checkbox"
                  className="mx-1"
                  id={skill.Skill_ID}
                  value={skill.Skill_ID}
                  onChange={handleChange}
                />
                {skill.Skill_Name}
                
                <span style={{ marginLeft: "auto", marginRight: "0px" }}>
                <Tooltip description={skill.Skill_Description ? skill.Skill_Description : "No description"} />
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* <div className="d-flex justify-content-end m-3">
        <button type="button" className="btn btn-primary" onClick={checkSubmit}>
          {" "}
          Next{" "}
        </button>
      </div> */}

      <div className="container mt-5">
        {/* Go back to Previous Page: Learning Journey */}
        <div className="row">
          <div className="col-6 justify-content-start">
                <button type="button" className="btn btn-primary btn-lg" onClick={checkPreviousPage} style={{"width":150}}>{" "} Back {" "}</button>
          </div>


          {/* Go to next page */}
          <div className="col-6 d-flex justify-content-end">
            <button type="button" className="btn btn-primary btn-lg" onClick={checkSubmit} style={{"width":150}}>{" "} Next {" "}</button>
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
          <div className="toast-body">Please select a Skill first !</div>
        </div>
      </div>
    </div>
  );
}
