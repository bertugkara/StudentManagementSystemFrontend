import axios from "./axios";
import authHeader from "./AuthDetails";
export async function getAllRooms(RoomUrl){
    return await axios
        .get(RoomUrl, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader(),
            },
        });
}

export async function getAllTimesWhichIsAvailableWithUserId(TimeUrl,id){
    return await axios
        .get(TimeUrl, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader(),
            },
            params:{
                id
            }
        });
}

export async function getAllTimesWhichIsAvailable(TimeUrl){
    return await axios
        .get(TimeUrl, {
            headers: {
                "Content-Type": "application/json",
                Authorization: authHeader(),
            },
        });
}

export async function createRoom(CREATE_ROOM_URL,
                                 isProjectionMachineExist,
                                 isComputerExists,
                                 isACExists,
                                 isWindowExist,
                                 HumanCapacity){

    return await axios.post(CREATE_ROOM_URL,JSON.stringify({
            isProjectionMachineExist,
            isComputerExists,
            isACExists,
            isWindowExist,
            HumanCapacity
        }
    ), {
        headers: {
            "Content-Type": "application/json",
            Authorization: authHeader(),
        },
    });
}

export async function createAnnoucement(CREATE_ANNOUNCEMENT_URL,
                                        announcement_text,adminID){

    return await axios.post(CREATE_ANNOUNCEMENT_URL,JSON.stringify({
        announcement_text,adminID
        }
    ), {
        headers: {
            "Content-Type": "application/json",
            Authorization: authHeader(),
        },
    });
}

export async function deleteAnnouncement(URL, id) {
    let config = {
        headers: {
            Authorization: authHeader(),
            "Content-Type": "application/json",
        },
        params: {
            id,
        },
    };
    return await axios
        .post(URL, null, {
            params: {
                id
            },
            headers: {'Authorization': authHeader()}
        });
}

