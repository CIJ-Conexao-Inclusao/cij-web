import React, { createContext, useContext, useState } from "react";

interface ISidebarContext {
  open: boolean;
  handleSidebarChange: () => void;
  changed: number;
  setChanged: React.Dispatch<React.SetStateAction<number>>;
}

const SidebarContext = createContext<ISidebarContext>({} as ISidebarContext);

interface ISidebarProviderProps {
  children: React.ReactNode;
}

const sideBarKey = "sidebar-open";

const SidebarProvider: React.FC<ISidebarProviderProps> = ({ children }) => {
  const localOpen = localStorage.getItem(sideBarKey) || "true";
  const [open, setOpen] = useState(localOpen === "true");
  const [changed, setChanged] = useState(0);

  const handleSidebarChange = () => {
    localStorage.setItem(sideBarKey, (!open).toString());
    setOpen(!open);
  };

  return (
    <SidebarContext.Provider
      value={{ open, handleSidebarChange, changed, setChanged }}>
      {children}
    </SidebarContext.Provider>
  );
};

const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within an SidebarProvider");
  }

  return context;
};

export { SidebarProvider, useSidebar };
