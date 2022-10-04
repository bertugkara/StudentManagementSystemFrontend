import React from 'react'
import generatePassword from "../GenerateRandomPassword";
import { useContext, useEffect } from "react";
import userDetails from '../../../Context/createUserDetails';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

export default function AssistantRegister() {
    const {
        email,
        setEmail,
        password,
        setPassword,
        setRole,
        firstName,
        username,
        setFirstName,
        lastName,
        setLastName,
        handleSubmit,
        setRegisterLink,
        setUsername,
      } = useContext(userDetails);

      useEffect(() => {
        setRole(["ROLE_ASSISTANT"]);
        setRegisterLink(`/api/assistant/registerAssistant`);
        setPassword(generatePassword());
      }, []);

      useEffect(() => {
        setUsername(firstName+"."+lastName)
      }, [firstName,lastName]);


  return (
    <div>
    <Container>
      <h2>Register Assistant</h2>

      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="name@example.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>username</Form.Label>
          <Form.Control
            value={username}
            type="username"
            disabled
            placeholder="Abcdefg"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
            type="firstName"
            placeholder="Abcdefg"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
            type="LastName"
            placeholder="Abcdefg"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Random Generated Password:</Form.Label>
          <Form.Control disabled type="LastName" placeholder={password} />
        </Form.Group>
        <Button className={"register-button"}
          onClick={() => {
            handleSubmit();
          }}
        >
          Register
        </Button>
      </Form>
    </Container>
  </div>
  )
}
