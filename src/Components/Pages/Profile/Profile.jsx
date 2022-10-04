import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react';
import AuthContext from '../../Context/AuthContext';
import {useEffect} from 'react';
import "./Profile.css"
import {fillProfile} from "../../../api/ProfileOperations";
import toastError from "../../Context/toast";
import AdminProfileView from "./Admin/AdminProfileView";
import StudentProfileView from "./Student/StudentProfileView";
import AssistantProfileView from "./Assistant/AssistantProfileView";
import ProfessorProfileView from "./Professor/ProfessorProfileView";

export default function Profile() {

    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
    const [accountType] = useState(localStorage.getItem("accountType"));
   // const [data, setData] = useState([]);
    const [view, setView] = useState(null);

    useEffect(() => {
        if (auth !== true) {
            navigate("/login");
        }
        fillThePage();
    }, []);

    function fillThePage() {
        let data=[];
        let URL;
        switch (accountType) {
            case  "ROLE_ADMIN" :
                URL = "/api/admin/getOneUserWithID";
                break;
            case "ROLE_STUDENT":
                URL = "/api/student/describeMeStudent";
                break;
            case "ROLE_ASSISTANT":
                URL = "/api/assistant/describeMeAssistant";
                break;
            case "ROLE_PROFESSOR":
                URL = "/api/professor/describeMeProfessor";
                break;
        }

        fillProfile(URL, JSON.parse(localStorage.getItem("user")).id)
            .then((response) => {
                if (response.data.data) {

                    data=response.data.data
                    setProfileView(data)

                } else {
                    toastError("Error Occured")
                }
            });
    }




    function setProfileView(data) {
        const mainFeaturedPost = {
            userID: data.id,
            title: data.firstName +" " + data.lastName,
            description: data.email,
        };
        switch (accountType) {
            case  "ROLE_ADMIN" :
                setView(<AdminProfileView data={data} mainFeaturedPost={mainFeaturedPost}/>)
                break;
            case "ROLE_STUDENT":
                setView(<StudentProfileView data={data} mainFeaturedPost={mainFeaturedPost}/>)
                break;
            case "ROLE_ASSISTANT":
                setView(<AssistantProfileView data={data} mainFeaturedPost={mainFeaturedPost}/>)
                break;
            case "ROLE_PROFESSOR":
                setView(<ProfessorProfileView data={data} mainFeaturedPost={mainFeaturedPost}/>)
                break;
        }
    }



    return (
        <div>
            {view}
        </div>
    )
}
