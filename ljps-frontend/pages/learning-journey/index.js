import React, { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import Tooltip from "../../components/LearningJourneyComponent/Tooltip.js";


export default function SelectRole() {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter();
  const toast = useRef();

  useEffect(() => {
    onRolesUpdate();
  }, []);

  const toggleButton = (e) => {
    setSelectedRole(e.target.id);
  };

  const onRolesUpdate = useCallback(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND}/api/roles`).then((res) => {
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
    <div class="container pb-4">
      <div className="row px-3">
        <div className="col-md-5 col-sm-12 d-flex justify-content-center align-items-center p-2">
          <h3>
            Select a Role to kickstart your Learning Journey
          </h3>
        </div>

        <div className="col-md-7 col-sm-12 d-flex justify-content-center">
          <Image src="/select-role.svg" height={450} width={450} />
        </div>
      </div>


      <div style={{ maxHeight: "400px", overflowY: "auto", overflowX: "hidden" }} className="p-2">

        <div className="row">
          {roles?.length == 0 && (
            <h4 className="text-center"> No Roles Available</h4>
          )}

          {roles.map((role) => (
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" style={{ overflowWrap: "break-word" }} key={role.Job_Role_ID} >
              <div id={role.Job_Role_ID} key={role.Job_Role_ID}
                className={
                  role.Job_Role_ID === Number(selectedRole)
                    ? "btn btn-outline-primary my-3 w-100 active d-flex justify-content-between p-3"
                    : "btn btn-outline-primary my-3 w-100 d-flex justify-content-between p-3"
                }
                onClick={toggleButton}
              >
                {role.Job_Role_Name}
                <Tooltip description={role.Job_Role_Description ? role.Job_Role_Description : "No description"} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button type="button" className="btn btn-primary px-5" onClick={checkSubmit}>
          Next
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
