import React, { useCallback, useEffect, useState } from "react"
import axios from "axios"
import CreateRoleButton from '../../components/RolesComponent/createrolebutton'
import DeleteRoleButton from '../../components/RolesComponent/deleterolebutton'
import RoleModal from "../../components/RolesComponent/RoleModal"

export default function JobRolesPage() {
    const [roles, setRoles] = useState([])
    const [selectedRole, setSelectedRole] = useState({ roleName: '', roleDescription: '', roleDepartment: '', roleID: null })

    useEffect(() => {
        onRolesUpdate()
    }, [])

    const onRolesUpdate = useCallback(() => {
        axios.get('http://localhost:8080/api/roles').then(res => {
            setRoles(res.data.data)
        })
    }, [])

    const resetSelectedRole = useCallback(() => {
        setSelectedRole({ roleName: '', roleDescription: '', roleID: '' })
    })

    return <div className="container-fluid">
        <RoleModal selectedRole={selectedRole} onRolesUpdate={onRolesUpdate} />
        <div className="ml-auto my-2"><CreateRoleButton onRolesUpdate={onRolesUpdate} resetSelectedRole={resetSelectedRole} /></div>
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
                    const roleID = role.Job_Role_ID
                    const roleName = role.Job_Role_Name
                    const roleDescription = role.Job_Role_Description
                    const roleDepartment = role.Job_Department
                    return <tr key={index}>
                        <th scope="row">{roleID}</th>
                        <td>{roleName}</td>
                        <td>{roleDescription}</td>
                        <td>{roleDepartment}</td>
                        <td>
                            <button type="button" className="btn btn-light mx-1" data-bs-toggle="modal" data-bs-target="#role-modal"
                                onClick={() => setSelectedRole({ roleID, roleName, roleDescription, roleDepartment })}>
                                Edit
                            </button>
                            <DeleteRoleButton roleName={roleName} roleId={roleID} onRolesUpdate={onRolesUpdate} />
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