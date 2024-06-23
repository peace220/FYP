import React from 'react';
import TTSButton from './TTSButton';

const Question = ({ text }) => {
  return (
    <div className="question-container">
      <p>{text}</p>
      <TTSButton text={text} />
    </div>
  );
};

export default Question;
