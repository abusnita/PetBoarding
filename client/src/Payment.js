import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { PetBoardingContext } from "./PetBoardingContext";

const Payment = () => {
  const initialPaymentInfo = {
    creditCard: "",
    exYear: "",
    exMonth: "",
  };
  const {
    signedInUser,
    selectedMatch,
    setSelectedMatch,
    bookingCriteria,
    setBookingCriteria,
    setReservation,
  } = useContext(PetBoardingContext);
  const [paymentInfo, setPaymentInfo] = useState(initialPaymentInfo);

  const history = useHistory();

  const handleInfo = (event) => {
    setPaymentInfo({ ...paymentInfo, [event.target.id]: event.target.value });
  };

  let month = new Date().getMonth() + 1;
  let year = Number(new Date().getYear().toString().substring(1));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (paymentInfo.exMonth < month && paymentInfo.exYear < year) {
      return <h1>The credit card you have provided is expired.</h1>;
    }

    fetch("/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        signedInUser: signedInUser,
        selectedMatch: selectedMatch,
        paymentInfo: paymentInfo,
        bookingCriteria: bookingCriteria,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 201) {
          console.log(data);
          window.sessionStorage.clear("selectedMatch");
          setSelectedMatch(null);
          setBookingCriteria(null);
          setPaymentInfo(initialPaymentInfo);
          window.sessionStorage.setItem(
            "reservation",
            JSON.stringify(data.data)
          );
          setReservation(data.data);
          history.push("/ConfirmationPage");
        } else {
          return <h1>An error has occured. Please check the info provided</h1>;
        }
      });
  };

  return (
    <Wrapper>
      <Title>
        Please verify your information and complete payment section below:
      </Title>
      <Content>
        <ValueWrapper>
          <Bold>Name:</Bold>{" "}
          <Value>
            {`${signedInUser.firstName}` + " " + `${signedInUser.lastName}`}
          </Value>
        </ValueWrapper>
        <ValueWrapper>
          <Bold>Address:</Bold>
          <Value>
            {`${signedInUser.address.street}` +
              ", " +
              `${signedInUser.address.city}` +
              ", " +
              `${signedInUser.address.province}` +
              ", " +
              `${signedInUser.address.postalCode}` +
              ", " +
              `${signedInUser.address.country}`}
          </Value>
        </ValueWrapper>
        <ValueWrapper>
          <Bold>Phone number:</Bold>
          <Value> {signedInUser.phoneNumber}</Value>
        </ValueWrapper>
        <ValueWrapper>
          <Bold>Email:</Bold>
          <Value> {signedInUser.account.email}</Value>
        </ValueWrapper>
      </Content>

      <Form onSubmit={handleSubmit}>
        <Label>
          Credit card #:
          <Input
            type="text"
            placeholder="Credit card number"
            id="creditCard"
            value={paymentInfo.creditCard}
            onChange={handleInfo}
            required
          />
        </Label>
        <Label>
          Expiry:
          <ExpiryDate
            value={paymentInfo.exMonth}
            id="exMonth"
            onChange={handleInfo}
            type="text"
            placeholder="MM"
            name="month"
            maxLength="2"
            size="2"
            required
          />
          <Div>/</Div>
          <ExpiryDate
            value={paymentInfo.exYear}
            id="exYear"
            onChange={handleInfo}
            type="text"
            name="year"
            placeholder="YY"
            maxLength="2"
            size="2"
            required
          />
        </Label>
        <Bottom>
          <Submit type="submit">Send request</Submit>
        </Bottom>
      </Form>
    </Wrapper>
  );
};

export default Payment;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-left: 30px;
  min-height: 100vh;
  margin-left: 800px;
  margin-top: 200px;
`;
const ExpiryDate = styled.input`
  height: 15px;
  width: 64px;
  padding: 8px;
  margin: 5px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid grey;
`;

const Title = styled.div`
  display: flex;
  font-size: 28px;
  font-style: italic;
  font-weight: bold;
  padding-left: 40px;
  padding-bottom: 40px;

  color: var(--color-ming);
  justify-content: center;
  width: 500px;
  margin-bottom: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid grey;
  margin-top: 40px;
  height: 180px;
  width: 400px;
`;

const Label = styled.label`
  font-size: 14px;
  width: 320px;
  margin-left: -100px;
  align-items: center;
  font-weight: bold;
  display: flex;
  justify-content: flex-end;
  color: black;
`;

const Input = styled.input`
  width: 180px;
  height: 15px;
  padding: 8px;
  margin: 5px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid grey;
`;

const Button = styled.button`
  height: 30px;
  width: 220px;
  margin: 20px 5px 5px 5px;
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
const Submit = styled(Button)`
  width: 90px;
  margin-top: 20px;
`;
const Bottom = styled.div`
  width: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
`;

const ValueWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 10px;
`;
const Value = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 20px;
  flex: 1;
`;
const Div = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
`;
const Bold = styled.div`
  font-weight: bold;
  padding-right: 5px;
  width: 120px;
`;
