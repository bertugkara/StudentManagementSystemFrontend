import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import ProfessorEditLesson from "../../Lesson/EditComponents/ProfessorEditLesson";
import AdminEditLesson from "../../Lesson/EditComponents/AdminEditLesson";
import LessonPage from "../../Lesson/LessonPage/LessonPage";

export default function ProfessorMainPage(props) {


    const [Component, setComponent] = useState(<ProfessorMainPage />);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditButton(lesson) {
        setComponent(<ProfessorEditLesson lesson={lesson} />);
        setIsEditing(true);
    }

    function handleLessonPage(lesson){
        setComponent(<LessonPage detailsForLessonComponent={lesson}/>);
        setIsEditing(true);
    }

    return (
        <div>
            {isEditing === false ? (
                <div>
                    <Table striped>
                        <thead>
                        <tr>

                            <th>Lesson Code</th>
                            <th>Lesson Name</th>
                            <th>Lesson Type</th>
                            <th>Lesson Room</th>
                            <th>Professor</th>
                            <th>Edit Lesson</th>
                            <th>Lesson Page</th>
                        </tr>
                        </thead>
                        <tbody>
                        {props.lessons.map((lesson) => {
                            return (
                                <tr key={lesson.id}>

                                    <td>{lesson.lessonCode}</td>
                                    <td>{lesson.name}</td>
                                    <td>{lesson.lessonType}</td>
                                    <td>{lesson.room.id}</td>
                                    <td>
                                        {lesson.professorDTO.firstName +
                                            " " +
                                            lesson.professorDTO.lastName}
                                    </td>
                                    <td>
                                        <Button className={"edit-button"}
                                                onClick={() => {
                                                    handleEditButton(lesson);
                                                }}
                                        >
                                            {" "}
                                            Edit Lesson{" "}
                                        </Button>
                                    </td>

                                    <td>
                                        <Button className={"go-to-lesson-page"} onClick={()=>{handleLessonPage(lesson)}}>Go to Lesson Page</Button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                </div>
            ) : (
                <div>{Component}</div>
            )}
        </div>
    );
}