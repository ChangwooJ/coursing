import React, { createContext, useState } from 'react';

export const PositionsContext = createContext();

export const PositionsProvider = ({ children }) => {
  const [positions, setPositions] = useState([]);

  return (
    <PositionsContext.Provider value={{ positions, setPositions }}>
      {children}
    </PositionsContext.Provider>
  );
};