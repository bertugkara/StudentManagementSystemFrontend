import React, {useState} from "react";
import {submitExam} from "../../../../../api/HomeworkAndExamOperationsApi";
import toastError, {toastSuccess} from "../../../../Context/toast";
import Form from "react-bootstrap/Form";
import SubmittedHomeworkDetails from "./SubmittedHomeworkDetails";
import "./SubmitHomework.css"
import SubmittedExamDetails from "./SubmittedExamDetails";

const SUBMIT_EXAM_URL="/api/examSubmission/createSubmission"
export default function SubmitExam(props){

    const {examID,creator}=props;
    const[description,setDescription]=useState("");
    const [selectedFile,setSelectedFile]=useState(undefined)
    const [progress,setProgress]=useState(0);
    const [isSuccess,setIsSuccess]=useState(false);
    const [response,setResponse]=useState({});

    function selectFile(event){
        setSelectedFile(event.target.files);
    }

    function handleUpload(){
        let tempFile=selectedFile[0];

        let myForm= new FormData();
        myForm.append("request", new Blob([JSON.stringify({
                "description":description,
                "creatorStudentID":creator,
                "examID":examID
            })],{
                type:"application/json"
            }
        ));
        myForm.append("file",tempFile);



        submitExam(SUBMIT_EXAM_URL,
            myForm
        ).then((response)=>{
            if(response.data.data) {
                setProgress(100)
                console.log(response.data.data)
                toastSuccess(response.data.message);
                setIsSuccess(true);
                setResponse(response.data.data)
            }
            else {
                toastError("Error Occured");
                setProgress(0)
            }
        });
    }

    return(
        <div className={"submit-homework"}>

            <Form>
                <Form.Group className="description-submit-homework" controlId="form">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Description"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                </Form.Group>
            </Form>

            <div>
                {selectedFile && (
                    <div className="progress">
                        <div
                            className="progress-bar progress-bar-info progress-bar-striped"
                            role="progressbar"
                            aria-valuenow={progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{width: progress + "%"}}
                        >
                            {progress}%
                        </div>
                    </div>
                )}
            </div>

            <label className="btn btn-default">
                <input type="file" onChange={selectFile} />
            </label>

            <button
                className="btn btn-success"
                disabled={!selectedFile}
                onClick={handleUpload}
            >
                Upload
            </button>

            { isSuccess===false ? <div></div> :
                <SubmittedExamDetails submission={response} />
            }

        </div>
    )
}