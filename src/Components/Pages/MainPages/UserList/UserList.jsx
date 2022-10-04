import React from 'react'
import axios from '../../../../api/axios';
import {useEffect} from 'react';
import {useState} from 'react';
import {useContext} from 'react';
import AuthContext from '../../../Context/AuthContext';
import {useNavigate} from 'react-router-dom';
import toastError, {toastSuccess} from '../../../Context/toast';
import authHeader from '../../../../api/AuthDetails';
import UserListActiveView from "./UserListActiveView";
import UserListDeactiveView from "./UserListDeactiveView";
import {makeActivePassive} from "../../../../api/StudentOperationsApi";
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';


const userListActive_URL = "/api/admin/getAllActiveUsers"
const userListDeactivated_URL = "/api/admin/getAllDeactiveUsers"
const makeActive_URL = "api/admin/makeStudentActive"
const makeDeactive_URL = "api/admin/makeStudentDeactive"
export default function UserList() {


    const navigate = useNavigate();
    const [ActiveData, setActiveData] = useState([]);
    const [DeactivatedData, setDeactivatedData] = useState([]);
    const [myState, setMyState] = useState(false)

    const {auth} = useContext(AuthContext);
    const [accountType] = useState(localStorage.getItem('accountType'))

    const handleChange = (event) => {
        setMyState(event.target.checked);
    };

    function handleMakeStudentPassive(id) {
        makeActivePassive(makeDeactive_URL, id)
            .then(() => {
                toastSuccess("Successfully Made Passive, We are Refreshing Page for you")
                setTimeout(function () {
                    window.location.reload();
                }, 3000);
            })
    }

    function handleMakeStudentActive(id) {
        makeActivePassive(makeActive_URL, id)
            .then(() => {
                toastSuccess("Successfully Made Active, We are Refreshing Page for you")
                setTimeout(function () {
                    window.location.reload();
                }, 3000);
            })

    }

    const ActiveUserList = ActiveData.map((tempUser) => {
        return {
            id: tempUser.id,
            email: tempUser.email,
            firstName: tempUser.firstName,
            lastName: tempUser.lastName,
            username: tempUser.username,
            role: tempUser.role[0].name
        }
    });

    const DeactiveUserList = DeactivatedData.map((tempUser) => {
        return {
            id: tempUser.id,
            email: tempUser.email,
            firstName: tempUser.firstName,
            lastName: tempUser.lastName,
            username: tempUser.username,
            role: tempUser.role[0].name
        }
    });

    useEffect(() => {
        if (auth !== true) {
            navigate("/login")
        }
        if (accountType !== 'ROLE_ADMIN') {
            navigate("/")
            toastError("You have to be admin!!");
        }
        getData();

    }, []);

    function getData() {


        axios.get(userListActive_URL, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': authHeader()
            }
        }).then((response) => {
            setActiveData(response.data.data)
        }).catch((err) => {
            toastError("You are not admin Or Fetching Data Problem!")
        });
        axios.get(userListDeactivated_URL, {
            headers: {
                "Content-Type": "application/json",
                'Authorization': authHeader()
            }
        }).then((response) => {
            setDeactivatedData(response.data.data)

        }).catch((err) => {
            toastError("You are not admin Or Fetching Data Problem!")
        });
    }

    return (
        <div>
            <Box className={"select-box"} sx={{minWidth: 150}}>
                <span>Active Set </span>
                <Switch
                    checked={myState}
                    onChange={handleChange}
                    inputProps={{'aria-label': 'controlled'}}
                />
                <span>Inactive Set</span>
            </Box>
            <div>
                {!myState ?
                    <UserListActiveView students={ActiveUserList}
                                               handlePassiveOperation={handleMakeStudentPassive}/> :
                    <UserListDeactiveView students={DeactiveUserList}
                                          handleActiveOperation={handleMakeStudentActive}/>}
            </div>
        </div>
    )
}
