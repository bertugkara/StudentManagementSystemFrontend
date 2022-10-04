import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../../Context/AuthContext";
import {useNavigate} from "react-router-dom";
import Grid from '@mui/material/Grid';
import MainFeaturedPost from './MainFeaturedPosts/MainFeaturedPost';
import FeaturedPostAssistant from './FeaturedPosts/FeaturedPostAssistant';
import toastError from "../../../Context/toast";
import FeaturedPostStudent from "./FeaturedPosts/FeaturedPostStudent";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FeaturedPostProfessor from "./FeaturedPosts/FeaturedPostProfessor";
import AddHomework from "../LessonActions/AddActions/AddHomework";
import AddExam from "../LessonActions/AddActions/AddExam";

export default function LessonPage(props) {

    const {detailsForLessonComponent} = props;
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext)
    const [Component, setComponent] = useState(<LessonPage detailsForLessonComponent={detailsForLessonComponent}/>);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (auth !== true) {
            navigate("/login");
        }
    }, [])


    const mainFeaturedPost = {
        title: detailsForLessonComponent.name,
        description: detailsForLessonComponent.description,
        lessonType: detailsForLessonComponent.lessonType.substring(5) + " Lesson",
        lessonCode: detailsForLessonComponent.lessonCode
    };

    function handleAddHomework() {
        setComponent(<AddHomework lesson={detailsForLessonComponent}/>)
        setIsEditing(true)
    }

    function handleAddExam() {
        setComponent(<AddExam lesson={detailsForLessonComponent}/>)
        setIsEditing(true)
    }

    return (
        <div>
            {isEditing === false ? (
                <div className={"lesson-page"}>
                    <MainFeaturedPost post={mainFeaturedPost} addHomework={handleAddHomework} addExam={handleAddExam}/>
                    <Container maxWidth="bg">
                        <Grid container>

                            <Grid item md={3}>
                                Assistants:
                                <Box>
                                    {detailsForLessonComponent.assistantDTOList.map((assistant) => (
                                        <FeaturedPostAssistant key={assistant.id} post={assistant}/>
                                    ))}
                                </Box>
                            </Grid>
                                <Grid item md={1}></Grid>
                            <Grid item md={3} className={"student-grid"}>
                                Students:
                                <Box>
                                    {detailsForLessonComponent.studentDTOList.map((student) => (
                                        <FeaturedPostStudent key={student.id} post={student}/>
                                    ))}
                                </Box>
                            </Grid>
                            <Grid item md={1}></Grid>

                            <Grid item md={3} className={"professor-grid"}>
                                Professor:
                                <Box>
                                    <FeaturedPostProfessor key={detailsForLessonComponent.professorDTO.id}
                                                           post={detailsForLessonComponent.professorDTO}/>
                                </Box>
                            </Grid>

                        </Grid>
                    </Container>
                </div>) : (
                <div>
                    {Component}
                </div>
            )
            }
        </div>
    )
}