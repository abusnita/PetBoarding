import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import SignInForm from "./SignInForm";
import { CustomerContext } from "./Reducers/CustomerReducer";
import CircularProgress from "@material-ui/core/CircularProgress";
const Matches = () => {
  const { matches } = useContext(CustomerContext);
  const history = useHistory();
  console.log(matches);
  const handleClick = () => {
    //history.push("/SignIn");
  };
  return (
    <Wrapper>
      {!matches ? (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      ) : (
        <>
          <Title>Results matching your criteria:</Title>

          {matches.map((match) => {
            console.log(match._id);
            return (
              <Result key={match._id} to={`/matches/${match._id}`}>
                {match.company && (
                  <CompanyWrapper>
                    <Bold>Company:</Bold>
                    <Company>{match?.company}</Company>
                  </CompanyWrapper>
                )}
                <NameWrapper>
                  <Bold>Name:</Bold>{" "}
                  <Name>
                    {`${match.firstName}` + " " + `${match.lastName}`}
                  </Name>
                </NameWrapper>
                <AddressWrapper>
                  <Bold>Address:</Bold>
                  <Address>
                    {`${match?.address.street}` +
                      ", " +
                      `${match?.address.city}` +
                      ", " +
                      `${match?.address.province}` +
                      ", " +
                      `${match?.address.postalCode}` +
                      ", " +
                      `${match?.address.country}`}
                  </Address>
                </AddressWrapper>
                <PhoneNumberWrapper>
                  <Bold>Phone number:</Bold>
                  <PhoneNumber> {match.phoneNumber}</PhoneNumber>
                </PhoneNumberWrapper>
                <EmailWrapper>
                  <Bold>Email:</Bold>
                  <Email> {match.account.email}</Email>
                </EmailWrapper>
                {/* <P>Pets availabilities: </P> */}
                {/* <Pets>
            Cats {match.capabilities.cats.available}, Dogs{" "}
            {match.capabilities.dogs.available}
          </Pets> */}
                <PriceWrapper>
                  <Bold>Prices:</Bold>
                  <Price>
                    Cats {match.capabilities.cats.price}$/day, Dogs{" "}
                    {match.capabilities.dogs.price}$/day
                  </Price>
                </PriceWrapper>
              </Result>
            );
          })}
        </>
      )}
    </Wrapper>
  );
};
const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* width: 300px;
  top: 300px;
  left: 400px; */
  background: var(--color-cornsilk);
  margin: 40px 40px;
  //width: 300px;
  //height: calc(100vh - 120px);
  //height: fit-content;
  //position: absolute;
  //padding-top: 15px;
  /* left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: var(--padding-page) 18px; */
`;
const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;
const Title = styled.div`
  display: flex;
  font-size: 20px;
  justify-content: center;
  width: 500px;
  margin-bottom: 20px;
`;

const Result = styled(Link)`
  display: flex;
  text-decoration: none;
  flex-direction: column;
  margin: 20px 20px 20px 40px;
  color: white;
  background-color: var(--color-ming);
  box-shadow: 5px 10px 8px 10px #888888;
  padding: 15px;
  max-width: 400px;
  cursor: pointer;

  transition: all ease 400ms;

  /* &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  } */

  &:hover {
    transform: scale(1.1);
  }
`;
const CompanyWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 10px;
`;

const Company = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
`;
const NameWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 10px;
`;
const Name = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
`;
const AddressWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 10px;
`;
const Address = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
`;
const PhoneNumberWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 10px;
`;
const PhoneNumber = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
`;
const EmailWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 10px;
`;
const Email = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
`;
const P = styled.div``;
const Pets = styled.div``;
const PriceWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 10px;
`;
const Price = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
`;
const Bold = styled.div`
  font-weight: bold;
  padding-right: 5px;
  width: 120px;
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

export default Matches;
