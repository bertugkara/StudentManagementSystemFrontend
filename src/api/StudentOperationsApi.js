import axios from "./axios";
import authHeader from "./AuthDetails";

export async function makeActivePassive(Url, id) {
    let config = {
        headers: {
            Authorization: authHeader(),
            "Content-Type": "application/json",
        },
        params: {
            id,
        },
    };
    return await axios
        .post(Url, null, {
            params: {
                id
            },
            headers: {'Authorization': authHeader()}
        });
}

export async function createExam(CREATE_EXAM_URL,
                                 name,
                                 examDateTime,
                                 examDetailsAndExamTips,
                                 roomID,
                                 creatorID,
                                 lessonID
) {
    return await axios
        .post(
            CREATE_EXAM_URL,
            JSON.stringify({
                name,
                examDateTime,
                examDetailsAndExamTips,
                roomID,
                creatorID,
                lessonID,
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': authHeader()
                }
            }
        )
}

export async function createHomework(CREATE_HOMEWORK_URL,
                                     startDate,
                                     endDate,
                                     startTime,
                                     endTime,
                                     description,
                                     lesson_id,
                                     responsible_assistant_ID,
                                     creator_id
) {
    return await axios
        .post(
            CREATE_HOMEWORK_URL,
            JSON.stringify({
                startDate,
                endDate,
                startTime,
                endTime,
                description,
                lesson_id,
                responsible_assistant_ID,
                creator_id
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': authHeader()
                }
            }
        )
}


export async function addStudentToLesson(Url, lessonID,studentID) {
    return await axios
        .post(Url, null, {
            params: {
                lessonID,studentID,
            },
            headers: {'Authorization': authHeader()}
        });
}

