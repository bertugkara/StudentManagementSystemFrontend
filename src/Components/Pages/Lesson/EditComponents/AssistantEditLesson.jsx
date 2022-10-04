import React, {useEffect, useState} from "react";
import {getAssistants, handleUpdateFromProf} from "../../../../api/LessonAndEntityApi";
import toastError, {toastSuccess} from "../../../Context/toast";
import {getAllRooms, getAllTimesWhichIsAvailableWithUserId} from "../../../../api/RoomAndTimeTableApi";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Button} from "react-bootstrap";
import "./AdminEditLesson.css"

const Room_URL = "/api/room/getAllRooms";
const UpdateFromAssistant_URL = "/api/lesson/updateLessonForAssistant"
export default function AssistantEditLesson(props) {
    const [name, setName] = useState(""); //INITIAL VALUES
    const [description, setDescription] = useState("");
    const [rooms, setRooms] = useState([]);
    const [tempRoom, setTempRoom] = useState([])

    useEffect(() => {

        getAllRooms(Room_URL).then(response => {
            if (response.data.success === true) {
                setRooms(response.data.data)
            }
        });

        performCopyArrays();
    }, [])

    function performCopyArrays() {
        setTempRoom(props.lesson.room.id)
        setDescription(props.lesson.description)
        setName(props.lesson.name)
    }

    const handleChangeRoom = (event) => {
        const {
            target: {value},
        } = event;
        setTempRoom(value);
    };


    function handleSubmitAndControl() {
        handleUpdateFromProf(
            UpdateFromAssistant_URL,
            props.lesson.id,
            name,
            description,
            tempRoom,
        ).then(response => {
            if (response.data.success === true) {
                toastSuccess("Success, now Please Refresh The Page")
                console.log(response.data.data)
            } else {
                toastError(response.data.message)
            }
        })
    }

    return (
        <div className={"assistantEditLesson"}>

            <div>
                <Box
                    component="form"
                    sx={{
                        "& .MuiTextField-root": {m: 1, width: "25ch"},
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <h3>Please Edit The Boxes You want to Edit</h3>
                        <TextField
                            required
                            id="outlined-required"
                            label="Name Of The Class"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <br></br>
                        <TextField
                            required
                            id="outlined-multiline-flexible"
                            label="Description Of The Class"
                            multiline
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </Box>
            </div>
            <br></br>
            <div>
                <FormControl sx={{m: 1, width: 300}}>
                    <InputLabel id="demo-simple-select-label">Room</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        defaultValue={tempRoom}
                        value={tempRoom}
                        onChange={handleChangeRoom}
                        label="Room"
                    >
                        {rooms.map((room) => (
                            <MenuItem key={room.Id} value={room.Id}>
                                {"Room Id:" + room.Id + " " + "Room Capacity:" + room.HumanCapacity}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <Button onClick={() => {
                handleSubmitAndControl()
            }}>Submit Changes</Button>
        </div>)
}