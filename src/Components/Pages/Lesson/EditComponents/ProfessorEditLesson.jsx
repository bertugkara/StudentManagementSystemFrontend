import React, {useEffect, useState} from "react";
import {getAssistants, handleUpdate, handleUpdateFromProf} from "../../../../api/LessonAndEntityApi";
import toastError, {toastSuccess} from "../../../Context/toast";
import {getAllRooms, getAllTimesWhichIsAvailableWithUserId} from "../../../../api/RoomAndTimeTableApi";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import {Button} from "react-bootstrap";
import Box from "@mui/material/Box";
import "./AdminEditLesson.css"

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};


const Room_URL = "/api/room/getAllRooms";
const time_URL = "/api/timetable/getAllNonUsedTimesOrLessonId";
const UPDATE_URL = "/api/lesson/updateLessonForProfessor";
export default function ProfessorEditLesson(props) {

    const [name, setName] = useState(""); //INITIAL VALUES
    const [description, setDescription] = useState("");

    const [timeTable, setTimeTable] = useState([]) //THESE SET OF STATES IS THE POSSIBILITY OF CHANGESS
    const [rooms, setRooms] = useState([]);

    const [assistantList, SetAssistantList] = useState([]); // Get all assistants and map and choose

    const [tempTime, setTempTime] = useState([]) //VALUES WE SELECT
    const [tempRoom, setTempRoom] = useState([])
    const [tempAssistant, setTempAssistant] = useState([]); // assistants to sent


    useEffect(() => {

        let assistantResponse = getAssistants()
        assistantResponse.then((assistantResponse) => {
            if (assistantResponse.data.success === true) {
                SetAssistantList(assistantResponse.data.data);
            } else {
                toastError("Assistant Fetch Error.")
            }
        })

        getAllRooms(Room_URL).then(response => {
            if (response.data.success === true) {
                setRooms(response.data.data)
            }
        });

        getAllTimesWhichIsAvailableWithUserId(time_URL, props.lesson.id).then(response => {
            if (response.data.success === true) {
                setTimeTable(response.data.data)
            }
        });

        performCopyArrays();
    }, [])

    function performCopyArrays() {
        let AssistantData = [];
        props.lesson.assistantDTOList.map((tempAss) => {
            return AssistantData.push(tempAss.id)
        });
        setTempAssistant([...AssistantData])

        let timeData = [];
        props.lesson.timeTable.map((tempTime) => {
            return timeData.push(tempTime.id)
        });
        setTempTime([...timeData])

        setTempRoom(props.lesson.room.id)
        setDescription(props.lesson.description)
        setName(props.lesson.name)
    }

    const handleChangeAssistant = (event) => {
        const {
            target: {value},
        } = event;
        setTempAssistant(value);
    };

    const handleChangeRoom = (event) => {
        const {
            target: {value},
        } = event;
        setTempRoom(value);
    };

    const handleChangeTime = (event) => {
        const {
            target: {value},
        } = event;
        setTempTime(value);
    };

    function handleSubmitAndControl() {
        handleUpdateFromProf(
            UPDATE_URL,
            props.lesson.id,
            name,
            description,
            tempRoom,
            tempTime,
            tempAssistant
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
        <div className={"professor-edit-lesson"}>
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
            <br></br>

            <div>
                <FormControl sx={{m: 1, width: 300}}>
                    <InputLabel id="demo-multiple-name-label">Times</InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={tempTime}
                        defaultValue={tempTime}
                        onChange={handleChangeTime}
                        input={<OutlinedInput label="Time"/>}
                        MenuProps={MenuProps}
                    >
                        {timeTable.map((time) => (
                            <MenuItem key={time.id} value={time.id}>
                                {time.id + " " + time.days + " " + time.startDate + " " + time.endDate}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div>
                <FormControl sx={{m: 1, width: 300}}>
                    <InputLabel id="demo-multiple-name-label"></InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        defaultValue={tempAssistant}
                        value={tempAssistant}
                        onChange={handleChangeAssistant}
                        input={<OutlinedInput label="Assistants"/>}
                        MenuProps={MenuProps}
                    >
                        {assistantList.map((assistant) => (
                            <MenuItem key={assistant.id} value={assistant.id}>
                                {assistant.firstName + " " + assistant.lastName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <Button
                onClick={() => {
                    handleSubmitAndControl();
                }}
            >
                Submit Changes
            </Button>

        </div>
    );
}