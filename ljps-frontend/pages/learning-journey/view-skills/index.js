import React from "react"
import { useRouter } from "next/router";


export default function ViewSkills(){
    var router = useRouter();
    var role_id = router.query["selectedRole"];

    

    return(
        <div>
            <h1> {role_id} </h1>
        </div>
    )
}