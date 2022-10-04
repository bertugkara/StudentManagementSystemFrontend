import axios from "./axios";
import authHeader from "./AuthDetails";

const Student_URL = "/api/student/getAllStudents";
const assistant_URL = "/api/assistant/getAllAssistants";
const professor_URL = "/api/professor/getAllProfessors";
const getProfessorWhichIsNotIncludedInToTheLesson_URL =
  "/api/professor/getByProfessorNotAttendedToGivenLecture";
const getStudentsWhichIsNotIncludedInToTheLesson_URL =
  "/api/student/getByStudentsNotAttendedToGivenLecture";
const getAssistantsWhichIsNotIncludedInToTheLesson_URL =
  "/api/assistant/getByAssistantNotAttendedToGivenLecture";

export async function getStudents() {
  return await axios
    .get(Student_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
    })

}

export async function getAssistants() {

  return await axios
    .get(assistant_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
    })

}

export async function getProfessor() {

  return await axios
    .get(professor_URL, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader(),
      },
    })

}

export async function handleSubmit(
  URL,
  name,
  description,
  lessonType,lessonCode,
  roomID,
  timeIDList,
  instructorID,
  assistantList,
  studentList
) {
  return await axios
    .post(
      URL,
      JSON.stringify({
        name,
        description,
        lessonType,
          lessonCode,
        roomID,
         timeIDList ,
        instructorID,
        assistantList,
        studentList,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader(),
        },
      }
    )

}

export async function getProfessorWhichIsNotIncludedInToTheLesson(id) { //lessonID

  let config = {
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    params: {
      id,
    },
  };

return  await axios
    .get(getProfessorWhichIsNotIncludedInToTheLesson_URL, config)

}

export async function getAssistantsWhichIsNotIncludedInToTheLesson(lessoncode) {
  let config = {
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    params: {
      lessoncode,
    },
  };
  return await axios
    .get(getAssistantsWhichIsNotIncludedInToTheLesson_URL, config)

}

export async function getStudentsWhichIsNotIncludedInToTheLesson(lessoncode) {
  let config = {
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
    },
    params: {
      lessoncode,
    },
  };
return await axios
    .get(getStudentsWhichIsNotIncludedInToTheLesson_URL, config)


}

export async function handleUpdate(
  URL,
  id,
  name,
  description,
  lessonType,
  lessonCode,
  rooms,
  timeIDList,
  instructorID,
  assistantList,
  studentList
) {

  return await axios
      .post(
          URL,
          JSON.stringify({
              id,
              name,
              description,
              lessonType,
              lessonCode,
              rooms,
              timeIDList,
              instructorID,
              assistantList,
              studentList,
          }),
          {
              headers: {
                  "Content-Type": "application/json",
                  Authorization: authHeader(),
              },
          }
      );
}

export async function getAllLessons(GET_LESSONS_URL){
    return await axios
       .get(GET_LESSONS_URL, {
           headers: {
               "Content-Type": "application/json",
               Authorization: authHeader(),
           },
       });
}

export async function handleUpdateFromProf(
    URL,
    id,
    name,
    description,
    rooms,
    timeIDList,
    assistantList,
) {

    return await axios
        .post(
            URL,
            JSON.stringify({
                id,
                name,
                description,
                rooms,
                timeIDList,
                assistantList,
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader(),
                },
            }
        );
}


export async function handleUpdateFromAssistant(
    URL,
    id,
    name,
    description,
    rooms,
) {

    return await axios
        .post(
            URL,
            JSON.stringify({
                id,
                name,
                description,
                rooms
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authHeader(),
                },
            }
        );
}

export async function getHomeworksBelongsToLessonId(URL,id){

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
        .get(URL, config);
}
export async function getExamsBelongsToLessonId(URL,id){

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
        .get(URL, config);
}

