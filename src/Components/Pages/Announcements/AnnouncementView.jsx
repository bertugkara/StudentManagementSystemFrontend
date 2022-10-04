import Container from "@mui/material/Container";
import React from "react";
import "../Profile/Profile.css"
import {useEffect} from "react";
import AnnouncementComponentView from "./AnnouncementComponentView";
import {useState} from "react";
import {getAllAnnouncements} from "../../../api/ProfileOperations";
import toastError from "../../Context/toast";

const Announcements_URL="/api/announcement/getAllAnnouncements"
export default function AnnouncementView(props) {

    const [announcements,setAnnouncements]=useState([]);

    useEffect(() => {
        getAnnouncements();
    },[]);

    function getAnnouncements(){
    getAllAnnouncements(Announcements_URL)
        .then( (response) => {
            if(response.data.data) {
                setAnnouncements(response.data.data)
            }
            else {
                toastError("Error Occured");
            }
        });
    }

    return (
        <div>
            <div className={"lesson-page"}>
                <Container maxWidth="bg">
                <label>Announcements </label>

                <AnnouncementComponentView announcements={announcements}/>

                </Container>
            </div>

        </div>
    )
}