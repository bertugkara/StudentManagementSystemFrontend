import axios from "./axios";
import authHeader from "./AuthDetails";

export async function fillProfile(URL,userID){
    return await axios
        .get(URL, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader(),
            },
            params:{
                userID
            }
        });
}

export async function getAllAnnouncements(URL){
    return await axios
        .get(URL, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader(),
            }
        });
}



