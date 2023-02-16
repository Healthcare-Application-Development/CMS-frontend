import React, { useContext, createContext } from "react";

export const StateContextProvider = ({ children }) => {
    
    const greet = () => {
      return "Hey im context!";
    };

    return (
      <StateContext.Provider
        value={{
            greet,
        }}
      >
        {children}
      </StateContext.Provider>
    );
  };
  
  export const useStateContext = () => useContext(StateContext);