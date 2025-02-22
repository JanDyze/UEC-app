import { createContext, useState, useContext } from "react";

const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

const useSidebar = () => useContext(SidebarContext);

export { SidebarProvider, useSidebar };
