import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { PetBoardingContext } from "./PetBoardingContext";
import CircularProgress from "@material-ui/core/CircularProgress";

const Matches = () => {
  const { matches, bookingCriteria } = useContext(PetBoardingContext);

  return (
    <Wrapper>
      {!matches || !bookingCriteria.dates ? (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      ) : (
        <>
          <Title>Results matching your criteria:</Title>

          {matches.map((match) => {
            return (
              <Result key={match._id} to={`/matches/${match._id}`}>
                {match.company && (
                  <ValueWrapper>
                    <Bold>Company:</Bold>
                    <Value>{match?.company}</Value>
                  </ValueWrapper>
                )}
                <ValueWrapper>
                  <Bold>Name:</Bold>{" "}
                  <Value>
                    {`${match.firstName}` + " " + `${match.lastName}`}
                  </Value>
                </ValueWrapper>
                <ValueWrapper>
                  <Bold>Address:</Bold>
                  <Value>
                    {`${match?.address.street}` +
                      ", " +
                      `${match?.address.city}` +
                      ", " +
                      `${match?.address.province}` +
                      ", " +
                      `${match?.address.postalCode}` +
                      ", " +
                      `${match?.address.country}`}
                  </Value>
                </ValueWrapper>
                <ValueWrapper>
                  <Bold>Phone number:</Bold>
                  <Value> {match.phoneNumber}</Value>
                </ValueWrapper>
                <ValueWrapper>
                  <Bold>Email:</Bold>
                  <Value> {match.account.email}</Value>
                </ValueWrapper>
                <ValueWrapper>
                  <Bold>Prices:</Bold>
                  <Value>
                    Cats {match.capabilities.cats.price}$/day, Dogs{" "}
                    {match.capabilities.dogs.price}$/day
                  </Value>
                </ValueWrapper>
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
  background: var(--color-cornsilk);
  min-height: 100vh;
  margin-left: 800px;
  margin-top: 40px;
  margin-bottom: 200px;
`;
const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Title = styled.div`
  display: flex;
  font-size: 28px;
  font-style: italic;
  font-weight: bold;
  color: var(--color-ming);
  justify-content: center;
  width: 500px;
  margin-bottom: 10px;
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

  &:hover {
    transform: scale(1.1);
  }
`;
const ValueWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 10px;
`;

const Value = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
`;

const Bold = styled.div`
  font-weight: bold;
  padding-right: 5px;
  width: 120px;
`;

export default Matches;
