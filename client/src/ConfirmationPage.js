import React, { useContext } from "react";
import styled from "styled-components";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { CustomerContext } from "./Reducers/CustomerReducer";
import moment from "moment";

const ConfirmationPage = () => {
  const { reservation } = useContext(CustomerContext);
  console.log(reservation);
  const a = moment(reservation.bookingCriteria.dates.start);
  const b = moment(reservation.bookingCriteria.dates.end);
  console.log(a);
  console.log(b);
  const days = b.diff(a, "days") + 1;

  //console.log(days);
  const history = useHistory();
  //   console.log(match);
  //   console.log(bookingCriteria);

  const handleClick = () => {
    history.push("/");
  };
};

return (
  <Wrapper>
    <Title>Your reservation is confirmed!</Title>
    <Result>
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
            <Cats>
              {cats} cat
              {Number(cats) > 1 && <p>s</p>}
            </Cats>
          )}
          {cats !== "" && dogs !== "" && <p>, </p>}
          {dogs !== "" && (
            <Dogs>
              {dogs} dog
              {Number(dogs) > 1 && <p>s</p>}
            </Dogs>
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
          {Number(cats) + Number(dogs) > 1 && <p>s</p>} will be in the care of:
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
      {/* <ButtonSection>
          <Button type="button">Ok</Button>
        </ButtonSection> */}
    </Result>
  </Wrapper>
);

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* width: 300px;
  top: 300px;
  left: 400px; */
  background: var(--color-cornsilk);
  margin: 20px 40px;
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
const Title = styled.div`
  display: flex;
  font-size: 20px;
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
  //padding-right: 10px;
  flex: 1;
`;
const TotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  //padding-right: 10px;
  flex: 1.6;
`;
const Cats = styled.div``;
const Dogs = styled.div``;
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
  //padding-left: 20px;
  //flex: 1;
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
  //width: 300px;
  display: flex;
  //justify-content: center;
  align-items: top;
`;
const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default ConfirmationPage;
