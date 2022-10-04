import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React from "react";
import ProfessorMainFeaturedProfilePost from "./ProfessorMainFeaturedProfilePost";
import ProfessorFeaturedProfilePostLessons from "./ProfessorFeaturedProfilePostLessons";
import ProfessorFeaturedExamsPost from "./ProfessorFeaturedExamsPost";
import ProfessorFeaturedHomeworkPost from "./ProfessorFeaturedHomeworkPost";
import "../Profile.css"

export default function ProfessorProfileView(props) {

    const {data, mainFeaturedPost} = props;

    return (
        <div>
            <div className={"lesson-page"}>
                <ProfessorMainFeaturedProfilePost post={mainFeaturedPost}/>
                <Container maxWidth="bg">
                    <Grid container>
                        {data.lessonsTeached[0] ?
                            <Grid item md={4}>
                                Lessons You are Responsible:
                                <Box>
                                    {data.lessonsTeached.map((lesson) => (
                                        <ProfessorFeaturedProfilePostLessons key={lesson.id} post={lesson}/>
                                    ))}
                                </Box>
                            </Grid>
                            : <Grid item md={3}>
                                <div>You have not attended any lesson!</div>
                            </Grid>
                        }



                        {data.homeworksCreated[0] ?
                            <Grid item md={4} className={"Homeworks-grid"}>
                                Homeworks You Created:
                                <Box>
                                    {data.homeworksCreated.map((tempHomework) => (
                                        <ProfessorFeaturedHomeworkPost key={tempHomework.id} post={tempHomework}
                                        />
                                    ))}
                                </Box>
                            </Grid>
                            : <Grid item md={3}> <div>You have not created any Homework</div> </Grid>
                        }

                        {data.examsCreated[0] ?
                            <Grid item md={4} className={"Exams-grid"}>
                                <label> Exams that You created: </label>
                                <Box>
                                    {data.examsCreated
                                        .map((exam) => (
                                            <ProfessorFeaturedExamsPost key={exam.id} exam={exam}
                                            />
                                        ))}
                                </Box>
                            </Grid>
                            : <Grid item md={3}><div> No Exam Created By You! </div> </Grid>
                        }


                        {/*{data.listOfExamSubmissionsThatStudentPerformed[0] ?*/}
                        {/*    <Grid item md={2} className={"Exams-submission-grid"}>*/}
                        {/*        <div className={"submission-div"}>*/}
                        {/*            Exam Submissions You Performed:*/}
                        {/*            <Box>*/}
                        {/*                {data.listOfExamSubmissionsThatStudentPerformed.map((tempSubmission) => {*/}
                        {/*                    <StudentFeaturedExamSubmissionPost key={data.ExamSubmissionDTO.id}*/}
                        {/*                                                       post={data.ExamSubmissionDTO}/>*/}
                        {/*                })*/}
                        {/*                }*/}
                        {/*            </Box>*/}
                        {/*        </div>*/}
                        {/*    </Grid>*/}
                        {/*    : <div></div>*/}
                        {/*}*/}
                    </Grid>

                </Container>
            </div>

        </div>
    )
}