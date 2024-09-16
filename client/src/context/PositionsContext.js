import React, { createContext, useContext, useState } from 'react';

export const PositionsContext = createContext();

export const PositionsProvider = ({ children }) => {
  const [positions, setPositions] = useState([]);

  return (
    <PositionsContext.Provider value={{ positions, setPositions }}>
      {children}
    </PositionsContext.Provider>
  );
};

//use훅을 이용해서 positions를 개별적으로 사용가능함.
export const usePositions = () => useContext(PositionsContext);