import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function SelectRole() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    onRolesUpdate();
  }, []);

  const onRolesUpdate = useCallback(() => {
    axios.get("http://localhost:8080/api/roles").then((res) => {
      setRoles(res.data.data);
    });
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-md-5 col-sm-12 d-flex justify-content-center align-items-center">
          <h3 className="p-5">
            {" "}
            Select a Role to kickstart your Learning Journey
          </h3>
        </div>

        <div className="col-md-7 col-sm-12 d-flex justify-content-center">
          <Image src="/select-role.svg" height={450} width={450} />
        </div>
      </div>

      
      <div className="row">

        {roles.length==0 && (
          <h4 className="text-center"> No Roles Available</h4>
        )}
        {roles.length > 0 &&
          roles.map((role) => (
            <div className="col-6 col-md-3">
              <button
                type="button"
                className="btn btn-outline-primary m-4 w-100"
              >
                {role.Job_Role_Name}
              </button>
            </div>
          ))}
      </div>

      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-primary">
          {" "}
          Next{" "}
        </button>
      </div>
    </div>
  );
}
