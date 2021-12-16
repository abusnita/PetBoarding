import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink, useHistory } from "react-router-dom";
import { CustomerContext } from "./Reducers/CustomerReducer";

const Footer = () => {
  const history = useHistory();
  const { signedInUser, setSignedInUser, setUserType } =
    useContext(CustomerContext);

  const logOut = () => {
    sessionStorage.clear("token");
    setSignedInUser(null);
    setUserType("customer");
    history.push("/");
  };
  return (
    <Wrapper>
      {/* <StyledNavLink to="/About">About</StyledNavLink> */}
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
`;
const LogOut = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
`;
const LogoWrapper = styled.div`
  width: calc(100vw - 100px);
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
`;
const LogoPic = styled.img`
  height: 40px;
  //mix-blend-mode: multiply;
`;
const LogoutSection = styled.div`
  width: 100px;
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
`;
const Nav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const StyledNavLink = styled(NavLink)`
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-heading);
  font-size: 18px;
  height: 42px;
  margin: 0 0 0 8px;
  padding: 0 14px;
  //width: 100%;
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

export default Footer;
