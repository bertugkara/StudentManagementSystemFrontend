import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from '@mui/material/Box';
import {useNavigate} from "react-router-dom";
import toastError, {toastSuccess} from "../../../../Context/toast";
import {useEffect} from "react"
import Button from "@mui/material/Button";
import "./addHomework.css"
import {createExam, createHomework} from "../../../../../api/StudentOperationsApi";
import CreatedHomeworkView from "./CreatedHomeworkView";

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
const CREATE_HOMEWORK_URL = "/api/homework/createHomework"
export default function AddHomework(props) {

    const {lesson} = props
    const navigate = useNavigate();
    let date = new Date();

    const [selectedStartDay, setSelectedStartDay] = useState({
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    });
    const [selectedEndDay, setSelectedEndDay] = useState({
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    });

    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const [description, setDescription] = useState("");
    const [lessonId] = useState(lesson.id)
    const [tempAssistant, setTempAssistant] = useState({})
    const [creator] = useState(JSON.parse(localStorage.getItem("user")).id)

    const [success, setSuccess] = useState(false);
    const [response, setResponse] = useState({})


    useEffect(() => {
        if (localStorage.getItem("accountType") === "ROLE_STUDENT") {
            navigate("/profile")
            toastError("Only Admins and Teacher can reach this page.")
        }
    }, [])


    const handleChangeAssistant = (event) => {
        const {
            target: {value},
        } = event;
        setTempAssistant(value);
    };

    function handleSubmit() {
        let startDate, endDate;
        if (selectedStartDay.month <= 9) {
            startDate = selectedStartDay.year + "-" + "0" + selectedStartDay.month + "-" + selectedStartDay.day;
        } else {
            startDate = selectedStartDay.year + "-" + selectedStartDay.month + "-" + selectedStartDay.day;
        }

        if (selectedEndDay.month <= 9) {
            endDate = selectedEndDay.year + "-" + "0" + selectedEndDay.month + "-" + selectedEndDay.day;
        } else {
            endDate = selectedEndDay.year + "-" + selectedEndDay.month + "-" + selectedEndDay.day;
        }

        createHomework(CREATE_HOMEWORK_URL,
            startDate.toString(),
            endDate.toString(),
            startTime.toString(),
            endTime.toString(),
            description,
            lessonId,
            tempAssistant,
            creator
        ).then((response) => {
            if (response.data.success === true) {
                toastSuccess("Succesfully Created");

                setResponse(response.data.data);
                setSuccess(true);
            } else {
                toastError("Something wrong, Could not created!!")
            }
        });

    }

    return (
        <div>
            <div className={"add-Homework-div"}>
                <Box>
                    <h3 className={"addHomeworkParagraph"}> Add Homework Details </h3>
                    <label>
                        Enter Description About Homework:
                    </label>
                    <br></br>
                    <TextField
                        required
                        id="outlined-required"
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <br></br>
                    <label> Homework Start Time: </label>
                    <br></br>
                    <input type="time" id="startTime" name="startTime" onChange={(e) => {
                        setStartTime(e.target.value)
                    }}/>
                    <br></br>

                    Please Choose Start Day:
                    <br/>
                    <DatePicker
                        value={selectedStartDay}
                        onChange={setSelectedStartDay}
                        inputPlaceholder="Select a Start Day"
                        shouldHighlightWeekends
                    />
                    <br></br>
                    Please Choose Homework End Time:
                    <br/>
                    <input type="time" id="startTime" name="endTime" onChange={(e) => {
                        setEndTime(e.target.value)
                    }}/>
                    <br/>
                    Please Select Homework End Day:
                    <br/>
                    <DatePicker
                        value={selectedEndDay}
                        onChange={setSelectedEndDay}
                        inputPlaceholder="Select a Start End Day"
                        shouldHighlightWeekends
                    />
                    <br/>
                    Please Choose Responsible Assistant:
                    <br></br>
                    <FormControl sx={{width: 300}}>
                        <InputLabel id="demo-simple-select-label"></InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            defaultValue={tempAssistant}
                            value={tempAssistant}
                            onChange={handleChangeAssistant}
                            input={<OutlinedInput label="Assistants"/>}
                            MenuProps={MenuProps}
                        >
                            {lesson.assistantDTOList.map((assistant) => (
                                <MenuItem key={assistant.id} value={assistant.id}>
                                    {assistant.firstName + " " + assistant.lastName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br></br>
                    <div className={"Submit-Button"}>
                        <Button onClick={() => {
                            handleSubmit()
                        }}>
                            Submit
                        </Button>
                    </div>
                </Box>
            </div>
            {
                success === true ? <CreatedHomeworkView homework={response}/> : <div></div>
            }
        </div>
    )
}