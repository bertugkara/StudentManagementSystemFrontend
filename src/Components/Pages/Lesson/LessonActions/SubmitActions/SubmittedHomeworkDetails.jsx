import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from "@mui/material/Button";
import Typography from '@mui/material/Typography';
import {useState} from "react";
import "./SubmitHomework.css"
import {seeFile} from "../../../../../api/HomeworkAndExamOperationsApi";
import '@react-pdf-viewer/core/lib/styles/index.css';
import {Base64} from 'js-base64';


export default function SubmittedHomeworkDetails(props) {

    const {submission} = props;
    const [Url] = useState(submission.fileDTO.url)

    function handleFileOpen() {
        seeFile(Url, submission.studentDTO.id).then((response) => {

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
            <div className={"submitted-homework-details-div"}>
                <Card sx={{minWidth: 500}}>
                    <CardContent>

                        <Typography variant="h5" component="div">
                            Description: {submission.homeworkDTO.description}
                        </Typography>
                        <Typography sx={{mb: 1.5}} color="text.secondary">
                            Deadline: {submission.homeworkDTO.endDate + " " + submission.homeworkDTO.endTime}
                        </Typography>
                        <Typography variant="body2">
                            Submitted Person: {submission.studentDTO.firstName + " " + submission.studentDTO.lastName}
                        </Typography>
                        <CardActions>
                            <Button size="small" onClick={() => {
                                handleFileOpen()
                            }}>See Submitted File</Button>
                        </CardActions>
                    </CardContent>

                </Card>

            </div>
        )
    }