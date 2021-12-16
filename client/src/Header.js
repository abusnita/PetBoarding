import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink, Link, useHistory } from "react-router-dom";
import { BiUser, BiSearchAlt2 } from "react-icons/bi";
import { CustomerContext } from "./Reducers/CustomerReducer";
import { FaSmile } from "react-icons/fa";

const Header = () => {
  const history = useHistory();

  const { signedInUser } = useContext(CustomerContext);
  const goToHomePage = () => {
    history.push("/");
  };
  console.log(signedInUser);
  return (
    <Wrapper>
      {/* <StyledNavLink to="/">Home</StyledNavLink> */}
      <LogoLink onClick={goToHomePage}>
        <LogoPic
          src="https://res.cloudinary.com/dclu5h6eg/image/upload/v1639498719/Pet%20Boarding/Logo-ming_zrbl1q.png"
          alt=""
        />
        {/* <h1>Pet Boarding</h1> */}
      </LogoLink>
      <StyledNavLink to="/Search">
        <BiSearchAlt2 size={28} />
      </StyledNavLink>
      <RightSide>
        {!signedInUser ? (
          <SignInLink to="/CustomerSignIn">Sign in</SignInLink>
        ) : (
          <>
            <Greeting>
              Hi {signedInUser.firstName}! <FaSmile />
            </Greeting>
            {signedInUser.avatarUrl && <Avatar src={signedInUser.avatarUrl} />}
          </>
        )}
        <StyledNavLink to="/Profile">
          <BiUser size={28} />
        </StyledNavLink>
      </RightSide>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-ming);
  height: 80px;
  padding: var(--padding-page) 18px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
const LogoLink = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.02);
    transform: translate(5px);
  }
`;
const LogoPic = styled.img`
  height: 80px;
`;

const StyledNavLink = styled(NavLink)`
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font-body);
  font-size: 18px;
  height: 42px;
  margin: 0 0 0 8px;
  padding: 0 14px;
  text-decoration: none;
  transition: all ease 200ms;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    transform: scale(1.2);
    //transform: translate(5px);
  }
`;
const SignInLink = styled(Link)`
  font-size: 24px;
  font-family: var(--font-body);
  color: white;
  text-decoration: none;
  padding-right: 40px;
  cursor: pointer;
  transition: all ease 200ms;
  &:hover {
    font-size: 26px;
    //transform: translate(5px);
  }
`;

const RightSide = styled.div`
  width: 50vw;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const Greeting = styled.span`
  display: flex;
  align-items: center;
  font-size: 24px;
  width: 220px;
  justify-content: space-between;
  font-family: var(--font-body);
  color: white;
  padding-right: 40px;
`;
export default Header;
