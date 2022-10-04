import React from "react";
import {useState, useContext} from "react";
import AuthContext from "../../Context/AuthContext";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {toastSuccess} from "../../Context/toast";
import toastError from "../../Context/toast";
import './Login.css'
import {PostLogin} from "../../../api/AuthAndRegisterApi";
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';


const LOGIN_URL = "/api/auth/login";
const theme = createTheme();
export default function Login() {
    const navigate = useNavigate();
    const {auth, setAuth} =
        useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (auth === true) {
            navigate("/");
        }
    });

    function navigateToMain() {
        if (success === true) {
            navigate("/");
        }
    }

    function callPostLogin() {

        let response = PostLogin(LOGIN_URL, username, password);
        response.then((response) => {
            if (response.data.token) {
                localStorage.removeItem("user");
                localStorage.removeItem("accountType");
                localStorage.removeItem("token");
                localStorage.setItem("user", JSON.stringify(response?.data) );
                localStorage.setItem("accountType", response.data.roles[0]);
                localStorage.setItem("token", JSON.stringify(response.data.token));
                setAuth(true);
                console.log(response.data);
                setUsername("");
                setPassword("");
                setSuccess(true);
                toastSuccess("Success Login");
                navigateToMain();
            } else {
                toastError("Failed to Login.");
                setSuccess(false)
                setAuth(false)
            }
        })

    }

    return (
        <div>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="username"
                                name="username"
                                autoComplete="username"
                                onChange={(e)=> {setUsername(e.target.value)}}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e)=> {setPassword(e.target.value)}}
                            />
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                onClick={()=>{callPostLogin()}}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </div>
    );
}
