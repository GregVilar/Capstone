import React, { createContext, useContext, useState } from 'react';

// Create Context
const ColorInversionContext = createContext();

// Provider Component
export const ColorInversionProvider = ({ children }) => {
  const [isInverted, setIsInverted] = useState(false);

  return (
    <ColorInversionContext.Provider value={{ isInverted, setIsInverted }}>
      {children}
    </ColorInversionContext.Provider>
  );
};

// Custom hook for easy access
export const useColorInversion = () => {
  return useContext(ColorInversionContext);
};
