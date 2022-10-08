import React , { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ViewSkills() {
  var router = useRouter();
  var roleID = router.query["selectedRole"];

  const [roleDescription, setRoleDescription] = useState("")
  const [ roleName,  setRoleName ] = useState("")

  // get role id and description based on role id

  const url = `http://localhost:8080/api/roles/roledetails/` + roleID;
  const axiosFn = axios.get;
  axiosFn(url)
    .then(function (response) {
      if (response.data.success) {
        console.log(response.data)

      } else {

      }
    })
    .catch(function (error) {
      console.log(error);
    });

  return (
    <div>
      <h1> {roleID} </h1>
    </div>
  );
}
