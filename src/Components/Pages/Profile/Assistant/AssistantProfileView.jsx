import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React from "react";
import AssistantFeaturedProfilePostLessons from "./AssistantFeaturedProfilePostLessons";
import AssistantFeaturedExamsPost from "./AssistantFeaturedExamsPost";
import AssistantFeaturedHomeworkPost from "./AssistantFeaturedHomeworkPost";
import "../Profile.css"
import AssistantMainFeaturedProfilePost from "./AssistantMainFeaturedProfilePost";

export default function AssistantProfileView(props) {

    const {data, mainFeaturedPost} = props;

    return (
        <div>
            <div className={"lesson-page"}>
                <AssistantMainFeaturedProfilePost post={mainFeaturedPost}/>
                <Container maxWidth="bg">
                    <Grid container>

                        {data.lessonsAttended[0] ?
                            <Grid item md={4}>
                                Lessons You are Responsible:
                                <Box>
                                    {data.lessonsAttended.map((lesson) => (
                                        <AssistantFeaturedProfilePostLessons key={lesson.id} post={lesson}/>
                                    ))}
                                </Box>
                            </Grid>
                            : <Grid item md={3}>
                                <div>You have not attended any lesson!</div>
                            </Grid>
                        }

                        {data.homeworksCreatedOrResponsible[0] ?
                            <Grid item md={4} className={"Homeworks-grid"}>
                                Homeworks You are Responsible:
                                <Box>
                                    {data.homeworksCreatedOrResponsible.map((tempHomework) => (
                                        <AssistantFeaturedHomeworkPost key={tempHomework.id} post={tempHomework}
                                        />
                                    ))}
                                </Box>
                            </Grid>
                            : <Grid item md={3}>
                                <div>You have not created any Homework</div>
                            </Grid>
                        }

                        {data.examsCreated[0] ?
                            <Grid item md={4} className={"Exams-grid"}>
                                Exams You Created:
                                <Box>
                                    {data.examsCreated
                                        .map((exam) => (
                                            <AssistantFeaturedExamsPost key={exam.id} exam={exam}
                                            />
                                        ))}
                                </Box>
                            </Grid> : <Grid item md={3}>
                                <div> No Exam Created By You!</div>
                            </Grid>
                        }


                    </Grid>

                </Container>
            </div>

        </div>
    )
}