import React, {useContext, useEffect, useState} from "react";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarContent,
} from "react-pro-sidebar";
import {FaGem, FaList} from "react-icons/fa";
import "./Sidebar.css"
import {NavLink, useNavigate} from "react-router-dom";
import AuthContext from "../../Context/AuthContext";


const headerStyle = {
    padding: "20px",
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: "1px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "noWrap"
};

export default function Sidebar() {

    const [accountType, setAccountType] = useState("");
    const {handleLogout}=useContext(AuthContext);
    const navigate=useNavigate();

    let buttons;
    if (accountType === "ROLE_ASSISTANT" || accountType === "ROLE_PROFESSOR") {
        buttons = [<MenuItem key={"9"} onClick={()=> {handleNavigate("/profile")}} icon={<FaGem/>}>My Classes</MenuItem>,
            ]
    }
    if (accountType === "ROLE_STUDENT") {
        buttons = [<MenuItem key={"7"} onClick={()=> {handleNavigate("/profile")}} icon={<FaGem/>}>My Classes</MenuItem>,
            <MenuItem key={"8"} onClick={()=> {handleNavigate("/")}}  icon={<FaList/>}>Check My Exams</MenuItem>,
            <MenuItem key={"2"} onClick={()=> {handleNavigate("/profile")}} icon={<FaList/>}> Homeworks </MenuItem>
        ]
    }
    if (accountType === "ROLE_ADMIN") {
        buttons = [<MenuItem key={"5"} onClick={()=> {handleNavigate("/createRoom")}} icon={<FaList/>}>Create Room</MenuItem>,
            <MenuItem key={"6"} onClick={()=> {handleNavigate("/createAnnouncement")}}  icon={<FaList/>}>Create Announcement</MenuItem>]
    }

    useEffect(() => {
        setAccountType(localStorage.getItem("accountType"));
    },[])

    function handleNavigate(url){
        navigate(url);
    }

    return (
        <ProSidebar className={"prosidebar"}>
            <SidebarHeader style={headerStyle}>My Profile Details</SidebarHeader>
            <SidebarContent>
                <Menu iconShape="circle">
                    <MenuItem key={"4"} onClick={()=> {handleNavigate("/profile")}} icon={<FaList/>}>Profile</MenuItem>
                    <MenuItem key={"15"} onClick={()=> {handleNavigate("/announcements")}} icon={<FaList/>}>Announcements</MenuItem>
                    <MenuItem key={"1"} onClick={()=> {handleNavigate("/")}} icon={<FaList/>}> Home </MenuItem>
                    {buttons}
                </Menu>

            </SidebarContent>
        </ProSidebar>
    );

}