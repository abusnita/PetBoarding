import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { PetBoardingContext } from "../PetBoardingContext";

const Step1_Pets = () => {
  const initialPets = {
    cats: "",
    dogs: "",
  };

  const [pets, setPets] = useState(initialPets);
  const [setOther] = useState("");
  const history = useHistory();
  const { bookingCriteria, setBookingCriteria } =
    useContext(PetBoardingContext);

  const updatePets = (event) => {
    setPets({ ...pets, [event.target.id]: event.target.value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setBookingCriteria({ ...bookingCriteria, pets: pets });
    window.sessionStorage.setItem(
      "bookingCriteria",
      JSON.stringify(bookingCriteria)
    );
    history.push("/Step2_Services");
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <Capabilities>
          <Title>What pets are you looking to place?</Title>
          <Label>
            Cats:
            <DropDown onChange={updatePets} id="cats" value={pets.cats}>
              <option selected value="0">
                0
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </DropDown>
          </Label>
          <Label>
            Dogs:
            <DropDown onChange={updatePets} id="dogs" value={pets.dogs}>
              <option selected value="0">
                0
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </DropDown>
          </Label>
        </Capabilities>
        <Bottom>
          <Button type="submit">Next</Button>
        </Bottom>
      </Form>
    </Wrapper>
  );
};
export default Step1_Pets;

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
  margin-left: 50px;
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
`;

const Label = styled.label`
  font-size: 14px;
  align-items: center;
  font-weight: bold;
  display: flex;
  color: black;
  justify-content: center;
  padding-left: 15px;
  width: 500px;
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

const DropDown = styled.select`
  font-size: 14px;
  width: 60px;
  padding: 7px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid grey;
  color: grey;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  width: 500px;
`;

const Capabilities = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
`;
