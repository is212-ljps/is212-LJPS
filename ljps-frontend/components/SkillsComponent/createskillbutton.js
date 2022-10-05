import React from "react";

export default function CreateSkillButton({ resetSelectedSkill, ...props }) {
  return (
    <div>
      <div className="row">
        <div className="col-12 d-flex flex-row-reverse">
          <button
            type="button"
            className="btn btn-light"
            data-bs-toggle="modal"
            data-bs-target="#skill-modal"
            onClick={resetSelectedSkill}
          >
            Create Skill <i className="bi bi-plus-lg"></i>
          </button>
        </div>

      </div>
    </div>
  );
}
