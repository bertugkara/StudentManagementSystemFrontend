import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../../../Context/AuthContext";
import { useState } from "react";

import toastError from "../../../Context/toast";
import AdminMainPage from "./AdminMainPage";
import ProfessorMainPage from "./ProfessorMainPage";
import StudentMainPage from "./StudentMainPage";
import AssistantMainPage from "./AssistantMainPage";
import {getAllLessons} from "../../../../api/LessonAndEntityApi";


const GET_LESSONS_URL = "/api/lesson/getAll";
export default function MainPage() {

  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [accountType] = useState(localStorage.getItem("accountType"));
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    if (auth !== true) {
      navigate("/login");
    }
    else {
      getLessons();
    }
  }, []);

  function getLessons() {
    let response= getAllLessons(GET_LESSONS_URL)
    response.then((response)=>{
      if (response.data.success===true){
        setLessons(response.data.data);
      }
      else{
        toastError("Lessons Fetching Error")
      }
    })
    
  }
  let type;
  switch (accountType) {
    case "ROLE_ADMIN":
      type = <AdminMainPage lessons={lessons} />;
      break;

    case "ROLE_PROFESSOR":
      type = <ProfessorMainPage lessons={lessons} />;
      break;

    case "ROLE_STUDENT":
      type = <StudentMainPage lessons={lessons} />;
      break;

    case "ROLE_ASSISTANT":
      type = <AssistantMainPage lessons={lessons} />;
      break;

    default:
      type = <StudentMainPage lessons={lessons} />;
      break;
  }
  return (

  <div className={"main"}>{type}</div>
)
}
