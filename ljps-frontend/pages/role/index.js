import React, { useCallback, useEffect, useState } from "react"
import axios from "axios"
import CreateRoleButton from './createrolebutton'

export default function JobRolesPage() {
    const [roles, setRoles] = useState([])

    useEffect(() => {
        onRolesUpdate()
    }, [])

    const onRolesUpdate = useCallback(() => {
        axios.get('http://localhost:8080/api/roles').then(res => {
            setRoles(res.data.data)
        })
    }, [])

    return <div className="container-fluid">
        <div className="ml-auto my-2"><CreateRoleButton onRolesUpdate={onRolesUpdate} /></div>
        <table className="table table-borderless">
            <thead>
                <tr className=" rounded">
                    <th scope="col" style={{ ...styles.tableHeaderBg, ...styles.tableBorderRadiusLeft }}>Role ID</th>
                    <th scope="col" style={{ ...styles.tableHeaderBg }}>Role Name</th>
                    <th scope="col" style={{ ...styles.tableHeaderBg }}>Role Description</th>
                    <th scope="col" style={{ ...styles.tableHeaderBg }}>Role Department</th>
                    <th scope="col" style={{ ...styles.tableHeaderBg, ...styles.tableBorderRadiusRight }}></th>
                </tr>
            </thead>
            <tbody>
                {roles?.map((role, index) => {
                    return <tr key={index}>
                        <th scope="row">{role.Job_Role_ID}</th>
                        <td>{role.Job_Role_Name}</td>
                        <td>{role.Job_Role_Description}</td>
                        <td>{role.Job_Department}</td>
                        <td>
                            <button className="btn btn-light mx-1">Edit</button>
                            <button className="btn btn-light mx-1">Delete</button>
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
    </div>
}

const styles = {
    tableHeaderBg: {
        background: "#F0F0F0"
    },
    tableBorderRadiusLeft: {
        borderTopLeftRadius: "10px",
        borderBottomLeftRadius: "10px"
    },
    tableBorderRadiusRight: {
        borderTopRightRadius: "10px",
        borderBottomRightRadius: "10px"
    }
}