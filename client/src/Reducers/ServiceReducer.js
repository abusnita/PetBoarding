import React, { createContext, useReducer } from "react";

export const ServiceContext = createContext();
const persistedState = "";
const reducer = (state, action) => {
  switch (action.type) {
    case "":
      {
      }
      return {};
  }
};

export const ServiceProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, persistedState);

  const addItemToShoppingCart = (item, qty, stock) => {
    dispatch({
      type: "add-item-to-shopping-cart",
      item: item,
      qty: qty,
      stock: stock,
    });
  };

  return (
    <ServiceContext.Provider
      value={{
        //cart,
        addItemToShoppingCart,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
