import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import SignInForm from "./SignInForm";
import { CustomerContext } from "../src/Reducers/CustomerReducer";

const CustomerSignIn = () => {
  const { userType, setUserType } = useContext(CustomerContext);

  const history = useHistory();
  const handleChange = (e) => {
    window.sessionStorage.setItem("userType", JSON.stringify(userType));
    setUserType(e.target.value);
  };
  const handleClick = () => {
    history.push("/SignIn");
  };
  return (
    <Wrapper>
      <Title>Are you a customer or a host?</Title>
      <RadioButtons>
        <UserType
          type="radio"
          checked={userType === "customer"}
          onChange={handleChange}
          id="customer"
          value="customer"
          name="user"
        />
        <Label htmlFor="customer">Customer</Label>

        <UserType
          type="radio"
          id="host"
          value="host"
          name="user"
          checked={userType === "host"}
          onChange={handleChange}
        />

        <Label htmlFor="host">Host</Label>
      </RadioButtons>
      <Bottom>
        <Button type="button" onClick={handleClick}>
          Next
        </Button>
      </Bottom>
    </Wrapper>
  );
};
const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 auto;
  background: var(--color-honeydew);
  margin-top: 20px;
  height: calc(100vh - 120px);
  //height: fit-content;
  position: fixed;
  //padding-top: 15px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: var(--padding-page) 18px;
`;

const Title = styled.div`
  display: flex;
  font-size: 20px;
  justify-content: center;
  width: 300px;
  margin-top: 20px;
`;

const RadioButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0px;

  width: 300px;
`;

const Label = styled.label`
  font-size: 18px;
  color: black;
  margin-right: 30px;
  text-align: left;
`;
const UserType = styled.input`
  margin-right: -5px;
`;
const Button = styled.button`
  height: 30px;
  width: 90px;
  margin: 5px;
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

const Bottom = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default CustomerSignIn;
