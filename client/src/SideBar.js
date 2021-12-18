import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { PetBoardingContext } from "./PetBoardingContext";
const SideBar = () => {
  const { signedInUser, userType } = useContext(PetBoardingContext);
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
      {userType !== "host" && (
        <StyledNavLink to="/Step1_Pets">Find a host now</StyledNavLink>
      )}
      {userType === "host" && signedInUser && (
        <StyledNavLink to="/Availabilities">
          Current availabilities
        </StyledNavLink>
      )}
    </SideBarWrapper>
  );
};

const SideBarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px 20px;
  width: 20vw;
  height: calc(100vh - 120px);
  bottom: 0;
  left: 0;
  top: 80px;
  position: fixed;
  font-family: var(--font-side-bar);
  background-color: var(--color-middle-blue-green);
  color: white;
`;

const P = styled.p`
  padding-bottom: 20px;
  font-family: var(--font-side-bar);
  font-size: 28px;
`;

const StyledNavLink = styled(NavLink)`
  background: transparent;
  border: 1px solid transparent;
  border-radius: 8px;
  font-family: var(--font-side-bar);
  color: var(--color-alabama-crimson);
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 40px;
  margin-top: 60px;
  padding: 10px 10px;
  width: 100%;
  text-decoration: none;
  transition: all ease 400ms;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    background: var(--color-ming);
    border-color: white;
  }
`;
export default SideBar;
