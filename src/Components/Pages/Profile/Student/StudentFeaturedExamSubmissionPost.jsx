import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import * as React from "react";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {useState} from "react";
import {seeFile} from "../../../../api/HomeworkAndExamOperationsApi";


export default function StudentFeaturedExamSubmissionPost(props) {
    const { post } = props;

    const [Url] = useState(post.fileDTO.url)

    function handleFileOpen() {
        seeFile(Url, post.studentDTO.id).then((response) => {
            const pdfBlob = new Blob([response.data], { type: "application/pdf" })
            const blobUrl = window.URL.createObjectURL(pdfBlob)
            const link = document.createElement('a')
            link.href = blobUrl;
            link.setAttribute('download', "submission.pdf")
            link.click();
            link.remove();
            URL.revokeObjectURL(blobUrl);

        });
    }

    return (
        <Grid item xs={15} md={30}>
            <CardActionArea component="a" href="#">
                <Card sx={{ display: 'flex' }}>
                    <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h5" component="div">
                                Description: {post.examDTO.description}
                            </Typography>
                            <Typography variant="body2">
                                Submitted Person: {post.ExamDTO.name}
                            </Typography>
                            <CardActions>
                                <Button size="small" onClick={() => {
                                    handleFileOpen()
                                }}>See Submitted File</Button>
                            </CardActions>
                        </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    );
}
