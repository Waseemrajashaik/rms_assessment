"use client";
import { Earthquake } from "@/types";
import { createContext, useContext, useState, ReactNode } from "react";

interface ContextType {
  selectedRow: Earthquake | null;
  setSelectedRow: (row: Earthquake | null) => void;
}

const Context = createContext<ContextType | undefined>(undefined);

export const useContextProvider = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useContextProvider must be used within a ContextProvider");
  return context;
};

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRow, setSelectedRow] = useState<Earthquake | null>(null);

  const handleSetSelectedRow = (row: Earthquake | null) => {
    setSelectedRow(row ? row : null);
  };

  return (
    <Context.Provider
      value={{
        selectedRow,
        setSelectedRow: handleSetSelectedRow,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
