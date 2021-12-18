import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { PetBoardingContext } from "./PetBoardingContext";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
const Home = () => {
  const { signedInUser } = useContext(PetBoardingContext);
  const [reservations, setReservations] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (!signedInUser) {
      return;
    }
    fetch(`/reservations/${signedInUser._id}`)
      .then((res) => res.json())
      .then((data) => {
        setReservations(data.reservations);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    history.push("/");
  }, [signedInUser]);
  return (
    <Wrapper>
      <CurrentReservations>
        {!reservations ? (
          <LoadingWrapper>
            <CircularProgress />
          </LoadingWrapper>
        ) : (
          <>
            {signedInUser && reservations.length !== 0 && (
              <Content>
                <Title>Current reservations:</Title>
                {reservations.map((reservation) => {
                  const a = moment(reservation.dates.start);
                  const b = moment(reservation.dates.end);
                  const {
                    pets: { cats, dogs },
                  } = reservation;
                  return (
                    <Result key={Math.floor(Math.random() * 1000000000)}>
                      <ValueWrapper>
                        <Bold>Dates:</Bold>{" "}
                        <Section>
                          <Dates>
                            First day: {a.format("ddd MMM Do, YYYY")}
                          </Dates>
                          <Dates>
                            Last day: {b.format("ddd MMM Do, YYYY")}
                          </Dates>
                        </Section>
                      </ValueWrapper>
                      <ValueWrapper>
                        <Bold>Pets:</Bold>
                        <Value>
                          {cats !== "0" && cats !== "" && (
                            <Cats>
                              {cats} cat
                              {Number(cats) > 1 && <span>s</span>}
                            </Cats>
                          )}
                          {cats !== "0" &&
                            cats !== "" &&
                            dogs !== "0" &&
                            dogs !== "" && <span>, </span>}
                          {dogs !== "0" && dogs !== "" && (
                            <Dogs>
                              {dogs} dog
                              {Number(dogs) > 1 && <span>s</span>}
                            </Dogs>
                          )}
                        </Value>
                      </ValueWrapper>
                      <ValueWrapper>
                        <Bold>Type of service requested:</Bold>
                        <Value>{reservation.serviceType}</Value>
                      </ValueWrapper>
                      <Section>
                        <P>
                          The pet
                          {Number(cats) + Number(dogs) > 1 && (
                            <span>s</span>
                          )}{" "}
                          will be in the care of:
                        </P>
                        {reservation.provider.company && (
                          <ValueWrapper>
                            <Bold>Company:</Bold>
                            <Value>{reservation.provider.Company}</Value>
                          </ValueWrapper>
                        )}
                        <ValueWrapper>
                          <Bold>Name:</Bold>{" "}
                          <Value>
                            {`${reservation.provider.firstName}` +
                              " " +
                              `${reservation.provider.lastName}`}
                          </Value>
                        </ValueWrapper>
                        <ValueWrapper>
                          <Bold>Phone number:</Bold>
                          <Value> {reservation.provider.phoneNumber}</Value>
                        </ValueWrapper>
                        <ValueWrapper>
                          <Bold>Email:</Bold>
                          <Value> {reservation.provider.email}</Value>
                        </ValueWrapper>
                      </Section>
                      <TotalWrapper>
                        <P>Reservation total:</P>
                        <Total>{reservation.total}$</Total>
                      </TotalWrapper>
                    </Result>
                  );
                })}
              </Content>
            )}
          </>
        )}
      </CurrentReservations>
    </Wrapper>
  );
};

const CurrentReservations = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: var(--color-cornsilk);
  min-height: 100vh;
  margin-top: 40px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100vh;
  margin-left: 400px;
  margin-top: 40px;
  margin-bottom: 100px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-left: 400px;
  min-height: 100vh;
  margin-top: 40px;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

const Result = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 20px 20px 20px 40px;
  color: white;
  background-color: var(--color-ming);
  box-shadow: 5px 10px 8px 10px #888888;
  padding: 15px;
  max-width: 460px;
`;
const P = styled.div`
  padding: 15px 0px;
  font-weight: bold;
  font-style: italic;
  text-decoration: underline;
  width: 430px;
  text-align: center;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  width: 230px;
`;
const TotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 430px;
`;
const Cats = styled.div`
  width: 40px;
`;
const Dogs = styled.div`
  width: 40px;
`;
const ValueWrapper = styled.div`
  display: flex;
  padding-bottom: 10px;

  width: 430px;
`;
const Value = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 60px;
  font-size: 14px;

  width: 260px;
`;
const Dates = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 40px;
  font-size: 14px;

  width: 260px;
`;
const Total = styled.div`
  display: flex;
  justify-content: center;
  width: 430px;
  font-size: 22px;
`;
const Bold = styled.div`
  width: 230px;
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 14px;
  padding-left: 40px;
  width: 230px;
`;

export default Home;
