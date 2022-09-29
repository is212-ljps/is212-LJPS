import axios from "axios";
import React from "react";
import { useState, useRef, useEffect } from "react";
import { validateLength } from "../../util/validation/index";

export default function DeleteSkillButton() {
  const modal = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    console.log('test')
  }

  return (
    <div>
      <div className="row">
        <div className="col-12 d-flex flex-row-reverse">
          <button
            type="button"
            className="btn btn-light"
            data-bs-toggle="modal"
            data-bs-target="#deleteSkillModal"
          >
            Delete Skill
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id="deleteSkillModal"
        tabindex="-1"
        aria-labelledby="deleteSkillModalModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-body text-center p-4">Are you sure you want to delete this skill ?</div>
            <div className="modal-footer d-flex justify-content-center">


            <button type="button" className="btn btn-success" onClick={handleSubmit}>
               Yes
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                No
              </button>

  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
