// src/components/TTSButton.js
import React from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

const TTSButton = ({ text }) => {
  const { speak } = useSpeechSynthesis();

  return (
    <button onClick={() => speak({ text })}>
      🔊
    </button>
  );
};

export default TTSButton;
