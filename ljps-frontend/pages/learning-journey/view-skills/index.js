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

  // get role id and description based on role id

  useEffect(() => {
    if (roleID) {
      const url = `http://localhost:8080/api/roles`+ roleID;
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
    }
  }, []);

  return (
    <div>
      <div className="row m-4">
        <div className="col-md-5 col-sm-12 d-flex flex-column justify-content-center p-5">
          <h3>
            {" "}
            Select a skill to kickstart your Learning Journey as a <span className="text-primary fw-bold">{roleName}</span>
          </h3>
          <span class="badge text-white bg-dark w-25 mt-3">{roleDepartment}</span>


        </div>

        <div className="col-md-7 col-sm-12 d-flex justify-content-center">
          <Image src="/view-skill-learner.svg" height={350} width={350} />
        </div>
      </div>
    </div>
  );
}
