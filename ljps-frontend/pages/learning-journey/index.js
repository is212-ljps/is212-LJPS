import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

export default function SelectRole() {
  const [roles, setRoles] = useState([]);

  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    onRolesUpdate();
  }, []);

  const toggleButton = (e) => {
    setSelectedRole(e.target.id);
  };

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

      <div
        className="container"
        style={{ maxHeight: "400px", overflowY: "auto" }}
      >
        <div className="row mx-4">
          {roles.length == 0 && (
            <h4 className="text-center"> No Roles Available</h4>
          )}

          {roles.length > 0 &&
            roles.map((role) => (
              <div
                className="col-6 col-md-3"
                style={{ overflowWrap: "break-word" }}
              >
                <button
                  type="button"
                  id={role.Job_Role_ID}
                  key ={role.Job_Role_ID}
                  className={
                    role.Job_Role_ID === Number(selectedRole)
                      ? "btn btn-outline-primary my-3 w-100 active"
                      : "btn btn-outline-primary my-3 w-100"
                  }
                  onClick={toggleButton}
                >

                  {role.Job_Role_Name}
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="d-flex justify-content-end m-3">
        <Link
          href={{
            pathname: "/learning-journey/view-skills",
            query: { selectedRole },
          }}
        >
          <button type="button" className="btn btn-primary">
            {" "}
            Next{" "}
          </button>
        </Link>
      </div>
    </div>
  );
}
