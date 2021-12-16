import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { CustomerContext } from "../src/Reducers/CustomerReducer";
const SideBar = () => {
  const { signedInUser, userType } = useContext(CustomerContext);
  return (
    <SideBarWrapper>
      <div>
        <P>Looking for a temporary home for your pets for vacation time?</P>
        <P>
          Or maybe you just need somebody to pass by your place to feed and walk
          your pets while you are away?
        </P>
        <P>Do you want to offer your pet care services?</P>
        <P>
          At PetBoarding we are looking into connecting pet owners with pet
          hosts based on matching criteria such as competencies, type of care,
          schedule, location, and price.
        </P>
      </div>
      {!(signedInUser && userType === "host") && (
        <StyledNavLink to="/Step1_Pets">Find a host now</StyledNavLink>
      )}
      {/* {!signedInUser && (
        <StyledNavLink to="/CustomerSignIn">Sign in</StyledNavLink>
      )} */}
      {/* <Customers>
        <h1>Customers</h1>
        <StyledNavLink to="/CustomerSignUp">Create account</StyledNavLink>
        <StyledNavLink to="/CustomerSignIn">
          Log in with existing account
        </StyledNavLink>
      </Customers>
      <ServiceProviders>
        <h1>Service Providers</h1>
        <StyledNavLink to="/ServiceSignUp">Create account</StyledNavLink>
        <StyledNavLink to="/ServiceSignIn">
          Log in with existing account
        </StyledNavLink>
      </ServiceProviders> */}
    </SideBarWrapper>
  );
};

const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  //height: calc(100vh - 120px);

  //flex: 0.3;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px 20px;
  width: 250px;
  // width: fit-content;
  font-family: var(--font-side-bar);
  background-color: var(--color-middle-blue-green);
  color: white;
`;

const Customers = styled.div`
  display: flex;
  flex-direction: column;
  //height: calc(100vh - 160px);
  //justify-content: flex-start;
  //align-items: flex-start;
  //padding: 20px 20px;
  //width: 250px;
  background-color: var(--color-desert-sand);
  color: var(--color-alabama-crimson);
`;
const P = styled.p`
  padding-bottom: 20px;
  font-family: var(--font-side-bar);
  font-size: 20px;
  //font-weight: bold;
`;

const StyledNavLink = styled(NavLink)`
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  font-family: var(--font-side-bar);
  color: var(--color-alabama-crimson);
  //display: flex;
  //justify-content: center;
  //align-items: center;
  //font-family: var(--font-body);
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 40px;
  //height: 20px;
  padding: 5px 0px;
  //margin: 5px 0px;
  width: 100%;
  text-decoration: none;
  transition: all ease 400ms;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background: var(--color-alabama-crimson);
    color: var(--color-selective-yellow);
    border-color: var(--color-selective-yellow);
  }
`;
export default SideBar;
