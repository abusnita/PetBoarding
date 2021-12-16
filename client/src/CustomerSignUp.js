import React, { Component } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import SignUpForm from "./SignUpForm";

const CustomerSignUp = () => {
  return <SignUpForm />;
};
const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  background: var(--color-honeydew);
  //top: 500px;
  // height: calc(100vh - 120px);
  height: fit-content;
  padding: var(--padding-page) 18px;
`;

export default CustomerSignUp;
