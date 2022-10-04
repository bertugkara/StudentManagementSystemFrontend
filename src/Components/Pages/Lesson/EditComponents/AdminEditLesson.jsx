import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useState, useEffect} from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {

    getAssistants,
    getStudents,
    handleUpdate,
    getProfessorWhichIsNotIncludedInToTheLesson,
} from "../../../../api/LessonAndEntityApi";
import {Button} from "react-bootstrap";
import {toastSuccess} from "../../../Context/toast";
import toastError from "../../../Context/toast";
import {
    getAllRooms,
    getAllTimesWhichIsAvailable,
    getAllTimesWhichIsAvailableWithUserId
} from "../../../../api/RoomAndTimeTableApi";
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
const UPDATE_URL = "/api/lesson/updateLesson";
export default function AdminEditLesson(props) {

    const [name, setName] = useState(""); //INITIAL VALUES
    const [description, setDescription] = useState("");
    const [lessonType, SetLessonType] = useState("");
    const [lessonCode, setLessonCode] = useState("")

    const [timeTable, setTimeTable] = useState([]) //THESE SET OF STATES IS THE POSSIBILITY OF CHANGESS
    const [rooms, setRooms] = useState([]);
    const [instructorList, setInstructorList] = useState([]); // Get all proffesor and choose
    const [assistantList, SetAssistantList] = useState([]); // Get all assistants and map and choose
    const [studentList, setStudentList] = useState([]); // Get all students and map and choose

    const [tempTime, setTempTime] = useState([]) //VALUES WE SELECT
    const [tempRoom, setTempRoom] = useState([])
    const [tempProfessor, setTempProfessor] = useState([]); // Instructor to sent
    const [tempAssistant, setTempAssistant] = useState([]); // assistants to sent
    const [tempStudent, setTempStudent] = useState([]); // students to sent

    useEffect(() => {
        let profResponse = getProfessorWhichIsNotIncludedInToTheLesson(props.lesson.id)
        profResponse.then((profResponse) => {
            if (profResponse.data.success === true) {
                setInstructorList(profResponse.data.data);
            } else {
                toastError("Professor Fetch Error.");
            }
        })

        let assistantResponse = getAssistants()
        assistantResponse.then((assistantResponse) => {
            if (assistantResponse.data.success === true) {
                SetAssistantList(assistantResponse.data.data);
            } else {
                toastError("Assistant Fetch Error.")
            }
        })


        let studentResponse = getStudents()
        studentResponse.then((tempStudent) => {
            if (tempStudent.data.success === true) {
                setStudentList(tempStudent.data.data)
            } else {
                toastError("Student Fetch Error!")
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

    }, []);

    function performCopyArrays() {

        let StudentData = [];
        props.lesson.studentDTOList.map((temp) => {
            return StudentData.push(temp.id)
        });
        setTempStudent([...StudentData]);

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
        setTempProfessor(props.lesson.professorDTO.id);

        setDescription(props.lesson.description)
        setName(props.lesson.name)
        SetLessonType(props.lesson.lessonType)
        setLessonCode(props.lesson.lessonCode)

    }

    const handleChangeProfessor = (event) => {
        const {
            target: {value},
        } = event;
        setTempProfessor(value);
    };
    const handleChangeAssistant = (event) => {
        const {
            target: {value},
        } = event;
        setTempAssistant(value);
    };

    const handleChangeStudent = (event) => {
        const {
            target: {value},
        } = event;
        setTempStudent(value);
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
        const roomID = tempRoom;
        handleUpdate(
            UPDATE_URL,
            props.lesson.id,
            name,
            description,
            lessonType,
            lessonCode,
            roomID,
            tempTime,
            tempProfessor,
            tempAssistant,
            tempStudent
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
        <div className={"adminEditLesson"}>
            <div>
                <Box className={"edit-box"}
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
                        <br></br>
                        <TextField
                            required
                            id="outlined-multiline-flexible"
                            label="Lesson Code"
                            multiline
                            value={lessonCode}
                            onChange={(e) => setLessonCode(e.target.value)}
                        />
                    </div>
                </Box>
            </div>
            <br></br>
            <div
                className="lessonType-div"
                onChange={(e) => SetLessonType(e.target.value)}
            >
                Lesson Type: <br></br>
                <input type="radio" value="TYPE_ELECTIVE" name="typeLesson"/>{" "}
                Elective
                <input type="radio" value="TYPE_COMPULSORY" name="typeLesson"/>{" "}
                Compulsory
            </div>

            <br></br>


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
            <br></br>
            <span>
        Current Professor is :{" "}
                {props.lesson.professorDTO.firstName +
                    " " +
                    props.lesson.professorDTO.lastName}
      </span>
            <br></br>
            <FormControl sx={{m: 1, width: 300}}>
                <InputLabel id="demo-simple-select-label">Professor</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={tempProfessor}
                    onChange={handleChangeProfessor}
                    label="Professor"
                >
                    {instructorList.map((prof) => (
                        <MenuItem key={prof.id} value={prof.id}>
                            {prof.firstName + " " + prof.lastName}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>


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
                                {  time.days + " " + time.startDate + "-" + time.endDate}
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

            <div>
                <FormControl sx={{m: 1, width: 300}}>
                    <InputLabel id="demo-multiple-name-label"></InputLabel>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        defaultValue={tempStudent}
                        value={tempStudent}
                        onChange={handleChangeStudent}
                        input={<OutlinedInput label="Students"/>}
                        MenuProps={MenuProps}
                    >
                        {studentList.map((student) => (
                            <MenuItem key={student.id} value={student.id}>
                                {student.firstName + " " + student.lastName}
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
