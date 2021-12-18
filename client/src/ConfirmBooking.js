import React, { useContext } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { PetBoardingContext } from "./PetBoardingContext";
import moment from "moment";

const ConfirmBooking = () => {
  const { matchId } = useParams();
  const { userType, signedInUser, matches, bookingCriteria, setSelectedMatch } =
    useContext(PetBoardingContext);
  const match = matches.find((provider) => provider._id === matchId);
  const {
    pets: { cats, dogs },
  } = bookingCriteria;
  const a = moment(bookingCriteria.dates.start);
  const b = moment(bookingCriteria.dates.end);
  const days = b.diff(a, "days") + 1;

  const history = useHistory();

  const handleSubmit = () => {
    setSelectedMatch({
      ...match,
      total:
        Number(cats) * days * match.capabilities.cats.price +
        Number(dogs) * days * match.capabilities.dogs.price,
    });
    window.sessionStorage.setItem(
      "selectedMatch",
      JSON.stringify({
        ...match,
        total:
          Number(cats) * days * match.capabilities.cats.price +
          Number(dogs) * days * match.capabilities.dogs.price,
      })
    );
    if (signedInUser && userType !== "host") {
      history.push("/Payment");
    } else {
      history.push("/SignIn");
    }
  };

  return (
    <Wrapper>
      <Title>Please confirm selected booking:</Title>
      <Result onSubmit={handleSubmit}>
        <ValueWrapper>
          <Bold>Dates:</Bold>{" "}
          <Section>
            <Value>First day: {a.format("ddd MMM Do, YYYY")}</Value>
            <Value>Last day: {b.format("ddd MMM Do, YYYY")}</Value>
          </Section>
        </ValueWrapper>
        <ValueWrapper>
          <Bold>Pets:</Bold>
          <Value>
            {cats !== "" && (
              <div>
                {cats} cat
                {Number(cats) > 1 && <span>s</span>}
              </div>
            )}
            {cats !== "" && dogs !== "" && <span>, </span>}
            {dogs !== "" && (
              <div>
                {dogs} dog
                {Number(dogs) > 1 && <span>s</span>}
              </div>
            )}
          </Value>
        </ValueWrapper>
        <ValueWrapper>
          <Bold>Type of service requested:</Bold>
          <Value>{bookingCriteria.serviceType}</Value>
        </ValueWrapper>
        <Section>
          <P>
            The pet
            {Number(cats) + Number(dogs) > 1 && <p>s</p>} will be in the care
            of:
          </P>
          {match.company && (
            <ValueWrapper>
              <Bold>Company:</Bold>
              <Value>{match.Company}</Value>
            </ValueWrapper>
          )}
          <ValueWrapper>
            <Bold>Name:</Bold>{" "}
            <Value>{`${match.firstName}` + " " + `${match.lastName}`}</Value>
          </ValueWrapper>
          <ValueWrapper>
            <Bold>Address:</Bold>
            <Value>
              {`${match.address.street}` +
                ", " +
                `${match.address.city}` +
                ", " +
                `${match.address.province}` +
                ", " +
                `${match.address.postalCode}` +
                ", " +
                `${match.address.country}`}
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
        </Section>
        <Bottom>
          <Section>
            <P>Prices:</P>
            <PricesWrapper>
              {cats !== "" && (
                <Prices>
                  {cats} cat
                  {Number(cats) > 1 && <p>s</p>}, {days} days x{" "}
                  {match.capabilities.cats.price}$/day
                </Prices>
              )}
              {dogs !== "" && (
                <Prices>
                  {dogs} dog
                  {Number(dogs) > 1 && <p>s</p>},{days}days x{" "}
                  {match.capabilities.dogs.price}$/day
                </Prices>
              )}
            </PricesWrapper>
          </Section>
          <TotalWrapper>
            <P>Reservation total:</P>
            <Total>
              {Number(cats) * days * match.capabilities.cats.price +
                Number(dogs) * days * match.capabilities.dogs.price}
              $
            </Total>
          </TotalWrapper>
        </Bottom>
        <ButtonSection>
          <Button type="submit">CONFIRM</Button>
        </ButtonSection>
      </Result>
    </Wrapper>
  );
};
const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background: var(--color-cornsilk);
  min-height: 100vh;
  margin-left: 800px;
  margin-top: 140px;
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

const Result = styled.form`
  display: flex;
  flex-direction: column;
  margin: 20px 20px 20px 40px;
  color: white;
  background-color: var(--color-ming);
  box-shadow: 5px 10px 8px 10px #888888;
  padding: 15px;
  max-width: 460px;
`;
const P = styled.div`
  padding: 15px 0px;
  font-weight: bold;
  font-style: italic;
  text-decoration: underline;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const TotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1.6;
`;

const ValueWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
`;
const PricesWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  flex: 1;
`;
const Value = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 40px;
  flex: 1;
  font-size: 14px;
`;
const Prices = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;
const Total = styled.div`
  display: flex;
  justify-content: flex-start;
  font-size: 22px;
  padding-left: 40px;
  flex: 1;
`;
const Bold = styled.div`
  font-weight: bold;
  font-size: 14px;
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
  display: flex;
  align-items: top;
`;
const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default ConfirmBooking;
