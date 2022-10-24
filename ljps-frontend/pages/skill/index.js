import React, { useCallback, useEffect, useState } from "react"
import axios from "axios"
import CreateSkillButton from '../../components/SkillsComponent/createskillbutton'
import DeleteSkillButton from '../../components/SkillsComponent/deleteskillbutton'
import SkillModal from "../../components/SkillsComponent/SkillModal"

export default function SkillsPage() {
    const [skills, setSkills] = useState([])
    const [selectedSkill, setSelectedSkill] = useState({ skillName: '', skillDescription: '', skillID: null })
    const [active, setActive] = useState(true)

    useEffect(() => {
        onSkillsUpdate()
    }, [active])

    const onSkillsUpdate = useCallback(() => {
        if (active)
            axios.get('http://localhost:8080/api/skills').then(res => {
                setSkills(res.data.data)
            })
        else {
            axios.get('http://localhost:8080/api/skills/?active=false').then(res => {
                setSkills(res.data.data)
            })
        }
    }, [active])

    const parseSkillObj = useCallback((skillObj) => {
        setSelectedSkill(skillObj)
    })

    const resetSelectedSkill = useCallback(() => {
        setSelectedSkill({ skillName: '', skillDescription: '', skillID: '' })
    })

    return <div className="container-fluid">
        <SkillModal selectedSkill={selectedSkill} onSkillsUpdate={onSkillsUpdate} />
        <div className="ml-auto my-2">
            <div className="row">
                <div className="col-6">
                    <ul className="nav">
                        <li className="nav-item nav-pills">
                            <button className="nav-link" onClick={() => setActive(true)}>Active</button>
                        </li>
                        <li className="nav-item nav-pills">
                            <button className="nav-link" onClick={() => setActive(false)}>Inactive</button>
                        </li>
                    </ul>
                </div>
                <CreateSkillButton onSkillsUpdate={onSkillsUpdate} resetSelectedSkill={resetSelectedSkill} />
            </div>
        </div>
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

                    const skillID = skill.Skill_ID
                    const skillName = skill.Skill_Name
                    const skillDescription = skill.Skill_Description
                    return <tr key={index}>
                        <th scope="row">{skillID}</th>
                        <td>{skillName}</td>
                        <td>{skillDescription}</td>
                        <td>
                            <button type="button" className="btn btn-light mx-1" data-bs-toggle="modal" data-bs-target="#skill-modal"
                                onClick={() => parseSkillObj({ skillID, skillName, skillDescription })}>
                                Edit
                            </button>
                            { active && <DeleteSkillButton skillName={skillName} skillId={skillID} onSkillsUpdate={onSkillsUpdate} />}
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