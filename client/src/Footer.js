import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { PetBoardingContext } from "./PetBoardingContext";

const Footer = () => {
  const history = useHistory();
  const { signedInUser, setSignedInUser, setUserType } =
    useContext(PetBoardingContext);

  const logOut = () => {
    sessionStorage.clear("userType");
    sessionStorage.clear("signedInUser");
    sessionStorage.clear("bookingCriteria");
    sessionStorage.clear("matches");
    sessionStorage.clear("selectedMatch");
    sessionStorage.clear("reservation");
    setSignedInUser(null);
    setUserType("customer");
    history.push("/");
  };
  return (
    <Wrapper>
      <LogoWrapper>
        <LogoPic
          src="https://res.cloudinary.com/dclu5h6eg/image/upload/v1639498722/Pet%20Boarding/Logo_footer_lmtqtb.png"
          alt=""
        />
      </LogoWrapper>

      {signedInUser && (
        <LogoutSection>
          <LogOut onClick={logOut}>Log out</LogOut>
        </LogoutSection>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  background: var(--color-ming);
  height: 40px;
  padding: var(--padding-page) 18px;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
`;
const LogOut = styled.button`
  background: transparent;
  display: flex;
  align-items: center;
  margin-top: 10px;
  border: none;
  font-size: 24px;
  border-radius: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  &:hover {
    background: var(--color-middle-blue-green);
    border-color: white;
  }
`;
const LogoWrapper = styled.div`
  width: calc(100vw - 100px);
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
`;
const LogoPic = styled.img`
  height: 40px;
`;
const LogoutSection = styled.div`
  width: 100px;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
`;

export default Footer;
