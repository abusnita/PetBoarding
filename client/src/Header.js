import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink, Link, useHistory } from "react-router-dom";
import { BiUser, BiSearchAlt2 } from "react-icons/bi";
import { PetBoardingContext } from "./PetBoardingContext";
import { FaSmile } from "react-icons/fa";

const Header = () => {
  const history = useHistory();

  const { signedInUser } = useContext(PetBoardingContext);
  const goToHomePage = () => {
    history.push("/");
  };
  console.log(signedInUser);
  return (
    <Wrapper>
      <LogoLink onClick={goToHomePage}>
        <LogoPic
          src="https://res.cloudinary.com/dclu5h6eg/image/upload/v1639498719/Pet%20Boarding/Logo-ming_zrbl1q.png"
          alt=""
        />
      </LogoLink>
      <StyledNavLink to="/Search">
        <BiSearchAlt2 size={28} />
      </StyledNavLink>
      <RightSide>
        {!signedInUser ? (
          <SignInLink to="/SignInStart">Sign in</SignInLink>
        ) : (
          <>
            <Greeting>
              {signedInUser.avatarUrl && (
                <Avatar src={signedInUser.avatarUrl} />
              )}
              <Span>Hi {signedInUser.firstName}!</Span>
              <FaSmile />
            </Greeting>
          </>
        )}
        {signedInUser && (
          <StyledNavLink to={`/Profile/${signedInUser._id}`}>
            <BiUser size={28} />
          </StyledNavLink>
        )}
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
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
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

const Span = styled.span`
  margin-right: 10px;
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
  justify-content: center;
  font-family: var(--font-body);
  color: white;
  padding-right: 40px;
`;
export default Header;
