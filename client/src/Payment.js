import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { CustomerContext } from "./Reducers/CustomerReducer";

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
  } = useContext(CustomerContext);
  const [paymentInfo, setPaymentInfo] = useState(initialPaymentInfo);

  const history = useHistory();

  const handleInfo = (event) => {
    setPaymentInfo({ ...paymentInfo, [event.target.id]: event.target.value });
  };

  //let currentYear = Number(year.substring(1));

  let month = new Date().getMonth() + 1;
  let year = Number(new Date().getYear().toString().substring(1));
  //let currentMonth = month + 1

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

  //   const clearForm = () => {
  //     setLogInfo(initialLogInfo);
  //   };
  //   const createAccount = () => {
  //     history.push("/SignUp");
  //   };
  return (
    <Wrapper>
      <Title>
        Please verify your information and complete payment section below:
      </Title>
      <Content>
        <NameWrapper>
          <Bold>Name:</Bold>{" "}
          <Name>
            {`${signedInUser.firstName}` + " " + `${signedInUser.lastName}`}
          </Name>
        </NameWrapper>
        <AddressWrapper>
          <Bold>Address:</Bold>
          <Address>
            {`${signedInUser.address.street}` +
              ", " +
              `${signedInUser.address.city}` +
              ", " +
              `${signedInUser.address.province}` +
              ", " +
              `${signedInUser.address.postalCode}` +
              ", " +
              `${signedInUser.address.country}`}
          </Address>
        </AddressWrapper>
        <PhoneNumberWrapper>
          <Bold>Phone number:</Bold>
          <PhoneNumber> {signedInUser.phoneNumber}</PhoneNumber>
        </PhoneNumberWrapper>
        <EmailWrapper>
          <Bold>Email:</Bold>
          <Email> {signedInUser.account.email}</Email>
        </EmailWrapper>
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
  justify-content: center;
  align-items: center;
  padding-left: 30px;
  position: fixed;
  padding-top: 15px;
  height: calc(100vh - 120px);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
  justify-content: center;
  font-size: 20px;
  padding-bottom: 40px;
  margin-left: 60px;
  width: 430px;
  margin-top: 20px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid grey;
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
  //text-decoration: none;
  flex-direction: column;
  width: 370px;

  //margin-left: 60px;
  //margin: 20px 20px 20px 40px;
  // color: white;
  // background-color: var(--color-ming);
  // box-shadow: 5px 10px 8px 10px #888888;
  // padding: 15px;
  //max-width: 400px;
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
const Div = styled.div`
  /* display: flex;
  justify-content: center; */
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
`;
const Bold = styled.div`
  font-weight: bold;
  padding-right: 5px;
  width: 120px;
`;
