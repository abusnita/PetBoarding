import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { PetBoardingContext } from "./PetBoardingContext";

const ServiceProviderInfo = () => {
  const initialServiceInfo = {
    company: "",
    capabilities: {
      cats: {
        max: "",
        price: "",
        available: [],
      },
      dogs: {
        max: "",
        price: "",
        available: [],
      },
      other: {
        yesNo: "",
        price: "",
      },
    },
  };

  const [serviceInfo, setServiceInfo] = useState(initialServiceInfo);
  const [serviceType, setServiceType] = useState([]);

  const history = useHistory();
  const { signedInUser } = useContext(PetBoardingContext);
  const handleInfo = (event) => {
    setServiceInfo({ ...serviceInfo, [event.target.id]: event.target.value });
  };
  const handleServiceType = (e) => {
    setServiceType((serviceType) => [...serviceType, e.target.value]);
  };
  const updateCats = (event) => {
    setServiceInfo({
      ...serviceInfo,
      capabilities: {
        ...serviceInfo.capabilities,
        cats: {
          ...serviceInfo.capabilities.cats,
          [event.target.id]: event.target.value,
        },
      },
    });
  };
  const updateDogs = (event) => {
    setServiceInfo({
      ...serviceInfo,
      capabilities: {
        ...serviceInfo.capabilities,
        dogs: {
          ...serviceInfo.capabilities.dogs,
          [event.target.id]: event.target.value,
        },
      },
    });
  };
  const updateOther = (event) => {
    setServiceInfo({
      ...serviceInfo,
      capabilities: {
        ...serviceInfo.capabilities,
        other: {
          ...serviceInfo.capabilities.other,
          [event.target.id]: event.target.value,
        },
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`/serviceProviderInfo/${signedInUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _id: signedInUser._id,
        serviceInfo: serviceInfo,
        serviceType: serviceType,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          history.push("/");
        } else {
          return <h1>An error has occured. Please check the info provided</h1>;
        }
      });
  };

  const clearForm = () => {
    setServiceInfo(initialServiceInfo);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <MainTitle>SERVICE PROVIDER INFO</MainTitle>
        <Top>
          <Label>
            Company:
            <Input
              type="text"
              placeholder="Company (optional)"
              id="company"
              value={serviceInfo.company}
              onChange={handleInfo}
            />
          </Label>
        </Top>
        <Middle>
          <Title>What kind of service are you providing?</Title>
          <CheckBoxes>
            <ServiceType
              type="checkbox"
              onChange={handleServiceType}
              id="host"
              value="host"
              name="service"
            />
            <CheckboxLabel for="host">Host pets</CheckboxLabel>

            <ServiceType
              type="checkbox"
              id="sitter"
              value="sitter"
              name="service"
              onChange={handleServiceType}
            />
            <CheckboxLabel for="sitter">Service at residence</CheckboxLabel>
          </CheckBoxes>
        </Middle>
        <Bottom>
          <Capabilities>
            <TitleBottom>Capabilities</TitleBottom>
            <Container>
              <Label>
                Cats:
                <DropDown
                  onChange={updateCats}
                  id="max"
                  value={serviceInfo.capabilities.cats.max}
                  required
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </DropDown>
              </Label>
              <Label>
                Dogs:
                <DropDown
                  onChange={updateDogs}
                  id="max"
                  value={serviceInfo.capabilities.dogs.max}
                  required
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </DropDown>
              </Label>
              <Label>
                Other:
                <DropDown
                  onChange={updateOther}
                  id="yesNo"
                  value={serviceInfo.capabilities.other.yesNo}
                  required
                >
                  <option style={{ color: "grey" }} selected disabled value="">
                    No max capacity
                  </option>
                  <option value="no">no</option>
                  <option value="yes">yes</option>
                </DropDown>
              </Label>
            </Container>
          </Capabilities>
          <Price>
            <TitleBottom>Price per animal per day</TitleBottom>
            <Container>
              <Input
                type="text"
                placeholder="Price per cat"
                id="price"
                value={serviceInfo.capabilities.cats.price}
                onChange={updateCats}
              />
              <Input
                type="text"
                placeholder="Price per dog"
                id="price"
                value={serviceInfo.capabilities.dogs.price}
                onChange={updateDogs}
              />
              <Input
                type="text"
                placeholder="Price per other"
                id="price"
                value={serviceInfo.capabilities.other.price}
                onChange={updateOther}
              />
            </Container>
          </Price>
        </Bottom>
        <Buttons>
          <Submit type="submit">Submit</Submit>
          <Clear type="button" onClick={clearForm}>
            Clear
          </Clear>
        </Buttons>
      </Form>
    </Wrapper>
  );
};
export default ServiceProviderInfo;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  margin-top: 200px;
  margin-left: 400px;
`;
const Title = styled.div`
  display: flex;
  font-size: 28px;
  padding-left: 30px;
  padding-bottom: 30px;
  font-style: italic;
  font-weight: bold;
  color: var(--color-ming);
  justify-content: flex-start;
  width: 500px;
  margin-bottom: 10px;
`;

const MainTitle = styled.div`
  display: flex;
  font-size: 28px;
  padding-left: 30px;
  padding-bottom: 40px;
  font-style: italic;
  font-weight: bold;
  color: var(--color-ming);
  justify-content: flex-start;
  width: 400px;
  margin-bottom: 10px;
  margin-left: 260px;
`;

const TitleBottom = styled.div`
  display: flex;
  font-size: 28px;

  padding-bottom: 20px;
  font-style: italic;
  font-weight: bold;
  color: var(--color-ming);
  justify-content: center;
  width: 300px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  font-size: 14px;
  align-items: center;
  font-weight: bold;
  display: flex;
  color: black;
  width: 80%;
  justify-content: flex-end;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  align-items: center;
  font-weight: bold;
  display: flex;
  color: black;
  margin-right: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
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
  padding: 7px;
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
  width: 460px;
  margin-top: 10px;
  justify-content: center;
  margin-left: 240px;
`;

const Submit = styled.button`
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
const Clear = styled.button`
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
    //color: grey;
  }
`;
const Top = styled.div`
  display: flex;
  width: 380px;
  justify-content: center;
  margin-bottom: 20px;
  margin-left: 200px;
`;
const Middle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  margin-left: 300px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 300px;
`;
const Capabilities = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 250px;
  width: 40%;
  align-items: flex-end;
  margin-right: 40px;
`;
const Price = styled.div`
  display: flex;
  flex-direction: column;
  height: 250px;
  width: 40%;
  align-items: flex-end;
`;
