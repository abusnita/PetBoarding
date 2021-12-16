import React, { createContext, useState } from "react";

export const CustomerContext = createContext();
//const persistedState = "";

// const reducer = (state, action) => {
//   switch (
//     action.type
//     // case "sign-in":
//     //   return { ...state, signedInUser: action.user };
//   ) {
//   }
// };

export const CustomerProvider = ({ children }) => {
  const [signedInUser, setSignedInUser] = useState(() => {
    return window.sessionStorage.getItem("signedInUser")
      ? JSON.parse(window.sessionStorage.getItem("signedInUser"))
      : null;
  });

  const [userType, setUserType] = useState(() => {
    return window.sessionStorage.getItem("userType")
      ? JSON.parse(window.sessionStorage.getItem("userType"))
      : "customer";
  });

  const [bookingCriteria, setBookingCriteria] = useState(() => {
    return window.sessionStorage.getItem("bookingCriteria")
      ? JSON.parse(window.sessionStorage.getItem("bookingCriteria"))
      : null;
  });

  const [matches, setMatches] = useState(() => {
    return window.sessionStorage.getItem("matches")
      ? JSON.parse(window.sessionStorage.getItem("matches"))
      : [];
  });

  const [selectedMatch, setSelectedMatch] = useState(() => {
    return window.sessionStorage.getItem("selectedMatch")
      ? JSON.parse(window.sessionStorage.getItem("selectedMatch"))
      : null;
  });

  const [reservation, setReservation] = useState(() => {
    return sessionStorage.getItem("reservation")
      ? JSON.parse(sessionStorage.getItem("reservation"))
      : null;
  });
  //const [user, dispatch] = useReducer(reducer, signedInUser);

  // const signIn = (user) => {
  //   dispatch({
  //     type: "sign-in",
  //     user: user,
  //   });
  // };

  return (
    <CustomerContext.Provider
      value={{
        signedInUser,
        setSignedInUser,
        userType,
        setUserType,
        bookingCriteria,
        setBookingCriteria,
        matches,
        setMatches,
        selectedMatch,
        setSelectedMatch,
        reservation,
        setReservation,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};
