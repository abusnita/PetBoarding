import React, { Component } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";

const ServiceLogIn = () => {
  return <Wrapper>Service Provider Sign In</Wrapper>;
};
const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  background: var(--color-honeydew);
  top: 500px;
  height: calc(100vh - 160px);
  padding: var(--padding-page) 18px;
`;

export default ServiceLogIn;
