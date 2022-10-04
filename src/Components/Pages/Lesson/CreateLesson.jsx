import React, {useContext} from "react";
import {Container} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {useState, useEffect} from "react";
import {
    getAssistants,
    getProfessor,
    getStudents,
    handleSubmit,
} from "../../../api/LessonAndEntityApi.js";
import {toastSuccess} from "../../Context/toast";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import toastError from '../../Context/toast';
import {getAllRooms, getAllTimesWhichIsAvailable} from "../../../api/RoomAndTimeTableApi";
import AuthContext from "../../Context/AuthContext";
import {useNavigate} from "react-router-dom";

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

const CREATE_URL = "/api/lesson/createLesson";
const Room_URL = "/api/room/getAllRooms";
const times_URL = "/api/timetable/getAllNonUsedTimes";

export default function CreateLesson() {

    const{auth}=useContext(AuthContext);
    const navigate=useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [lessonType, SetLessonType] = useState("TYPE_ELECTIVE");
    const [lessonCode,setLessonCode]=useState("")

    const [timeTable, setTimeTable] = useState([])
    const [rooms, setRooms] = useState([]);
    const [instructorList, setInstructorList] = useState([]); // Get all proffesor and choose
    const [assistantList, SetAssistantList] = useState([]); // Get all assistants and map and choose
    const [studentList, setStudentList] = useState([]); // Get all students and map and choose

    const [tempTime, setTempTime] = useState([])
    const [tempRoom, setTempRoom] = useState([])
    const [tempProfessor, setTempProfessor] = useState([]); // Instructor to sent
    const [tempAssistant, setTempAssistant] = useState([]); // assistants to sent
    const [tempStudent, setTempStudent] = useState([]); // students to sent

    useEffect(() => {
        if( auth !== true){
            navigate("/login")
        }
        if( localStorage.getItem("accountType")!=="ROLE_ADMIN"){
            toastError("Only Admins can reach here!")
            navigate("/")
        }
        getProfessor().then((response) => {
            if (response.data.success === true) {
                setInstructorList(response.data.data);
            }
        });

        getAssistants().then((response) => {
            if (response.data.success === true) {
                SetAssistantList(response.data.data);
            }
        });

        getStudents().then((response) => {
            if (response.data.success === true) {
                setStudentList(response.data.data);
            }
        });

        getAllRooms(Room_URL).then(response => {
            if (response.data.success === true) {
                setRooms(response.data.data)
            }
        });

        getAllTimesWhichIsAvailable(times_URL).then(response => {
            if (response.data.success === true) {
                setTimeTable(response.data.data)
            }
        });

    }, []);

    async function CallSubmit() {

        await handleSubmit(CREATE_URL,
            name,
            description,
            lessonType,
            lessonCode,
            tempRoom,
            tempTime,
            tempProfessor,
            tempAssistant,
            tempStudent
        ).then((response) => {
            if (response) {
                toastSuccess("Succesfully added");
                setTempProfessor([]);
                setTempAssistant([]);
                setTempStudent([]);
                setTempTime([])
            }
        }).catch((err) => {
            toastError(err);
        });


        //TIMES HAS BEEN TAKEN SO WE HAVE TO UPDATE THE TIMES
        getAllTimesWhichIsAvailable(times_URL).then(response => {
            if (response.data.success === true) {
                setTimeTable(response.data.data)
            }
        });
    }

    const handleChangeProfessor = (event) => {
        const {
            target: {value},
        } = event;
        setTempProfessor(
            value
        );
    };
    const handleChangeAssistant = (event) => {
        const {
            target: {value},
        } = event;
        setTempAssistant(
            value
        );
    };

    const handleChangeStudent = (event) => {
        const {
            target: {value},
        } = event;
        setTempStudent(
            value
        );
    };

    const handleChangeRoom = (event) => {
        const {
            target: {value} } = event;
        setTempRoom(
            value
        );
    };


    const handleChangeTime = (event) => {
        const {
            target: {value},
        } = event;
        setTempTime(
            value
        );
    };

    return (
        <div>
            <Container>
                <Form>
                    <Form.Group className="mb-3" controlId="form">
                        <Form.Label>Class Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Class Name"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="form">
                        <Form.Label>Class Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Description"
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="form">
                        <Form.Label>Lesson Code</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Lesson Code"
                            onChange={(e) => {
                                setLessonCode(e.target.value);
                            }}
                        />
                    </Form.Group>

                    <div
                        className="lessonType-div"
                        onChange={(e) => SetLessonType(e.target.value)}
                    >
                        Lesson Type: <br></br>
                        <input defaultChecked type="radio" value="TYPE_COMPULSORY" name="typeLesson"/> Compulsory
                        <input type="radio" value="TYPE_ELECTIVE" name="typeLesson"/> Elective
                    </div>
                </Form>

                <FormControl sx={{m:0.5,  width: 300}}>
                    <InputLabel id="demo-simple-select-label">Rooms</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={tempRoom}
                        onChange={handleChangeRoom}
                        input={<OutlinedInput label="Rooms"/>}
                        MenuProps={MenuProps}
                    >
                        {rooms.map((room) => (
                            <MenuItem key={room.Id} value={room.Id}>
                                {"Room id:" + room.Id + " "+ "Human Capacity:" + room.HumanCapacity}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <br></br>
                <FormControl sx={{m:0.5,  width: 300}}>
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
                    <FormControl sx={{m:0.5,  width: 300}}>
                        <InputLabel id="demo-multiple-name-label">Time Table</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            value={tempTime}
                            onChange={handleChangeTime}
                            input={<OutlinedInput label="Time Table"/>}
                            MenuProps={MenuProps}
                        >
                            {timeTable.map((time) => (
                                <MenuItem key={time.id} value={time.id}>
                                    {time.startDate + "-" + time.endDate + " " + time.days}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <FormControl sx={{m:0.5,  width: 300}}>
                        <InputLabel id="demo-multiple-name-label">Assistans</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            defaultValue={[]}
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
                    <FormControl sx={{m:0.5, width: 300}}>
                        <InputLabel id="demo-multiple-name-label">Students</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            multiple
                            defaultValue={[]}
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
                    variant="primary"
                    type="submit"
                    onClick={() => {
                        CallSubmit()
                    }}
                >
                    Submit
                </Button>
            </Container>
        </div>
    );
}
