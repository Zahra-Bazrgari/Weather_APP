import React, { createContext, useContext, useState } from 'react';

interface Position {
  lng: number;
  lat: number;
}

interface GlobalPositionContextType {
  userPosition: Position;
  setUserPosition: React.Dispatch<React.SetStateAction<Position>>;
}

export const GlobalPositionContext = createContext<GlobalPositionContextType | undefined>(undefined);

export const GlobalPositionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userPosition, setUserPosition] = useState<Position>({ lng: 51.3347, lat: 35.7219 });

  return (
    <GlobalPositionContext.Provider value={{ userPosition, setUserPosition }}>
      {children}
    </GlobalPositionContext.Provider>
  );
};

export const useGlobalPosition = () => {
  const context = useContext(GlobalPositionContext);
  console.log(context)
  if (!context) {
    throw new Error('useGlobalPosition must be used within a GlobalPositionProvider');
  }
  return context;
};
