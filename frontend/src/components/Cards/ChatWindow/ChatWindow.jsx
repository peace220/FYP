import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Message from '../../Collaborations/Messages';
import ChatInput from '../../Collaborations/Chatinput';

const socket = io('http://localhost:3000'); 

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = (message) => {
    socket.emit('message', message);
    setMessages((prevMessages) => [...prevMessages, { message, user: true }]);
  };

  return (
    <div className="flex flex-col h-full border p-4">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <Message key={index} message={msg.message} user={msg.user} />
        ))}
      </div>
      <ChatInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;
