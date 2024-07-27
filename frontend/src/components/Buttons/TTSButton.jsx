import React, { useState, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useThemedStyles } from "../../hooks/ThemeContrast";

const TTSButton = ({ text }) => {
  const { speak, cancel } = useSpeechSynthesis();
  const { textColor } = useThemedStyles();
  const rate = localStorage.getItem("ttsSpeed");
  const handleSpeak = () => {
    cancel();
    console.log(rate);
    speak({ text, rate });
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleSpeak}
        className="ml-2 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700"
      >
        🔊
      </button>
    </div>
  );
};

export default TTSButton;
