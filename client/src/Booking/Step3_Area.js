import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { PetBoardingContext } from "../PetBoardingContext";

const Step3_Area = () => {
  const initialArea = {
    address: "",
    city: "",
    postalCode: "",
  };

  const [area, setArea] = useState(initialArea);

  const history = useHistory();
  const { bookingCriteria, setBookingCriteria } =
    useContext(PetBoardingContext);

  const updateArea = (e) => {
    setArea({ ...area, [e.target.id]: e.target.value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setBookingCriteria({ ...bookingCriteria, area: area });
    window.sessionStorage.setItem(
      "bookingCriteria",
      JSON.stringify(bookingCriteria)
    );
    history.push("/Step4_Dates");
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Content>
          <Title>What area are you loking for</Title>
          <P>(only one entry is necessary)</P>
          <Label>
            <Input
              type="text"
              placeholder="Address"
              id="address"
              value={area.address}
              onChange={updateArea}
            />
          </Label>
          <Label>
            <Input
              type="text"
              placeholder="City"
              id="city"
              value={area.city}
              onChange={updateArea}
            />
          </Label>
          <Label>
            <Input
              type="text"
              placeholder="Postal Code"
              id="postalCode"
              value={area.postalCode}
              onChange={updateArea}
            />
          </Label>
        </Content>
        <Bottom>
          <Button type="submit">Next</Button>
        </Bottom>
      </form>
    </Wrapper>
  );
};
export default Step3_Area;

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
  margin: 20px;
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

const Label = styled.label`
  font-size: 14px;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  display: flex;
  color: black;
  width: 500px;
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
const P = styled.p`
  color: grey;
  font-size: 14px;
  font-style: italic;
  width: 500px;
  text-align: center;
  padding-bottom: 10px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: center;
  width: 500px;
`;
