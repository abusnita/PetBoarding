import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { CustomerContext } from "./Reducers/CustomerReducer";

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
  //const [numberOfPets, setNumberOfPets] = useState(0);
  const [serviceInfo, setServiceInfo] = useState(initialServiceInfo);
  const [serviceType, setServiceType] = useState([]);

  const history = useHistory();
  const { signedInUser } = useContext(CustomerContext);
  const handleInfo = (event) => {
    setServiceInfo({ ...serviceInfo, [event.target.id]: event.target.value });
  };
  const handleServiceType = (e) => {
    setServiceType((serviceType) => [...serviceType, e.target.value]);
  };
  const updateCats = (event) => {
    //console.log(event.target.value);
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
    //console.log(event.target.value);
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
    //console.log(event.target.value);
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
  //console.log(signedInUser);
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
        console.log(data);
        if (data.status === 200) {
          history.push("/Profile");
        } else {
          return <h1>An error has occured. Please check the info provided</h1>;
        }
      });
  };

  const clearForm = () => {
    setServiceInfo(initialServiceInfo);
  };

  //console.log(petLibrary);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit}>
        <FormTitle>SERVICE PROVIDER INFO</FormTitle>
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
          <ServiceTitle>What kind of service are you providing?</ServiceTitle>
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
            <Title>Capabilities</Title>
            <Label>
              Cats:
              <DropDown
                onChange={updateCats}
                id="max"
                value={serviceInfo.capabilities.cats.max}
                required
              >
                {/* <option style={{ color: "grey" }} selected disabled value="">
                  Max capacity
                </option> */}
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
                {/* <option style={{ color: "grey" }} selected disabled value="">
                  Max capacity
                </option> */}
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
          </Capabilities>
          <Price>
            <Title>Price per animal per day</Title>
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
  justify-content: center;
  align-items: center;
  padding-left: 30px;
  //position: fixed;
  padding-top: 15px;
  /* left: 50%;
    transform: translate(-50%, -50%); */
`;
const FormTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 24px;
  width: 440px;
  margin-bottom: 40px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  //align-content: flex-end;
  //justify-content: center;
  align-items: flex-end;
  //position: relative;
`;

const Label = styled.label`
  //font-family: var(--font-family);
  font-size: 14px;
  align-items: center;
  font-weight: bold;
  display: flex;
  color: black;
`;

const CheckboxLabel = styled.label`
  //font-family: var(--font-family);
  font-size: 14px;
  align-items: center;
  font-weight: bold;
  display: flex;
  color: black;
  margin-right: 20px;
`;

const ServiceTitle = styled.div`
  display: flex;
  justify-content: center;
  width: 350px;
  padding-bottom: 5px;
  margin-top: 20px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  width: 230px;
  padding-bottom: 5px;
  margin-top: 20px;
`;
const CheckBoxes = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: center;
  width: 360px;
`;
const ServiceType = styled.input`
  //padding-right: 20px;
  margin-right: 10px;

  //position: relative;
`;
const Input = styled.input`
  width: 200px;
  height: 15px;
  padding: 8px;
  margin: 5px;
  font-size: 14px;
  border-radius: 5px;
  //position: relative;
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
    background-color: var(--color-orange);
    //color: grey;
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
  width: 500px;
  justify-content: center;
  margin-bottom: 20px;
`;
const Middle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 400px;
`;
const Bottom = styled.div`
  display: flex;
`;
const Capabilities = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
const Price = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
