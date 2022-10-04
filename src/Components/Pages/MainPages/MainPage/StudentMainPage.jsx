import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./StudentMainPage.css"
import LessonPage from "../../Lesson/LessonPage/LessonPage";
import {addStudentToLesson} from "../../../../api/StudentOperationsApi";
import toastError, {toastSuccess} from "../../../Context/toast";
import StudentLessonPage from "../../Lesson/LessonPage/StudentLessonPage";


const ADD_STUDENT_URL = "/api/lesson/addStudent"
export default function StudentMainPage(props) {

    const {lessons} = props;
    const [Component, setComponent] = useState(<StudentMainPage/>);
    const [isEditing, setIsEditing] = useState(false);

    function handleLessonPage(lesson) {
        setComponent(<StudentLessonPage detailsForLessonComponent={lesson}/>);
        setIsEditing(true);
    }

    function handleEnrollLesson(lessonId) {
        addStudentToLesson(ADD_STUDENT_URL, lessonId, JSON.parse(localStorage.getItem("user")).id)
            .then((response) => {
                if (!response.data.message) {
                    toastError(response.data)
                } else {
                    toastSuccess(response.data.message);
                }
            });
    }

    return (
        <div>
            {isEditing === false ? (
                <div>
                    <Table striped>
                        <thead>
                        <tr>
                            <th>Lesson Id</th>
                            <th>Lesson Code</th>
                            <th>Lesson Name</th>
                            <th>Lesson Type</th>
                            <th>Lesson Room</th>
                            <th>Professor</th>
                            <th>Enroll</th>
                            <th>Go To Lesson Page</th>
                        </tr>
                        </thead>
                        <tbody>
                        {lessons.map((lesson) => {
                            return (
                                <tr key={lesson.id}>

                                    <td>{lesson.id}</td>
                                    <td>{lesson.lessonCode}</td>
                                    <td>{lesson.name}</td>
                                    <td>{lesson.lessonType}</td>
                                    <td>{lesson.room.id}</td>
                                    <td>
                                        {lesson.professorDTO.firstName +
                                            " " +
                                            lesson.professorDTO.lastName}
                                    </td>

                                    <td><Button className={"student-buttons"} onClick={() => {
                                        handleEnrollLesson(lesson.id)
                                    }}>Enroll</Button></td>


                                    <td><Button className={"student-buttons"} onClick={() => {
                                        handleLessonPage(lesson)
                                    }}>Lesson Page</Button></td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                </div>
            ) : (<div> {Component}</div>)
            }
        </div>
    );
}
