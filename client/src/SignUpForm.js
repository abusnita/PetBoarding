import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { PetBoardingContext } from "./PetBoardingContext";

const SignUpForm = () => {
  const initialUserInfo = {
    firstName: "",
    lastName: "",
    address: {
      street: "",
      city: "",
      province: "",
      postalCode: "",
      country: "",
    },
    phoneNumber: "",
    account: {
      email: "",
      password: "",
    },
    confirmPassword: "",
  };
  const { setSignedInUser, userType } = useContext(PetBoardingContext);
  const [userInfo, setUserInfo] = useState(initialUserInfo);

  const history = useHistory();
  const handleInfo = (event) => {
    setUserInfo({ ...userInfo, [event.target.id]: event.target.value });
  };
  const handleAddress = (event) => {
    setUserInfo({
      ...userInfo,
      address: {
        ...userInfo.address,
        [event.target.id]: event.target.value,
      },
    });
  };

  const handlePhoneNumber = (event) => {
    const previousValue = userInfo.phoneNumber;
    setUserInfo({
      ...userInfo,
      [event.target.id]: formatPhoneNumber(event.target.value, previousValue),
    });
  };

  const handleAccount = (event) => {
    setUserInfo({
      ...userInfo,
      account: {
        ...userInfo.account,
        [event.target.id]: event.target.value,
      },
    });
  };

  const formatPhoneNumber = (value, previousValue) => {
    if (!value) return value;
    const currentValue = value.replace(/[^\d]/g, "");
    if (!previousValue || value.length > previousValue.length) {
      if (currentValue.length < 4) return currentValue;
      if (currentValue.length < 7)
        return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
      return `(${currentValue.slice(0, 3)}) ${currentValue.slice(
        3,
        6
      )}-${currentValue.slice(6, 10)}`;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ user: userInfo, userType: userType }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status !== 201) {
          return <h1>An error has occured. Please check the info provided</h1>;
        } else {
          window.sessionStorage.setItem(
            "signedInUser",
            JSON.stringify(data.data)
          );
          setSignedInUser(data.data);
          if (userType === "host") {
            history.push("/ServiceProviderInfo");
          } else {
            history.push("/PetRegistration");
          }
        }
      });
  };

  const clearForm = () => {
    setUserInfo(initialUserInfo);
  };

  return (
    <Wrapper>
      <Title>Please enter account information below:</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          First Name:
          <Input
            type="text"
            placeholder="First Name"
            id="firstName"
            value={userInfo.firstName}
            onChange={handleInfo}
            required
          />
        </Label>
        <Label>
          Last Name:
          <Input
            type="text"
            placeholder="Last Name"
            id="lastName"
            value={userInfo.lastName}
            onChange={handleInfo}
            required
          />
        </Label>
        <AddressLabel>
          <div style={{ paddingTop: "13px" }}>Address:</div>
          <Address>
            <Input
              type="text"
              placeholder="Street Number"
              id="street"
              value={userInfo.address.street}
              onChange={handleAddress}
              required
            />
            <Input
              type="text"
              placeholder="City"
              id="city"
              value={userInfo.address.city}
              onChange={handleAddress}
              required
            />
            <Input
              type="text"
              placeholder="Postal Code"
              id="postalCode"
              value={userInfo.address.postalCode}
              onChange={handleAddress}
              required
            />
            <DropDown
              onChange={handleAddress}
              id="province"
              value={userInfo.address.province}
              required
            >
              <option style={{ color: "grey" }} selected disabled value="">
                Province
              </option>
              <option value="AB">Alberta</option>
              <option value="BC">British Columbia</option>
              <option value="MB">Manitoba</option>
              <option value="NB">New Brunswick</option>
              <option value="NL">Newfoundland and Labrador</option>
              <option value="NT">Northwest Territories</option>
              <option value="NS">Nova Scotia</option>
              <option value="NU">Nunavut</option>
              <option value="ON">Ontario</option>
              <option value="PE">Prince Edward Island</option>
              <option value="QC">Quebec</option>
              <option value="SK">Saskatchewan</option>
              <option value="YT">Yukon</option>
            </DropDown>
            <Input
              type="text"
              placeholder="Country"
              id="country"
              value={userInfo.address.country}
              onChange={(event) => handleAddress(event)}
              required
            />
          </Address>
        </AddressLabel>
        <Label>
          Phone Number:
          <Input
            type="text"
            placeholder="(XXX) XXX-XXXX"
            id="phoneNumber"
            value={userInfo.phoneNumber}
            onChange={handlePhoneNumber}
            required
          />
        </Label>
        <Label>
          Email:
          <Input
            type="email"
            placeholder="Email"
            id="email"
            value={userInfo.account.email}
            onChange={handleAccount}
            required
          />
        </Label>
        <Label>
          Password:
          <Input
            type="password"
            placeholder="Password"
            id="password"
            value={userInfo.account.password}
            onChange={handleAccount}
            required
          />
        </Label>
        <Label>
          <Input
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            value={userInfo.confirmPassword}
            onChange={handleInfo}
            required
          />
        </Label>
        <Buttons>
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={clearForm}>
            Clear
          </Button>
        </Buttons>
      </Form>
    </Wrapper>
  );
};

export default SignUpForm;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  margin-left: 700px;
  margin-top: 150px;
`;
const Title = styled.div`
  display: flex;
  font-size: 28px;
  padding-left: 30px;
  padding-bottom: 40px;
  font-style: italic;
  font-weight: bold;
  color: var(--color-ming);
  justify-content: center;
  width: 500px;
  margin-bottom: 10px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-end;
`;

const Label = styled.label`
  font-size: 14px;
  align-items: center;
  font-weight: bold;
  display: flex;
  color: black;
`;
const AddressLabel = styled.label`
  font-size: 14px;
  align-items: top;
  font-weight: bold;
  display: flex;
  color: black;
`;
const Address = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 200px;
  height: 15px;
  padding: 8px;
  margin: 5px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid grey;
`;

const DropDown = styled.select`
  font-size: 14px;
  width: 220px;
  padding: 6px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid grey;
  color: grey;
  option {
    color: black;
  }
`;

const Buttons = styled.div`
  display: flex;
  width: 228px;
  margin: 10px 0px 20px 0px;
  justify-content: space-between;
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
