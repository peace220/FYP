import React from "react";
import ChatWindow from "../components/Cards/LanguageModel/ChatWindow/ChatWindow";
import Layout from "./Layout/Layout1";

const Collaboration = () => {
  return (
    <Layout>
    <div className="h-full flex">
      <div className="w-1/4 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-4">Collaboration</h2>
      </div>
      <div className="w-3/4 flex flex-col">
        <header className="p-4 bg-gray-200">
          <h1 className="text-2xl font-bold">Group Chat</h1>
        </header>
        <div className="flex-1 p-4">
          <ChatWindow />
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Collaboration;
