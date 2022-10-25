import React, { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";


export default function SelectRole() {
  const [roles, setRoles] = useState([]);

  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter();
  const toolTip = useRef();
  

  const toast = useRef();

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

  const checkSubmit = () => {
    if (selectedRole == "") {
      var myToast = new bootstrap.Toast(toast.current);
      myToast.show();
    } else {
      router.push({
        pathname: "/learning-journey/view-skills",
        query: { selectedRole },
      });
    }
  };

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

      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        <div className="row mx-4">
          {roles?.length == 0 && (
            <h4 className="text-center"> No Roles Available</h4>
          )}

          {roles?.length > 0 &&
            roles.map((role) => (
              <div
                className="col-6 col-md-3"
                style={{ overflowWrap: "break-word" }}
              >
                <button
                  type="button"
                  id={role.Job_Role_ID}
                  key={role.Job_Role_ID}
                  className={
                    role.Job_Role_ID === Number(selectedRole)
                      ? "btn btn-outline-primary my-3 w-100 active"
                      : "btn btn-outline-primary my-3 w-100"
                  }
                  onClick={toggleButton}
                >
                  {role.Job_Role_Name}

                  <i
                    className="bi bi-info-circle-fill mx-2 "
                    data-bs-toggle="tooltip"
                    data-bs-placement="bottom"
                    data-trigger="manual"
                    data-bs-title={role.Job_Role_Description}
                  ></i>
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="d-flex justify-content-end m-3">
        <button type="button" className="btn btn-primary" onClick={checkSubmit}>
          {" "}
          Next{" "}
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
          <div className="toast-body">Please select a Role first !</div>
        </div>
      </div>
    </div>
  );
}
