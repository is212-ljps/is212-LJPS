import React, {
    useState,
    useEffect,
    useRef
} from "react";
import axios from "axios";
import {
    useRouter
} from "next/router";
import Image from "next/image";



export default function ViewLearningJourneys() {
    var router = useRouter();
    const [learningJourneys, setLearningJourneys] = useState([]);
                    console.log(learningJourneys)
    useEffect(() => {
        const url = `http://localhost:8080/api/learning-journey`;
        const axiosFn = axios.get;
        axiosFn(url)
            .then(function (response) {
                if (response.data.success) {
                    setLearningJourneys(response.data.data);

                }
            })
            .catch(function (error) {
                console.log(error)
            });

    },[])

     return <div>
            {learningJourneys.map((item, index) => {
                const { Learning_Journey_Name } = item
                return <div key={index}>
                    <p>{Learning_Journey_Name}</p>
 
                </div>
            })}
        </div>
    

}