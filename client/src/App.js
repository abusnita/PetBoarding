import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import About from "./About";
import Search from "./Search";
import Profile from "./Profile";
import CustomerSignUp from "./CustomerSignUp";
import CustomerSignIn from "./CustomerSignIn";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import ServiceLogIn from "./ServiceLogIn";
import SideBar from "./SideBar";
import PetRegistration from "./PetRegistration";
import ServiceProviderInfo from "./ServiceProviderInfo";
import Step1_Pets from "./Booking/Step1_Pets";
import Step2_Services from "./Booking/Step2_Services";
import Step3_Area from "./Booking/Step3_Area";
import Step4_Dates from "./Booking/Step4_Dates";
import WebFont from "webfontloader";
import Matches from "./Matches";
import ConfirmBooking from "./ConfirmBooking";
import Payment from "./Payment";
function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: [
          "Dancing Script",
          "Gwendolyn",
          "Indie Flower",
          "Slabo",
          "Garamond",
        ],
      },
    });
  }, []);

  return (
    <Router>
      <GlobalStyles />
      <Header />
      <Wrapper>
        <SideBar />
        <Main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/About">
              <About />
            </Route>
            <Route path="/Search">
              <Search />
            </Route>
            <Route path="/Profile">
              <Profile />
            </Route>
            <Route path="/CustomerSignUp">
              <CustomerSignUp />
            </Route>
            <Route path="/CustomerSignIn">
              <CustomerSignIn />
            </Route>
            <Route path="/PetRegistration">
              <PetRegistration />
            </Route>
            <Route path="/SignIn">
              <SignInForm />
            </Route>
            <Route path="/SignUp">
              <SignUpForm />
            </Route>
            <Route path="/ServiceProviderInfo">
              <ServiceProviderInfo />
            </Route>
            <Route path="/ServiceSignIn">
              <ServiceLogIn />
            </Route>
            <Route path="/Step1_Pets">
              <Step1_Pets />
            </Route>
            <Route path="/Step2_Services">
              <Step2_Services />
            </Route>
            <Route path="/Step3_Area">
              <Step3_Area />
            </Route>
            <Route path="/Step4_Dates">
              <Step4_Dates />
            </Route>
            <Route exact path="/matches">
              <Matches />
            </Route>
            <Route path="/matches/:matchId">
              <ConfirmBooking />
            </Route>
            <Route path="/payment">
              <Payment />
            </Route>
          </Switch>
        </Main>
      </Wrapper>
      <Footer />
    </Router>
  );
}

const Wrapper = styled.div`
  display: flex;
  background: var(--color-cornsilk);
  //height: calc(100vh - 160px);
  height: fit-content;
  //left: 160px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  //height: calc(100vh - 110px);
`;

export default App;
