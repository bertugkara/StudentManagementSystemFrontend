import React from "react";
import {useState, useContext} from "react";
import AuthContext from "../../Context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import AdminRegister from "./RegisterWithType/AdminRegister";
import StudentRegister from "./RegisterWithType/StudentRegister";
import ProfessorRegister from "./RegisterWithType/ProfessorRegister";
import userDetails from "../../Context/createUserDetails";
import {toastSuccess} from "../../Context/toast";
import AssistantRegister from "./RegisterWithType/AssistantRegister";
import toastError from "../../Context/toast";
import './register.css'
import generatePassword from "./GenerateRandomPassword";
import {registerUser} from "../../../api/AuthAndRegisterApi";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Register() {
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState();
    const [registerLink, setRegisterLink] = useState(``);
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [registerType, setRegisterType] = useState("ROLE_STUDENT");
    const [role, setRole] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    const user_data = {
        email,
        setEmail,
        password,
        setPassword,
        registerType,
        setRegisterLink,
        setRegisterType,
        role,
        setRole,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        handleSubmit,
        username,
        setUsername,
    };


    function setAllStatesToDefaultAndNavigate() {
        setEmail("");
        setFirstName("");
        setLastName("");
        setPassword(generatePassword());
        setUsername("");
        //setRole([]);
        navigate("/createUser");
    }


    useEffect(() => {
        if (auth !== true) {
            navigate("/login")
        }
        if (localStorage.getItem('accountType') !== "ROLE_ADMIN") {
            toastError("You have to be admin to access this page!")
            navigate("/")
        }
    }, []);


     function handleSubmit() {
        let firstname = firstName;
        let lastname = lastName;
        let response = registerUser(registerLink, email, username, firstname, lastname, password, role);
        response.then((response)=>{
            if (response.data.success === true) {
                setSuccess(true);
                toastSuccess("Success Register");
                setAllStatesToDefaultAndNavigate();
            } else {
                setSuccess(false);
                setErrMsg("Error About Registering");
                toastError(errMsg);
                setAllStatesToDefaultAndNavigate();
            }
        })


    }
    const handleChange = (event) => {
        setRegisterType(event.target.value);
    };

    let register;

    switch (registerType) {
        case "ROLE_STUDENT":
            register = <StudentRegister/>
            break;
        case "ROLE_PROFESSOR":
            register = <ProfessorRegister/>
            break;
        case "ROLE_ASSISTANT":
            register = <AssistantRegister/>
            break;
        case "ROLE_ADMIN":
            register = <AdminRegister/>
            break;
        default:
            register = <StudentRegister/>
    }

    // <br></br>
    // <div className="RadioButtons" onChange={(e) => setRegisterType(e.target.value)}>
    //     <input type="radio" value="ROLE_STUDENT" name="types" defaultChecked/> Student
    //     <input type="radio" value="ROLE_PROFESSOR" name="types"/> Teacher
    //     <input type="radio" value="ROLE_ASSISTANT" name="types"/> Assistant
    //     <input type="radio" value="ROLE_ADMIN" name="types"/> Admin
    // </div>
    return (
        <div>

            <div className="register-div">
                What Type you want to Register:


            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={registerType}
                        label="Types"
                        onChange={handleChange}
                    >
                        <MenuItem value="ROLE_STUDENT">Student</MenuItem>
                        <MenuItem value="ROLE_PROFESSOR">Professor</MenuItem>
                        <MenuItem value="ROLE_ASSISTANT">Assistant</MenuItem>
                        <MenuItem value="ROLE_ADMIN">Admin</MenuItem>

                    </Select>
                </FormControl>
            </Box>
            </div>
            <div className="register">
                <userDetails.Provider value={user_data}>
                    {register}
                </userDetails.Provider>
            </div>

        </div>
    );
}
