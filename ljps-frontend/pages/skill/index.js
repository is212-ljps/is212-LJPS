import React, { useCallback, useEffect, useState } from "react"
import axios from "axios"
import CreateSkillButton from "./createskillbutton"
import DeleteSkillButton from "./deleteskillbutton"

export default function skillsPage() {
    const [skills, setSkills] = useState([])

    useEffect(() => {
        onSkillsUpdate()
    }, [])

    const onSkillsUpdate = useCallback(() => {
        axios.get('http://localhost:8080/api/skills').then(res => {
            setSkills(res.data.data)
        })
    }, [])

    return <div className="container-fluid">
        <div className="ml-auto my-2"><CreateSkillButton onSkillsUpdate={onSkillsUpdate} /></div>
        <table className="table table-borderless">
            <thead>
                <tr className=" rounded">
                    <th scope="col" style={{ ...styles.tableHeaderBg, ...styles.tableBorderRadiusLeft }}>Skill ID</th>
                    <th scope="col" style={{ ...styles.tableHeaderBg }}>Skill Name</th>
                    <th scope="col" style={{ ...styles.tableHeaderBg }}>Skill Description</th>
                    <th scope="col" style={{ ...styles.tableHeaderBg, ...styles.tableBorderRadiusRight }}></th>
                </tr>
            </thead>
            <tbody>
                {skills?.map((skill, index) => {
                    console.log(skill.Skill_Name)
                    return <tr key={index}>
                        <th scope="row">{skill.Skill_ID}</th>
                        <td>{skill.Skill_Name}</td>
                        <td>{skill.Skill_Description}</td>
                        <td>
                            <button className="btn btn-light mx-1">Edit</button>
                            <DeleteSkillButton skillName={skill.Skill_Name} onSkillsUpdate={onSkillsUpdate} />
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