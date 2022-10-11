// View Course Details Learner 

import React, { useCallback, useEffect, useState } from "react"
import axios from "axios"
import CreateRoleButton from '../../components/RolesComponent/createrolebutton'
import DeleteRoleButton from '../../components/RolesComponent/deleterolebutton'
import RoleModal from "../../components/RolesComponent/RoleModal"

export default function ViewCourseDetails(){
    const [course, setCourse] = useState([])
    const [selectedCourse, setSelectedCourse] = useState({courseID:' ', courseName: '', courseDesc: '', courseStatus:'', courseType:'', courseCategory:''})

    const getCourseDetails = useCallback(() => {
        axios.get('http"//localhost:8080/api/course/MGT002').then(res => {
            setCourse(res.data)
            console.log(res.data)
        })
    })

    useEffect(() => {
        getCourseDetails()
    })



    return <div className="container-fluid">
    
    <div className="row">
        <div className="col-md-8"> 
            <h1 style={{color:"darkblue"}}>Select course related to Data Structures & Algorithms to kickstart your learning journey</h1>
        </div>

        <div className="col-md-4">
            <img src="./landing_page_img.png"></img>
        </div>
    </div>

    //Course cards here 

    <div className="card text-left">
        <div className="card-header">
            <h2>Course Title here</h2>
        </div>
        <div className="card-body">
            <div className="row">
                <div className="col-md-10">Course ID</div>
                <div className="col-md-2 "> Technical </div>
            </div>
            <p> Course Description </p>
        </div>
    
    </div> 

    </div>

}



