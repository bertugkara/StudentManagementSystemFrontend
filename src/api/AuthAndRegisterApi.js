import axios from "./axios";
import authHeader from "./AuthDetails";

export async function PostLogin(LOGIN_URL, username, password) {
    return await axios
        .post(LOGIN_URL, JSON.stringify({username, password}), {
            headers: {"Content-Type": "application/json"},
            withCredentials: true,
        });
}

export async function registerUser(RegisterUrl, email,
                               username,
                               firstname,
                               lastname,
                               password,
                               role) {
    return await axios
        .post(
            RegisterUrl,
            JSON.stringify({
                email,
                username,
                firstname,
                lastname,
                password,
                role,
            }),
            {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': authHeader()
                }
            }
        )
}