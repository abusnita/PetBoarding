import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import IconButton from "@material-ui/core/IconButton";
import { NavLink, useHistory } from "react-router-dom";
import { CustomerContext } from "./Reducers/CustomerReducer";

const Profile = () => {
  //const history = useHistory();

  // const goToHomePage = () => {
  //     history.push("/");
  // };
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
    email: "",
  };
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef();
  const [text, setText] = useState("");
  const { signedInUser } = useContext(CustomerContext);
  console.log(signedInUser);
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

  const handleClick = async () => {
    ref.current.click();
  };

  if (url && signedInUser) {
    fetch(`/updateProfile/${signedInUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _id: signedInUser._id,
        avatarUrl: url,
      }),
    }).then((res) => res.json());
    // console.log(url);
    // console.log(signedInUser.avatarUrl);
  }
  // console.log(url);
  // console.log(signedInUser);

  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [showUpdateField, setShowUpdateField] = useState(false);
  const history = useHistory();
  const handleInfo = (event) => {
    setUserInfo({ ...userInfo, [event.target.id]: event.target.value });
  };
  const handleAddress = (event) => {
    //console.log(event.target.value);
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
  const handleAccount = (event) => {
    //console.log(event.target.value);
    setUserInfo({
      ...userInfo,
      account: {
        ...userInfo.account,
        [event.target.id]: event.target.value,
      },
    });
  };

  const showInputField = () => {
    setShowUpdateField(!showUpdateField);
  };

  const handleSubmit = () => {};

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
                //placeholder="Upload image"
                ref={ref}
                style={{ display: "none" }}
                onChange={handleUpload}
              />
              <Button type="button" onClick={handleClick}>
                <PhotoCamera style={{ color: "white" }} />
              </Button>
              {loading ? (
                <h3> Loading...</h3>
              ) : (
                <Avatar src={signedInUser.avatarUrl} />
              )}
            </Upload>
          </UploadContainer>

          <Content>
            <ValueWrapper>
              <Bold>First name:</Bold>
              <Value>
                {signedInUser.firstName}
                <ShowIF onClick={showInputField}>Update</ShowIF>
                {showUpdateField && (
                  <Form onSubmit={handleSubmit}>
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
                    <Button type="submit">Submit</Button>
                  </Form>
                )}
              </Value>
            </ValueWrapper>
            <ValueWrapper>
              <Bold>Last name:</Bold> <Value>{signedInUser.lastName}</Value>
            </ValueWrapper>
            <ValueWrapper>
              <Bold>Address:</Bold>
              <Address>
                <AddressField>{signedInUser.address.street}</AddressField>
                <AddressField>{signedInUser.address.city}</AddressField>
                <AddressField>{signedInUser.address.province}</AddressField>
                <AddressField>{signedInUser.address.postalCode}</AddressField>
                <AddressField>{signedInUser.address.country}</AddressField>
              </Address>
            </ValueWrapper>
            <ValueWrapper>
              <Bold>Phone number:</Bold>
              <Value> {signedInUser.phoneNumber}</Value>
            </ValueWrapper>
            <ValueWrapper>
              <Bold>Email:</Bold>
              <Value> {signedInUser.account.email}</Value>
            </ValueWrapper>
          </Content>
          {/* {signedInUser && (
            <img
              src={signedInUser.avatarUrl}
              style={{ width: "100px", height: "100px" }}
            />
          )} */}
        </Wrapper>
      )}
    </>
  );
};
const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: var(--color-honeydew);
  top: 500px;
  height: calc(100vh - 160px);
  padding: var(--padding-page) 18px;
`;
const UploadContainer = styled.div`
  display: flex;
  //flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const Upload = styled.div`
  display: flex;
  align-items: center;
  padding-top: 10px;
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
  width: 250px;
  height: 15px;
  padding: 8px;
  margin: 5px;
  font-size: 14px;
  border-radius: 5px;
  //position: relative;
  border: 1px solid grey;
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
const AddressField = styled.div`
  //font-family: var(--font-family);
  display: flex;
  justify-content: flex-start;
  flex: 1;
  padding-bottom: 15px;
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
  //text-decoration: none;
  flex-direction: column;
  margin-top: 40px;
  // color: white;
  // background-color: var(--color-ming);
  // box-shadow: 5px 10px 8px 10px #888888;
  // padding: 15px;
  //max-width: 400px;
`;

const ValueWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 20px;
  align-items: center;
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
const ShowIF = styled(Button)`
  height: 18px;
  width: 70px;
  font-size: 14px;
  margin-left: 15px;
  /* margin: 5px;
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
  } */
`;

const Bottom = styled.div`
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
// const Logo = styled.div`
//   background-image: url(${slingairLogo});
//   background-repeat: no-repeat;
//   background-position: left center, right center;
//   background-size: contain;
//   overflow: hidden;
//   text-indent: -1000px;
//   height: 60px;
//   width: 550px;
// `;
// const Nav = styled.nav`
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
// `;
// const StyledNavLink = styled(NavLink)`
//   background: var(--color-selective-yellow);
//   border: 1px solid transparent;
//   border-radius: 4px;
//   color: var(--color-alabama-crimson);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-family: var(--font-heading);
//   font-size: 18px;
//   height: 42px;
//   margin: 0 0 0 8px;
//   padding: 0 14px;
//   width: 100%;
//   text-decoration: none;
//   transition: all ease 400ms;

//   &:disabled {
//     cursor: not-allowed;
//     opacity: 0.5;
//   }

//   &:hover {
//     background: var(--color-alabama-crimson);
//     color: var(--color-selective-yellow);
//     border-color: var(--color-selective-yellow);
//   }
// `;

export default Profile;
