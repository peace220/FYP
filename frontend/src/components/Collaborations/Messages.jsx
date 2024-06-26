import React from 'react';

const Message = ({ message, user }) => {
  return (
    <div className={`flex items-center ${user ? 'justify-end' : 'justify-start'}`}>
      <div className={`p-2 m-2 rounded-lg ${user ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
        {message}
      </div>
    </div>
  );
};

export default Message;
