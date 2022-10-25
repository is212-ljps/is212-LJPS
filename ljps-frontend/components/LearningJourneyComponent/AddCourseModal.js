import React, {useState} from "react"


export default function AddCourses({ learningJourneyName }) {
  const [courses, setCourses] = useState([])
  

  return <div className="modal fade" id="add-courses-modal" tabIndex="-1" aria-labelledby="add-courses-modal" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add courses to {learningJourneyName}</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">

        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Add courses</button>
        </div>
      </div>
    </div>
  </div>
}