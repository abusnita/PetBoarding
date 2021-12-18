import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { PetBoardingContext } from "./PetBoardingContext";

const SignInForm = () => {
  const initialLogInfo = {
    email: "",
    password: "",
  };
  const { setSignedInUser, selectedMatch } = useContext(PetBoardingContext);
  const [logInfo, setLogInfo] = useState(initialLogInfo);

  const history = useHistory();

  const handleInfo = (event) => {
    setLogInfo({ ...logInfo, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(logInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          window.sessionStorage.setItem(
            "signedInUser",
            JSON.stringify(data.data)
          );
          setSignedInUser(data.data);

          if (selectedMatch) {
            history.push("/Payment");
          } else {
            history.push("/");
          }
        } else {
          return <h1>An error has occured. Please check the info provided</h1>;
        }
      });
  };
  const createAccount = () => {
    history.push("/SignUp");
  };
  return (
    <Wrapper>
      <Title>Please provide your sign in information:</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          Email:
          <Input
            type="email"
            placeholder="Email"
            id="email"
            value={logInfo.email}
            onChange={handleInfo}
            required
          />
        </Label>
        <Label>
          Password:
          <Input
            type="password"
            placeholder="Password"
            id="password"
            value={logInfo.password}
            onChange={handleInfo}
            required
          />
        </Label>
        <Bottom>
          <Submit type="submit">Sign In</Submit>
          <Button type="button" onClick={createAccount}>
            Create account
          </Button>
        </Bottom>
      </Form>
    </Wrapper>
  );
};

export default SignInForm;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  margin-left: 800px;
  margin-top: 250px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 20px;
  padding-bottom: 20px;
  margin-left: 60px;
  width: 400px;
  margin-top: 20px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  align-items: flex-end;

  width: 300px;
`;

const Label = styled.label`
  font-size: 14px;
  align-items: center;
  font-weight: bold;
  display: flex;
  color: black;
`;

const Input = styled.input`
  width: 200px;
  height: 15px;
  padding: 8px;
  margin: 5px;
  font-size: 14px;
  border-radius: 5px;

  border: 1px solid grey;
`;

const Button = styled.button`
  height: 30px;
  width: 220px;
  margin: 20px 5px 5px 5px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  color: white;
  background-color: var(--color-buttons);
  transition: 400ms ease;
  cursor: pointer;
  &:hover {
    background-color: var(--color-hover);
  }
`;
const Submit = styled(Button)`
  width: 90px;
  margin-top: 20px;
`;
const Bottom = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
