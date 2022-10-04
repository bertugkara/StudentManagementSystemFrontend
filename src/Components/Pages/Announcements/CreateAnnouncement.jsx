import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../Context/AuthContext";
import {useNavigate} from "react-router-dom";
import toastError, {toastSuccess} from "../../Context/toast";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import "./CreateAnnouncement.css"
import {createAnnoucement, createRoom} from "../../../api/RoomAndTimeTableApi";

const CREATE_ANNOUNCEMENT_URL="/api/announcement/createAnnouncement"
export default function CreateAnnouncement(){

    const{auth}=useContext(AuthContext)
    const navigate=useNavigate();

    const [announcement,setAnnouncement]=useState("");
    const [adminId]=useState(JSON.parse(localStorage.getItem("user")).id)

    useEffect(()=>{
        if(auth!==true){
            navigate("/login")
        }
        if(localStorage.getItem("accountType")!=="ROLE_ADMIN"){
            navigate("/")
            toastError("You are Not Admin")
        }
    },[])

    function handleSubmit(){
        createAnnoucement(CREATE_ANNOUNCEMENT_URL,
            announcement,adminId).then((response) => {
            if(!response.data.message){
                toastError(response.data)
            }
            else{
                toastSuccess(response.data.message)
                setAnnouncement("")
            }
        });
    }

    return (
        <div className={"create-announcement"}>
            <h3 className={"create-announcement-text"}>Create Announcement</h3>
            <br></br>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Annoucement</Form.Label>
                    <Form.Control
                        value={announcement}
                        onChange={(e) => {
                            setAnnouncement(e.target.value);
                        }}
                        type="text"
                        placeholder="Announcement"
                    />
                </Form.Group>
            </Form>
            <div className={"submit-button"}>
                <Button  onClick={()=>{
                    handleSubmit()
                }}> Submit </Button>
            </div>

        </div>
    )
}