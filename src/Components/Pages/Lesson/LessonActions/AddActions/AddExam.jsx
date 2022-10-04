import React, {useEffect, useState} from "react";
import toastError, {toastSuccess} from "../../../../Context/toast";
import {getAllRooms} from "../../../../../api/RoomAndTimeTableApi";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./AddExam.css"
import Button from "@mui/material/Button";
import {createExam} from "../../../../../api/StudentOperationsApi";
import CreatedExamView from "./CreatedExamView";

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
const CREATE_EXAM_URL = "/api/exam/createExam"
export default function AddExam(props) {

    const {lesson} = props;
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false)
    const [response, setResponse] = useState({})

    const [lessonId] = useState(lesson.id)
    const [creator] = useState(JSON.parse(localStorage.getItem("user")).id)

    const [selectedStartDay, setSelectedStartDay] = useState({day: 1, month: 9, year: 2022});
    const [startTime, setStartTime] = useState("");

    const [name, setName] = useState(lesson.lessonCode + " " + "Midterm")
    const [examDetailsAndTips, setExamDetailsAndTips] = useState("")
    const [rooms, setRooms] = useState([])

    const [tempRoom, setTempRoom] = useState({})

    useEffect(() => {
        if (localStorage.getItem("accountType") === "ROLE_STUDENT") {
            navigate("/profile")
            toastError("Only Admins and Teacher can reach this page.")
        }

        let date = new Date();
        setSelectedStartDay({day: date.getDate(), month: date.getMonth() + 1, year: date.getFullYear()})

        getAllRooms(Room_URL).then(response => {
            if (response.data.success === true) {
                setRooms(response.data.data)
            }
        });

    }, [])

    function handleSubmit() {
        let LocalDateTime;
        if (selectedStartDay.month <= 9) {
            LocalDateTime = selectedStartDay.year + "-" + "0" + selectedStartDay.month + "-" + selectedStartDay.day + "T" + startTime + ":00";
        } else {
            LocalDateTime = selectedStartDay.year + "-" + selectedStartDay.month + "-" + selectedStartDay.day + "T" + startTime + ":00";

        }
        createExam(CREATE_EXAM_URL,
            name,
            LocalDateTime.toString(),
            examDetailsAndTips,
            tempRoom,
            creator,
            lessonId
        ).then((response) => {
            if (response.data.success === true) {
                toastSuccess("Succesfully Created");
                setExamDetailsAndTips("")
                setTempRoom({})

                setResponse(response.data.data);
                setSuccess(true);
            } else {
                toastError("Something wrong, Could not created!!")
            }
        });

    }


    const handleChangeRoom = (event) => {
        const {
            target: {value},
        } = event;
        setTempRoom(value);
    };
    return (
        <div>

            <div className={"addExam-div"}>
                <Box>
                    <h3 className={"addExamDetails"}> Add Exam </h3>
                    <label> Please Enter Description About Exam:</label>
                    <br></br>

                    <TextField
                        required
                        id="outlined-required"
                        label="Description"
                        value={examDetailsAndTips}
                        onChange={(e) => setExamDetailsAndTips(e.target.value)}
                    />
                    <br></br>
                    <label> Exam Start Time: </label>
                    <br></br>

                    <input type="time" id="startTime" name="startTime" onChange={(e) => {
                        setStartTime(e.target.value)
                    }}/>

                    <br/>

                    <label> Exam Day: </label>
                    <br/>
                    <DatePicker
                        value={selectedStartDay}
                        onChange={setSelectedStartDay}
                        inputPlaceholder="Select a Start Day"
                        shouldHighlightWeekends
                    />

                    <br/>
                    <label> Please Choose The Exam Name </label>
                    <br/>
                    <TextField
                        required
                        id="outlined-required"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <br/>
                    <label> Choose Room: </label>
                    <br></br>

                    <FormControl sx={{width: 300}}>
                        <InputLabel id="demo-simple-select-label"></InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={tempRoom}
                            value={tempRoom}
                            onChange={handleChangeRoom}
                        >
                            {rooms.map((room) => (
                                <MenuItem key={room.Id} value={room.Id}>
                                    {"Room Id:" + room.Id + " " + "Room Capacity:" + room.HumanCapacity}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <br/>


                    <br></br>
                    <div className={"Submit--Button"}>
                        <Button onClick={() => {
                            handleSubmit()
                        }}>
                            Submit
                        </Button>
                    </div>
                </Box>
            </div>
            {
                success === true ? <CreatedExamView exam={response}/> : <div></div>
            }
        </div>
    )
}