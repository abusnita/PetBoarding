import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { PetBoardingContext } from "../PetBoardingContext";

const Step2_Services = () => {
  const [service, setService] = useState("host");

  const history = useHistory();
  const { bookingCriteria, setBookingCriteria } =
    useContext(PetBoardingContext);

  const handleChange = (e) => {
    setService(e.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setBookingCriteria({ ...bookingCriteria, serviceType: service });
    window.sessionStorage.setItem(
      "bookingCriteria",
      JSON.stringify(bookingCriteria)
    );
    history.push("/Step3_Area");
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Content>
          <Title>What kind of service are you looking for?</Title>
          <CheckBoxes>
            <ServiceType
              type="radio"
              checked={service === "host"}
              onChange={handleChange}
              id="host"
              value="host"
              name="service"
            />

            <CheckboxLabel for="host">Boarding</CheckboxLabel>

            <ServiceType
              type="radio"
              id="sitter"
              value="sitter"
              name="service"
              checked={service === "sitter"}
              onChange={handleChange}
            />
            <CheckboxLabel for="sitter">Service at residence</CheckboxLabel>
          </CheckBoxes>
        </Content>
        <Bottom>
          <Button type="submit">Next</Button>
        </Bottom>
      </Form>
    </Wrapper>
  );
};
export default Step2_Services;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin-left: 800px;
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
  transition: 200ms ease;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    font-size: 15px;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 500px;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  align-items: center;
  font-weight: bold;
  display: flex;
  color: black;
  margin-right: 20px;
  min-width: 130px;
`;

const Title = styled.div`
  display: flex;
  font-size: 28px;
  padding-bottom: 40px;
  font-style: italic;
  font-weight: bold;
  color: var(--color-ming);
  justify-content: center;
  width: 500px;
  margin-bottom: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
`;
const CheckBoxes = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
  width: 500px;
`;
const ServiceType = styled.input`
  margin-right: 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: center;
  width: 500px;
`;
