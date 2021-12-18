import React, { useState, useRef, useContext, useEffect } from "react";
import styled from "styled-components";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { useHistory } from "react-router-dom";
import { PetBoardingContext } from "./PetBoardingContext";

const Profile = () => {
  const { signedInUser, setSignedInUser } = useContext(PetBoardingContext);
  const initialUserInfo = {
    firstName: signedInUser.firstName,
    lastName: signedInUser.lastName,
    address: {
      street: signedInUser.address.street,
      city: signedInUser.address.city,
      province: signedInUser.address.province,
      postalCode: signedInUser.address.postaCode,
      country: signedInUser.address.country,
    },
    phoneNumber: signedInUser.phoneNumber,
    account: {
      email: signedInUser.account.email,
    },
  };
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [showFirstNameField, setShowFirstNameField] = useState(false);
  const [showLastNameField, setShowLastNameField] = useState(false);
  const [showAddressField, setShowAddressField] = useState(false);
  const [showCityField, setShowCityField] = useState(false);
  const [showProvinceField, setShowProvinceField] = useState(false);
  const [showPostalCodeField, setShowPostalCodeField] = useState(false);
  const [showCountryField, setShowCountryField] = useState(false);
  const [showEmailField, setShowEmailField] = useState(false);
  const [showPhoneNumberField, setShowPhoneNumberField] = useState(false);
  const history = useHistory();

  //function for recording the new value of first name and last name
  const handleInfo = (event) => {
    setUserInfo({ ...userInfo, [event.target.id]: event.target.value });
  };
  //function for recording the new value of address fields
  const handleAddress = (event) => {
    setUserInfo({
      ...userInfo,
      address: {
        ...userInfo.address,
        [event.target.id]: event.target.value,
      },
    });
  };
  //function for recording the new value of phone number
  const handlePhoneNumber = (event) => {
    const previousValue = userInfo.phoneNumber;
    setUserInfo({
      ...userInfo,
      [event.target.id]: formatPhoneNumber(event.target.value, previousValue),
    });
  };
  //function for automatically format the phone number provided to (xxx) xxx-xxxx
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

  //function for recording the new value of email
  const handleAccount = (event) => {
    setUserInfo({
      ...userInfo,
      account: {
        ...userInfo.account,
        [event.target.id]: event.target.value,
      },
    });
  };
  //separate state variable update functions for each update button
  const handleFirstNameField = () => {
    setShowFirstNameField(!showFirstNameField);
  };
  const handleLastNameField = () => {
    setShowLastNameField(!showLastNameField);
  };
  const handleAddressField = () => {
    setShowAddressField(!showAddressField);
  };
  const handleCityField = () => {
    setShowCityField(!showCityField);
  };
  const handleProvinceField = () => {
    setShowProvinceField(!showProvinceField);
  };
  const handlePostalCodeField = () => {
    setShowPostalCodeField(!showPostalCodeField);
  };
  const handleCountryField = () => {
    setShowCountryField(!showCountryField);
  };
  const handleEmailField = () => {
    setShowEmailField(!showEmailField);
  };
  const handlePhoneNumberField = () => {
    setShowPhoneNumberField(!showPhoneNumberField);
  };
  //function used for relating the standard media upload button that is hidden to the new styled button
  const handleClick = async () => {
    ref.current.click();
  };
  //function for uploading media file to cloudinary in order to get a url back for storing in the database
  const handleUpload = (event) => {
    setImage(event.target.files[0]);
    const data = new FormData();
    data.append("file", event.target.files[0]);
    data.append("upload_preset", "PetBoarding");

    setLoading(true);
    fetch("https://api.cloudinary.com/v1_1/dclu5h6eg/image/upload/", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  //update the user profile in the database to include avatar url
  useEffect(() => {
    fetch(`/updateAvatar/${signedInUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _id: signedInUser._id,
        avatarUrl: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setImage(data.data.avatarUrl);
      })
      .catch((err) => console.log(err));
  }, [url]);

  //update user profile in the database with the new user info provided for update
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/updateProfile/${signedInUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ _id: signedInUser._id, user: userInfo }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== 200) {
          return <h1>An error has occured. Please check the info provided</h1>;
        } else {
          window.sessionStorage.setItem(
            "signedInUser",
            JSON.stringify(data.data)
          );
          setSignedInUser(data.data);
          setShowFirstNameField(false);
          setShowLastNameField(false);
          setShowAddressField(false);
          setShowCityField(false);
          setShowProvinceField(false);
          setShowPostalCodeField(false);
          setShowCountryField(false);
          setShowPhoneNumberField(false);
          setShowEmailField(false);
        }
      });
  };

  //refresh Profile page to show the changes right away
  useEffect(() => {
    history.push(`/Profile/${signedInUser._id}`);
  }, [
    showFirstNameField,
    showLastNameField,
    showAddressField,
    showCityField,
    showProvinceField,
    showPostalCodeField,
    showCountryField,
    showEmailField,
    showPhoneNumberField,
    url,
  ]);

  return (
    <>
      {!signedInUser ? (
        <span>Please sign in to be able to view profile details</span>
      ) : (
        <Wrapper>
          <UploadContainer>
            <P>Upload/change profile picture</P>
            <Upload>
              <Input
                type="file"
                ref={ref}
                style={{ display: "none" }}
                onChange={handleUpload}
              />
              <Button type="button" onClick={handleClick}>
                <PhotoCamera style={{ color: "white" }} />
              </Button>
              {loading ? (
                <Span> Loading...</Span>
              ) : (
                image && <Avatar src={image} />
              )}
            </Upload>
          </UploadContainer>

          <Content>
            <Form onSubmit={handleSubmit}>
              <ValueWrapper>
                <Bold>First name:</Bold>
                <Value>
                  {signedInUser.firstName}
                  {!showFirstNameField && (
                    <ShowIF onClick={handleFirstNameField}>Update</ShowIF>
                  )}
                  {showFirstNameField && (
                    <Label>
                      <Input
                        type="text"
                        placeholder="First Name"
                        id="firstName"
                        value={userInfo.firstName}
                        onChange={handleInfo}
                        required
                      />
                    </Label>
                  )}
                </Value>
              </ValueWrapper>
              <ValueWrapper>
                <Bold>Last name:</Bold>
                <Value>
                  {signedInUser.lastName}
                  {!showLastNameField && (
                    <ShowIF onClick={handleLastNameField}>Update</ShowIF>
                  )}
                  {showLastNameField && (
                    <Label>
                      <Input
                        type="text"
                        placeholder="Last Name"
                        id="lastName"
                        value={userInfo.lastName}
                        onChange={handleInfo}
                        required
                      />
                    </Label>
                  )}
                </Value>
              </ValueWrapper>
              <AddressWrapper>
                <Bold>Address:</Bold>
                <Address>
                  <AddressField>
                    {signedInUser.address.street}
                    {!showAddressField && (
                      <ShowIF onClick={handleAddressField}>Update</ShowIF>
                    )}
                    {showAddressField && (
                      <Label>
                        <Input
                          type="text"
                          placeholder="Street"
                          id="street"
                          value={userInfo.address.street}
                          onChange={handleAddress}
                          required
                        />
                      </Label>
                    )}
                  </AddressField>
                  <AddressField>
                    {signedInUser.address.city}
                    {!showCityField && (
                      <ShowIF onClick={handleCityField}>Update</ShowIF>
                    )}
                    {showCityField && (
                      <Label>
                        <Input
                          type="text"
                          placeholder="City"
                          id="city"
                          value={userInfo.address.city}
                          onChange={handleAddress}
                          required
                        />
                      </Label>
                    )}
                  </AddressField>
                  <AddressField>
                    {signedInUser.address.province}
                    {!showProvinceField && (
                      <ShowIF onClick={handleProvinceField}>Update</ShowIF>
                    )}
                    {showProvinceField && (
                      <Label>
                        <Input
                          type="text"
                          placeholder="Province"
                          id="province"
                          value={userInfo.address.province}
                          onChange={handleAddress}
                          required
                        />
                      </Label>
                    )}
                  </AddressField>
                  <AddressField>
                    {signedInUser.address.postalCode}
                    {!showPostalCodeField && (
                      <ShowIF onClick={handlePostalCodeField}>Update</ShowIF>
                    )}
                    {showPostalCodeField && (
                      <Label>
                        <Input
                          type="text"
                          placeholder="Postal Code"
                          id="postalCode"
                          value={userInfo.address.postalCode}
                          onChange={handleAddress}
                          required
                        />
                      </Label>
                    )}
                  </AddressField>
                  <AddressField>
                    {signedInUser.address.country}
                    {!showCountryField && (
                      <ShowIF onClick={handleCountryField}>Update</ShowIF>
                    )}
                    {showCountryField && (
                      <Label>
                        <Input
                          type="text"
                          placeholder="Country"
                          id="country"
                          value={userInfo.address.country}
                          onChange={handleAddress}
                          required
                        />
                      </Label>
                    )}
                  </AddressField>
                </Address>
              </AddressWrapper>
              <ValueWrapper>
                <Bold>Phone number:</Bold>
                <Value>
                  {" "}
                  {signedInUser.phoneNumber}
                  {!showPhoneNumberField && (
                    <ShowIF onClick={handlePhoneNumberField}>Update</ShowIF>
                  )}
                  {showPhoneNumberField && (
                    <Label>
                      <Input
                        type="text"
                        placeholder="Phone Number"
                        id="phoneNumber"
                        value={userInfo.phoneNumber}
                        onChange={handlePhoneNumber}
                        required
                      />
                    </Label>
                  )}
                </Value>
              </ValueWrapper>
              <ValueWrapper>
                <Bold>Email:</Bold>
                <Value>
                  {signedInUser.account.email}
                  {!showEmailField && (
                    <ShowIF onClick={handleEmailField}>Update</ShowIF>
                  )}
                  {showEmailField && (
                    <Label>
                      <Input
                        type="text"
                        placeholder="Email"
                        id="email"
                        value={userInfo.account}
                        onChange={handleAccount}
                        required
                      />
                    </Label>
                  )}
                </Value>
              </ValueWrapper>
              <SubmitButton type="submit">Submit all changes</SubmitButton>
            </Form>
          </Content>
        </Wrapper>
      )}
    </>
  );
};
const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  margin-left: 500px;
  margin-top: 100px;
`;
const UploadContainer = styled.div`
  display: flex;
  padding-top: 60px;
  padding-left: 200px;
  align-items: center;
  justify-content: flex-start;
`;
const Upload = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
`;
const Span = styled.span`
  padding-left: 10px;
`;
const Button = styled.button`
  padding: 10px;
  width: 70px;
  height: 40px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-buttons);
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 20px;
  &:hover {
    background-color: var(--color-hover);
  }
`;
const Input = styled.input`
  width: 140px;
  height: 8px;
  padding: 8px;
  margin: 5px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid grey;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;

const Label = styled.label`
  font-size: 14px;
  align-items: center;
  font-weight: bold;
  display: flex;
  color: black;
`;
const AddressField = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  padding-bottom: 10px;
`;
const Address = styled.div`
  display: flex;
  flex-direction: column;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  padding-left: 200px;
`;

const ValueWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 10px;
  align-items: center;
`;

const AddressWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 20px;
  align-items: top;
`;
const Value = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
  align-items: center;
`;
const P = styled.div`
  padding-right: 20px;
`;

const Bold = styled.div`
  font-weight: bold;
  padding-right: 5px;
  width: 120px;
`;
const ShowIF = styled.button`
  height: 18px;
  width: 70px;
  font-size: 14px;
  margin-left: 15px;
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
const SubmitButton = styled(Button)`
  height: 30px;
  width: 200px;
  font-size: 14px;
  margin-left: 100px;
  margin-top: 60px;
`;

export default Profile;
