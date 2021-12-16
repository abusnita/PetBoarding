import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { CustomerContext } from "../Reducers/CustomerReducer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import addDays from "date-fns/addDays";

const Step4_Dates = () => {
  const initialDates = {
    start: "",
    end: "",
  };

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dates, setDates] = useState(initialDates);
  const history = useHistory();
  const { bookingCriteria, setBookingCriteria, setMatches } =
    useContext(CustomerContext);

  const handleStartDate = (date) => {
    //setStartDate(moment(date).format("MMMM Do YYYY"));
    setDates({ ...dates, start: date });
  };

  const handleEndDate = (date) => {
    //setStartDate(moment(date).format("MMMM Do YYYY"));
    setDates({ ...dates, end: date });
  };

  // console.log(dates);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    // setBookingCriteria({ ...bookingCriteria, dates: dates });
    // window.sessionStorage.setItem(
    //   "bookingCriteria",
    //   JSON.stringify(bookingCriteria)
    // );
    //console.log(bookingCriteria);
    // history.push("/Step4_Dates");
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
        console.log(data);

        //console.log(bookingCriteria);
        if (data.status === 200) {
          console.log(data.data);
          setMatches(data.data);
          window.sessionStorage.setItem("matches", JSON.stringify(data.data));

          window.sessionStorage.setItem(
            "bookingCriteria",
            JSON.stringify(bookingCriteria)
          );
          console.log("success");
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
          maxDate={addDays(new Date(), 7)}
          onChange={handleStartDate}
          //   onChange={(date) =>
          //     setStartDate(moment(date).format("dddd MMMM Do YYYY"))
          //   }
        />
        <Label>End Date:</Label>
        <DatePicker
          selected={dates.end}
          dateFormat="dd-MM-yyyy"
          shouldCloseOnSelect="false"
          minDate={new Date()}
          maxDate={addDays(new Date(), 7)}
          onChange={handleEndDate}
          //   onChange={(date) =>
          //     setEndDate(moment(date).format("dddd MMMM Do YYYY"))
          // }
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
  padding-left: 100px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  width: 500px;
  margin-bottom: 20px;
  font-size: 18px;
`;
const Label = styled.div`
  font-size: 14px;
  min-width: 70px;
  //height: 20px;
  display: flex;
  font-weight: bold;
  text-align: center;
  align-items: center;
  //margin-right: 10px;
`;
const Form = styled.form`
  display: flex;
  width: 500px;
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
    //background-color: var(--color-hover);
    transform: scale(1.1);
    font-size: 15px;
  }
`;
