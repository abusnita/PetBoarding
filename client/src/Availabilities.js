import React, { useContext, useState } from "react";
import styled from "styled-components";
import { PetBoardingContext } from "./PetBoardingContext";
import moment from "moment";

const Availabilities = () => {
  const { signedInUser } = useContext(PetBoardingContext);

  return (
    <Wrapper>
      {signedInUser.capabilities && (
        <AvailabilitiesWrapper>
          <Title>Availabilities for the next 7 days</Title>

          <CalendarWrap>
            <Animal> Cats:</Animal>
            <Calendar>
              {signedInUser.capabilities.cats.available.map((entry, index) => {
                const date = new Date();
                const currentDate = date.setDate(date.getDate() + index);
                return (
                  <EntryWrapper>
                    <Week>
                      {moment(currentDate).format("ddd MMM Do, YYYY")}
                    </Week>
                    <Places>{entry}</Places>
                  </EntryWrapper>
                );
              })}
            </Calendar>
          </CalendarWrap>
          <CalendarWrap>
            <Animal> Dogs:</Animal>
            <Calendar>
              {signedInUser.capabilities.dogs.available.map((entry, index) => {
                const date = new Date();
                const currentDate = date.setDate(date.getDate() + index);
                return (
                  <EntryWrapper>
                    <Week>
                      {moment(currentDate).format("ddd MMM Do, YYYY")}
                    </Week>
                    <Places>{entry}</Places>
                  </EntryWrapper>
                );
              })}
            </Calendar>
          </CalendarWrap>
        </AvailabilitiesWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: var(--color-cornsilk);
  margin-left: 400px;
`;
const EntryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
`;
const Week = styled.div`
display: flex;
justify-content = center;
`;

const Places = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;
const AvailabilitiesWrapper = styled.div`
  display: flex;
  height: 300px;
  width: 820px;
  color: white;
  padding: 20px;
  margin-left: 200px;
  flex-direction: column;
  justify-content: center;
  background: var(--color-ming);
  border-radius: 20px;
`;
const Calendar = styled.div`
  display: grid;
  height: 70px;
  grid-template-columns: repeat(7, 80px);
  grid-gap: 20px;
  font-size: 14px;
  margin-left: 20px;
  padding-left: 10px;
  padding-right: 10px;
`;

const Animal = styled.div`
  display: flex;
`;
const CalendarWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid grey;
`;

const Title = styled.div`
  display: flex;
  font-size: 20px;
  justify-content: flex-start;
  width: 500px;
  margin-bottom: 40px;
`;

export default Availabilities;
