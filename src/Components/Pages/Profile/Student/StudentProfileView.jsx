import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React from "react";
import StudentMainFeaturedProfilePost from "./StudentMainFeaturedProfilePost";
import StudentFeaturedProfilePostLessons from "./StudentFeaturedProfilePostLessons";
import StudentFeaturedExamsPost from "./StudentFeaturedExamsPost";
import StudentFeaturedHomeworkSubmission from "./StudentFeaturedHomeworkSubmission";
import StudentFeaturedHomeworkPost from "./StudentFeaturedHomeworkPost";
import "../Profile.css"

export default function StudentProfileView(props) {

    const {data, mainFeaturedPost} = props;
    return (
        <div>
            <div className={"lesson-page"}>
                <StudentMainFeaturedProfilePost post={mainFeaturedPost}/>
                <Container maxWidth="bg">
                    <Grid container>
                        {data.lessonsEnrolled[0] ?
                            <Grid item md={3}>
                                Lessons You are Responsible:
                                <Box>
                                    {data.lessonsEnrolled.map((lesson) => (
                                        <StudentFeaturedProfilePostLessons key={lesson.id} post={lesson}/>
                                    ))}
                                </Box>
                            </Grid> :
                            <Grid item md={2}>
                               You have not attended any lesson
                            </Grid>
                        }

                        {data.listOfHomeworksThatStudentIsResponsible[0] ?
                            <Grid item md={3} className={"Homeworks-grid"}>
                                Homeworks:
                                <Box>
                                    {data.listOfHomeworksThatStudentIsResponsible.map((tempHomework) => (
                                        <StudentFeaturedHomeworkPost key={tempHomework.id} post={tempHomework}
                                        />
                                    ))}
                                </Box>
                            </Grid> :
                            <Grid item md={2}>
                                <div> <label> No homework assigned to you, yet! </label> </div>
                            </Grid>

                        }

                        {data.listOfHomeworkSubmissionsThatStudentPerformed[0] ?
                            <Grid item md={3} className={"Homeworks-submission-grid"}>
                                Homework Submissions:
                                <Box>
                                    {data.listOfHomeworkSubmissionsThatStudentPerformed
                                        .map((tempHomework) => (
                                            <StudentFeaturedHomeworkSubmission key={tempHomework.submission_id}
                                                                               post={tempHomework}
                                            />
                                        ))}
                                </Box>
                            </Grid> :

                            <Grid item md={2}>
                                <div>You have not send any homework submission </div>
                            </Grid>
                        }
                        {data.examsThatStudentIsResponsible[0] ?
                            <Grid item md={3} className={"Exams-grid"}>
                                Exams:
                                <Box>
                                    {data.examsThatStudentIsResponsible
                                        .map((exam) => (
                                            <StudentFeaturedExamsPost key={exam.id} exam={exam}
                                            />
                                        ))}
                                </Box>
                            </Grid> :
                            <Grid item md={2}>
                                <div>{" "}No Exam assigned to you, yet!</div>
                            </Grid>
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