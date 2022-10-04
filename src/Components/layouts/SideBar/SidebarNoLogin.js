import React from "react";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarContent,
} from "react-pro-sidebar";
import { FaGem, FaList } from "react-icons/fa";
import "./SidebarNoLogin.css"

const headerStyle = {
    padding: "20px",
    textTransform: "uppercase",
    fontWeight: "bold",
    letterSpacing: "1px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "noWrap"
};



export default function SidebarNoLogin(){


return (
<div> <ProSidebar className={"prosidebar-No-login"}>
    <SidebarHeader style={headerStyle}>Please Login</SidebarHeader>
    <SidebarContent>
        <Menu iconShape="circle">
            <MenuItem icon={<FaList />}>Login</MenuItem>
        </Menu>
    </SidebarContent>
</ProSidebar>
</div>
);

}