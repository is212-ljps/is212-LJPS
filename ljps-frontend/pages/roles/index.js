import React, { useCallback, useEffect, useState } from "react"
import axios from "axios"
import CreateRoleButton from '../../components/RolesComponent/createrolebutton'
import DeleteRoleButton from '../../components/RolesComponent/deleterolebutton'
import RoleModal from "../../components/RolesComponent/RoleModal"

export default function JobRolesPage() {
    const [roles, setRoles] = useState([])
    const [selectedRole, setSelectedRole] = useState({ roleName: '', roleDescription: '', roleDepartment: '', roleID: null })
    const [active, setActive] = useState(true)

    useEffect(() => {
        onRolesUpdate()
    }, [active])

    const onRolesUpdate = useCallback(() => {
        if (active) {
            axios.get('http://localhost:8080/api/roles').then(res => {
                setRoles(res.data.data)
            })
        }
        else {
            axios.get('http://localhost:8080/api/roles/?active=false').then(res => {
                setRoles(res.data.data)
            })
        }
    }, [active])

    const resetSelectedRole = useCallback(() => {
        setSelectedRole({ roleName: '', roleDescription: '', roleID: '' })
    })

    return <div className="container-fluid">
        <RoleModal selectedRole={selectedRole} onRolesUpdate={onRolesUpdate} resetSelectedRole={resetSelectedRole} />
        <div className="ml-auto my-2">
            <div className="row">
                <div className="col-6">
                    <ul className="nav">
                        <li className="nav-item nav-pills">
                            <button className={active?"btn btn-primary":"btn"} onClick={() => setActive(true)}>Active</button>
                        </li>
                        <li className="nav-item nav-pills">
                            <button className={active?"btn":"btn btn-primary"} onClick={() => setActive(false)}>Inactive</button>
                        </li>
                    </ul>
                </div>
                <CreateRoleButton onRolesUpdate={onRolesUpdate} resetSelectedRole={resetSelectedRole} />
            </div>
        </div>
            
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
                                    onClick={() => { console.log("helo"); setSelectedRole({ roleID, roleName, roleDescription, roleDepartment }) }}>
                                    Edit
                                </button>
                                { active && <DeleteRoleButton roleName={roleName} roleId={roleID} onRolesUpdate={onRolesUpdate} />}
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