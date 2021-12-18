import React, { useState, useContext } from "react";
import styled from "styled-components";
import { PetBoardingContext } from "./PetBoardingContext";
import { useHistory } from "react-router-dom";

const PetRegistration = () => {
  const initialPetInfo = {
    name: "",
    animal: "",
    age: "",
    breed: "",
  };

  const [petInfo, setPetInfo] = useState(initialPetInfo);
  const [petLibrary, setPetLibrary] = useState([]);

  const history = useHistory();
  const { signedInUser } = useContext(PetBoardingContext);
  const handleInfo = (event) => {
    setPetInfo({ ...petInfo, [event.target.id]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`/petRegistration/${signedInUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _id: signedInUser._id,
        petLibrary: [...petLibrary, petInfo],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          history.push("/");
        } else {
          return <h1>An error has occured. Please check the info provided</h1>;
        }
      });
  };

  const addMorePets = () => {
    setPetLibrary((petLibrary) => [...petLibrary, petInfo]);
    setPetInfo(initialPetInfo);
  };

  return (
    <Wrapper>
      <Title>Time to meet your pet(s)!</Title>
      <Form onSubmit={handleSubmit}>
        <Label>
          <div style={{ paddingTop: "13px" }}>Pet info:</div>
          <InputFields>
            <Input
              type="text"
              placeholder="Name"
              id="name"
              value={petInfo.name}
              onChange={handleInfo}
              required
            />
            <Input
              type="text"
              placeholder="Animal"
              id="animal"
              value={petInfo.animal}
              onChange={handleInfo}
              required
            />
            <Input
              type="text"
              placeholder="Age"
              id="age"
              value={petInfo.age}
              onChange={handleInfo}
              required
            />
            <Input
              type="text"
              placeholder="Breed"
              id="breed"
              value={petInfo.breed}
              onChange={handleInfo}
              required
            />
          </InputFields>
        </Label>
        <Buttons>
          <Button type="button" onClick={addMorePets}>
            More Pets
          </Button>
        </Buttons>
        <Buttons>
          <Button type="submit">Submit</Button>
          <Button type="button">Clear</Button>
        </Buttons>
      </Form>
    </Wrapper>
  );
};

export default PetRegistration;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  margin-left: 800px;
  margin-top: 200px;
`;
const Title = styled.div`
  display: flex;
  font-size: 28px;
  font-style: italic;
  font-weight: bold;
  color: var(--color-ming);
  justify-content: center;
  width: 500px;
  margin-bottom: 40px;
  padding-left: 50px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-end;
`;

const Label = styled.label`
  font-size: 14px;
  align-items: top;
  font-weight: bold;
  display: flex;
  color: black;
`;
const InputFields = styled.div`
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

const Buttons = styled.div`
  display: flex;
  width: 228px;
  margin-top: 10px;
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
