import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Profile from "../../components/profile/profile";
const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 ">
        <header className="App-header shadow-xl h-12">
          <div className="flex justify-end items-center h-full">
            <Profile />
          </div>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
