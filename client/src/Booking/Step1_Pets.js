import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { CustomerContext } from "../Reducers/CustomerReducer";

const Step1_Pets = () => {
  const initialPets = {
    cats: "",
    dogs: "",
  };

  //const [numberOfPets, setNumberOfPets] = useState(0);
  const [pets, setPets] = useState(initialPets);
  const [other, setOther] = useState("");
  const history = useHistory();
  const { bookingCriteria, setBookingCriteria } = useContext(CustomerContext);

  const updatePets = (event) => {
    setPets({ ...pets, [event.target.id]: event.target.value });
  };
  const handleChange = (e) => {
    setOther(e.target.value);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setBookingCriteria({ ...bookingCriteria, pets: pets });
    window.sessionStorage.setItem(
      "bookingCriteria",
      JSON.stringify(bookingCriteria)
    );
    console.log(bookingCriteria);
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
              {/* <option style={{ color: "grey" }} selected disabled value="">
                Select number
              </option> */}
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
              {/* <option style={{ color: "grey" }} selected disabled value="">
                Select number
              </option> */}
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
          {/* <Label>
              <Input
                type="text"
                placeholder="Other, please specify"
                id={other}
                value={other}
                onChange={handleChange}
              />
              <DropDown onChange={updatePets} id={other} value={pets[other]}>
                <option style={{ color: "grey" }} selected disabled value="">
                  Select number
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </DropDown>
            </Label> */}
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
  padding-left: 30px;
  position: absolute;
  padding-top: 15px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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
    //background-color: var(--color-hover);
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
  width: 140px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  padding-left: 50px;
  width: 200px;
  font-size: 20px;
  padding-bottom: 20px;
`;

const DropDown = styled.select`
  font-size: 14px;
  width: 60px;
  padding: 7px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid grey;
  color: grey;

  /* option {
    color: black;
  } */
`;

const Bottom = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  width: 200px;
`;

const Capabilities = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
