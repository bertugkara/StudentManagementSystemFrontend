import {useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../../Context/AuthContext";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FeaturedPostAssistant from "./FeaturedPosts/FeaturedPostAssistant";
import FeaturedPostProfessor from "./FeaturedPosts/FeaturedPostProfessor";
import StudentMainFeaturedPost from "./MainFeaturedPosts/StudentMainFeaturedPost";
import SubmitHomework from "../LessonActions/SubmitActions/SubmitHomework";
import toastError, {toastSuccess} from "../../../Context/toast";
import SubmitExam from "../LessonActions/SubmitActions/SubmitExam";
import {getExamsBelongsToLessonId, getHomeworksBelongsToLessonId} from "../../../../api/LessonAndEntityApi";
import FeaturedListHomeworks from "./FeaturedPosts/FeaturedPostListHomeworks";
import FeaturedPostListHomeworks from "./FeaturedPosts/FeaturedPostListHomeworks";
import FeaturedPostListExams from "./FeaturedPosts/FeaturedPostListExams";

const GET_HOMEWORKS_BELONGS_TO_LESSON_URL = "/api/homework/getAllHomeworksBelongsToId"
const GET_EXAM_BELONGS_TO_LESSON_URL = "/api/exam/getExamsWithTheLessonId"
export default function StudentLessonPage(props) {

    const {detailsForLessonComponent} = props;
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext)
    const [Component, setComponent] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [isStudentEnrolledThisLesson, setIsStudentEnrolledThisLesson] = useState(false);
    const [homeworks, setHomeworks] = useState([])
    const [exams, setExams] = useState([])

    useEffect(() => {
        if (auth !== true) {
            navigate("/login");
        } else {
            isStudentEnrolledToThisLecture();
            getHomeworksBelongsToThisLesson()
            getExamsBelongsToThisLesson();
        }
    }, [])

    const mainFeaturedPost = {
        title: detailsForLessonComponent.name,
        description: detailsForLessonComponent.description,
        lessonType: detailsForLessonComponent.lessonType.substring(5) + " Lesson",
        lessonCode: detailsForLessonComponent.lessonCode
    };

    function isStudentEnrolledToThisLecture() {
        detailsForLessonComponent.studentDTOList.forEach((tempStudent) => {
            if (tempStudent.id === JSON.parse(localStorage.getItem("user")).id) {
                setIsStudentEnrolledThisLesson(true);
            }

        });
    }

    function handleSubmitHomeworkButton(homeworkID) {
        if (isStudentEnrolledThisLesson === true) {
            setComponent(<SubmitHomework homeworkID={homeworkID}
                                         creator={JSON.parse(localStorage.getItem("user")).id}/>)
            setIsEditing(true)
        } else {
            toastError("First You have to sign Up to this lesson!");
        }
    }

    function handleSubmitExamButton(exam_id) {
        if (isStudentEnrolledThisLesson === true) {
            setComponent(<SubmitExam examID={exam_id}
                                     creator={JSON.parse(localStorage.getItem("user")).id}/>)
            setIsEditing(true)

        } else {
            toastError("First You have to sign Up to this lesson!");
        }
    }

    function getHomeworksBelongsToThisLesson() {
        getHomeworksBelongsToLessonId(GET_HOMEWORKS_BELONGS_TO_LESSON_URL, detailsForLessonComponent.id).then((response) => {
            if (response.data.data === null) {

                toastError("No Homework found associated with this lesson")
            }
            if (response.data.data) {

                setHomeworks(response.data.data);
            }
        });

    }

    function getExamsBelongsToThisLesson() {
        getExamsBelongsToLessonId(GET_EXAM_BELONGS_TO_LESSON_URL, detailsForLessonComponent.id).then((response) => {
            if (response.data.data === null) {

                toastError("No Exam found associated with this lesson")
            }
            if (response.data.data) {

                setExams(response.data.data);
            }
        });

    }

    return (
        <div>
            {isEditing === false ? (
                <div className={"lesson-page"}>
                    <StudentMainFeaturedPost post={mainFeaturedPost} submitHomework={handleSubmitHomeworkButton}
                                             submitExam={handleSubmitExamButton}/>
                    <Container maxWidth="bg">
                        <Grid container>
                            {detailsForLessonComponent.assistantDTOList[0] ?
                            <Grid item md={3}>
                                Assistants:
                                <Box>
                                    {detailsForLessonComponent.assistantDTOList.map((assistant) => (
                                        <FeaturedPostAssistant key={assistant.id} post={assistant}/>
                                    ))}
                                </Box>
                            </Grid> :
                                <Grid item md={2}> No Assistant found </Grid>
                            }

                            {detailsForLessonComponent.professorDTO ?
                                <Grid item md={3} className={"professor-grid"}>
                                Professor:
                                <Box>
                                    <FeaturedPostProfessor key={detailsForLessonComponent.professorDTO.id}
                                                           post={detailsForLessonComponent.professorDTO}/>
                                </Box>
                            </Grid>:
                                <Grid item md={2}> No Professor found </Grid>
                            }

                            {homeworks[0] ?
                            <Grid item md={3} className={"Homeworks-grid"}>
                                Homeworks:
                                <Box>
                                    {homeworks.map((tempHomework) => (
                                        <FeaturedPostListHomeworks key={tempHomework.id} homework={tempHomework}
                                                                   submitButton={handleSubmitHomeworkButton}/>
                                    ))}
                                </Box>
                            </Grid>:
                                <Grid item md={2}> No Homework found </Grid>
                            }

                            {homeworks[0] ?
                            <Grid item md={3} className={"Exams-grid"}>
                                Exams:
                                <Box>
                                    {exams.map((exam) => (
                                        <FeaturedPostListExams key={exam.id} exam={exam}
                                                               examSubmit={handleSubmitExamButton}/>
                                    ))}
                                </Box>
                            </Grid>:
                                <Grid item md={2}> No Exam found </Grid>
                            }

                        </Grid>
                    </Container>
                </div>
            ) : (
                <div>
                    {Component}
                </div>
            )
            }
        </div>
    )
}