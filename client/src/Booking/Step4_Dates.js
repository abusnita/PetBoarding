import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { PetBoardingContext } from "../PetBoardingContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import addDays from "date-fns/addDays";

const Step4_Dates = () => {
  const initialDates = {
    start: "",
    end: "",
  };

  const [dates, setDates] = useState(initialDates);
  const history = useHistory();
  const { bookingCriteria, setBookingCriteria, setMatches } =
    useContext(PetBoardingContext);

  const handleStartDate = (date) => {
    setDates({ ...dates, start: date });
  };

  const handleEndDate = (date) => {
    setDates({ ...dates, end: date });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setBookingCriteria({ ...bookingCriteria, dates: dates });
    fetch("/bookingCriteria/matches/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        data: bookingCriteria,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setMatches(data.data);
          window.sessionStorage.setItem("matches", JSON.stringify(data.data));
          window.sessionStorage.setItem(
            "bookingCriteria",
            JSON.stringify(bookingCriteria)
          );
          history.push("/matches");
        } else {
          return <h1>An error has occured. Please check the info provided</h1>;
        }
      });
  };

  return (
    <Wrapper>
      <Title>Please select the dates you are interested in:</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Start Date:</Label>
        <DatePicker
          selected={dates.start}
          dateFormat="dd-MM-yyyy"
          shouldCloseOnSelect="false"
          minDate={new Date()}
          maxDate={addDays(new Date(), 6)}
          onChange={handleStartDate}
        />
        <Label>End Date:</Label>
        <DatePicker
          selected={dates.end}
          dateFormat="dd-MM-yyyy"
          shouldCloseOnSelect="false"
          minDate={new Date()}
          maxDate={addDays(new Date(), 6)}
          onChange={handleEndDate}
        />
        <Button type="submit">Next</Button>
      </Form>
    </Wrapper>
  );
};
export default Step4_Dates;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-left: 800px;
  margin-top: 300px;
`;

const Title = styled.div`
  display: flex;
  font-size: 28px;
  font-style: italic;
  padding-bottom: 40px;
  font-weight: bold;
  color: var(--color-ming);
  justify-content: center;
  width: 600px;
  margin-bottom: 10px;
`;
const Label = styled.div`
  font-size: 14px;
  min-width: 70px;
  display: flex;
  font-weight: bold;
  text-align: center;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  width: 600px;
  align-content: center;
  justify-content: center;
`;
const Button = styled.button`
  height: 30px;
  min-width: 90px;
  margin: 5px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  color: white;
  background-color: var(--color-buttons);
  transition: 200ms ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    font-size: 15px;
  }
`;
