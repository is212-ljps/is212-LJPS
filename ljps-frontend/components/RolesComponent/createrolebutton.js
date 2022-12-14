import React from "react";

export default function CreateRoleButton({
  resetSelectedRole,
  ...props
}) {
  return (
   
        <div className="col-6 d-flex flex-row-reverse">
          <button
            type="button"
            className="btn btn-light"
            data-bs-toggle="modal"
            data-bs-target="#role-modal"
            onClick={resetSelectedRole}
          >
            Create Role <i className="bi bi-plus-lg"></i>
          </button>
        </div>
    
  );
}
