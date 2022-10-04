import axios from "./axios";
import authHeader from "./AuthDetails";

export async function submitExam(
    URL,
    formData
) {

    return await axios
        .post(
            URL,
            formData,
            {
                headers: {
                    "Content-Type": undefined,
                    Authorization: authHeader(),
                },
            }
        );
}

export async function seeFile(
    URL,creator
) {
    let config = {
        responseType: 'blob',
        headers: {
            Authorization: authHeader(),
            "Content-Type": "application/json",

        },
        params: {
            creator,
        },
    };
    return await axios
        .get(URL, config);

}