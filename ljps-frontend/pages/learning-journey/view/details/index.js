import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";


export default function LearningJourneyDetails(){
    var router = useRouter();
    var learningJourneyID = router.query["learningJourneyID"];

    

    return(
        <div>
            Yo
        </div>
    )
}