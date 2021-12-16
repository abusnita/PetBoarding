import React, { Component } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import CustomerSignIn from "./CustomerSignIn";
import ServiceLogIn from "./ServiceLogIn";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
const Home = () => {
  return (
    <Wrapper>
      {/* Please chose one of the following
      <Links>
        <StyledNavLink to="/">Home</StyledNavLink>
      </Links> */}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  //justify-content: space-between;
  //background: lightgrey;
  //position: relative;
  //top: 500px;
  /* height: calc(100vh - 160px);
  left: 160px; */
  //padding: var(--padding-page) 18px;
`;

export default Home;
