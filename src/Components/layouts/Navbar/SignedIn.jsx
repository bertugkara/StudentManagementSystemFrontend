import React from 'react'
import {NavLink} from 'react-router-dom'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {useState, useEffect} from "react";
import "./NavigationBar.css"
export default function SignedIn(props) {

    const [accountType, setAccountType] = useState("");

    useEffect(() => {
        setAccountType(localStorage.getItem("accountType"));
    }, []);

    let LessonManagement;
    if (accountType === "ROLE_ADMIN") {
        LessonManagement = <Button className="buttons-div" as={NavLink} to="/createLesson">
            Create Lesson
        </Button>
    }

    return (

        <div>


            <Navbar bg="" expand="lg">
                <Navbar.Brand className={"navbar-brand"} as={NavLink} to="/">
                    Student Management System
                </Navbar.Brand>
                <Container fluid>
                    <Container fluid className="button-container">
                        <div className="button-div">
                            {accountType === "ROLE_ADMIN" ?
                                <Button className="buttons-div" as={NavLink} to="/userList">
                                    User List
                                </Button> :

                                <Button as={NavLink} to="/profile">Profile</Button>
                            }
                            <Button className="buttons-div" as={NavLink} to="/">
                                Home
                            </Button>
                            {
                                LessonManagement
                            }
                            {accountType === "ROLE_ADMIN" ? (
                                <Button className="buttons-div" as={NavLink} to="/createUser">
                                    Create User
                                </Button>
                            ) : (
                                <div> </div>
                            )}
                        </div>
                    </Container>
                    <NavDropdown className={"nav-dropdown"} title={JSON.parse(localStorage.getItem("user")).email}>

                        <NavDropdown.Item variant="success" id="dropdown-profile" as={NavLink} to="/profile">
                            Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item variant="success" id="dropdown-profile" onClick={props.signOut}
                                          text="Sign Out">
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Container>

            </Navbar>
        </div>

    )
}
