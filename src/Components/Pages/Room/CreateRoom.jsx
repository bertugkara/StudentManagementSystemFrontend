import React, {useContext, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import {createRoom} from "../../../api/RoomAndTimeTableApi";
import toastError, {toastSuccess} from "../../Context/toast";
import "./CreateRoom.css"
import AuthContext from "../../Context/AuthContext";
import {useNavigate} from "react-router-dom";
const label = {inputProps: {'aria-label': 'Checkbox demo'}};

const CREATE_ROOM_URL="/api/room/createRoom";
export default function CreateRoom() {

    const{auth}=useContext(AuthContext)
    const navigate=useNavigate();

    const [isProjectionMachineExist, setIsProjectionMachineExist] = useState(false);
    const [isComputerExists, setIsComputerExists] = useState(false);
    const [isACExists, setIsAC_Exists] = useState(false);
    const [isWindowExist, setIsWindowExist] = useState(false);
    const [HumanCapacity, setHumanCapacity] = useState(0);

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
            createRoom(CREATE_ROOM_URL,
                isProjectionMachineExist,
                isComputerExists,
                isACExists,
                isWindowExist,
                HumanCapacity).then((response) => {
                    if(!response.data.message){
                        toastError(response.data)

                    }
                    else{
                        toastSuccess(response.data.message)

                    }
            });
    }


    return (
        <div>
        <div className={"create-room"}>
            <h4 className={"add-room-text"} >Add Room</h4>
            <label>Is Projection Machine Exists?</label>
            {"     "}
            <input type="checkbox" defaultChecked={isProjectionMachineExist}
                   onChange={() => {
                       setIsProjectionMachineExist(!isProjectionMachineExist)
                   }}/>
            <br></br>
            <label>Is Computer Exists?</label>
            {"     "}
            <input type="checkbox" defaultChecked={isComputerExists}
                   onChange={() => {
                       setIsComputerExists(!isComputerExists)
                   }}/>
            <br></br>
            <label>Is Ac Exists?</label>
            {"     "}
            <input type="checkbox" defaultChecked={isACExists}
                   onChange={() => {
                       setIsAC_Exists(!isACExists)
                   }}/>
            <br></br>
            <label>Is Windows Exists?</label>
            {"     "}
            <input type="checkbox" defaultChecked={isWindowExist}
                   onChange={() => {
                       setIsWindowExist(!isWindowExist)
                   }}/>
            <br></br>
        </div>
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label className={"human-capacity-text"}>Human Capacity:</Form.Label>
                    <Form.Control
                        value={HumanCapacity}
                        onChange={(e) => {
                            setHumanCapacity(e.target.value);
                        }}
                        type="integer"
                        placeholder="Number"
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