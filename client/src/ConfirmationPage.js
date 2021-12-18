import React, { useContext } from "react";
import styled from "styled-components";
import { PetBoardingContext } from "./PetBoardingContext";
import moment from "moment";

const ConfirmationPage = () => {
  const { reservation } = useContext(PetBoardingContext);
  const a = moment(reservation.dates.start);
  const b = moment(reservation.dates.end);
  const {
    pets: { cats, dogs },
  } = reservation;

  return (
    <Wrapper>
      <Title>Your reservation is confirmed!</Title>
      {reservation && (
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
            <Value>{reservation.serviceType}</Value>
          </ValueWrapper>
          <Section>
            <P>
              The pet
              {Number(cats) + Number(dogs) > 1 && <p>s</p>} will be in the care
              of:
            </P>
            {reservation.provider.company && (
              <ValueWrapper>
                <Bold>Company:</Bold>
                <Value>{reservation.provider.Company}</Value>
              </ValueWrapper>
            )}
            <ValueWrapper>
              <Bold>Name:</Bold>{" "}
              <Value>
                {`${reservation.provider.firstName}` +
                  " " +
                  `${reservation.provider.lastName}`}
              </Value>
            </ValueWrapper>
            <ValueWrapper>
              <Bold>Phone number:</Bold>
              <Value> {reservation.provider.phoneNumber}</Value>
            </ValueWrapper>
            <ValueWrapper>
              <Bold>Email:</Bold>
              <Value> {reservation.provider.email}</Value>
            </ValueWrapper>
          </Section>
          <Bottom>
            <Section></Section>
            <TotalWrapper>
              <P>Reservation total:</P>
              <Total>{reservation.total}$</Total>
            </TotalWrapper>
          </Bottom>
        </Result>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: var(--color-cornsilk);
  min-height: 100vh;
  margin-left: 800px;
  margin-top: 200px;
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

const Value = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 40px;
  flex: 1;
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

const Bottom = styled.div`
  display: flex;
  align-items: top;
`;

export default ConfirmationPage;
