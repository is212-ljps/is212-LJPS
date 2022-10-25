import React from "react"


export default function RemoveCourseModal({course}){
    console.log(course)
    return <div className="modal fade" id="remove-course-modal" tabIndex="-1" aria-labelledby="remove-course-modal" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">Remove course "{course?.Course_Name}"</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          Are you sure you want to remove {course?.Course_Name} from your learning journey?
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <button type="button" className="btn btn-primary">Remove</button>
        </div>
      </div>
    </div>
  </div>
}