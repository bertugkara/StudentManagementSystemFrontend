import Container from "@mui/material/Container";
import React from "react";
import "../Profile.css"
import AdminMainFeaturedProfilePost from "./AdminMainFeaturedProfilePost";
import {useEffect} from "react";
import {getAllAnnouncements} from "../../../../api/ProfileOperations";
import toastError, {toastSuccess} from "../../../Context/toast";
import AdminProfileComponentView from "./AdminProfileComponentView";
import {useState} from "react";
import {deleteAnnouncement} from "../../../../api/RoomAndTimeTableApi";

const Announcements_URL="/api/announcement/getAllAnnouncements"
const deleteAnnouncement_URL="/api/announcement/deleteAnnouncement"

export default function AdminProfileView(props) {

    const {data, mainFeaturedPost} = props;
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

    function handleDeleteOperation(AnnouncementID){
        deleteAnnouncement(deleteAnnouncement_URL,AnnouncementID).then((response) => {
            toastSuccess(response.data.message);
        })
    }
    return (
        <div>
            <div className={"lesson-page"}>
                <AdminMainFeaturedProfilePost post={mainFeaturedPost}/>
                <Container maxWidth="bg">
                <label>Announcements You have Created</label>

                <AdminProfileComponentView announcements={announcements} handleDeleteOperation={handleDeleteOperation}/>

                </Container>
            </div>

        </div>
    )
}