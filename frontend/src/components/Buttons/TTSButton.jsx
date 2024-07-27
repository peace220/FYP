import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";

const TTSButton = ({ text }) => {
  const { speak, cancel } = useSpeechSynthesis();
  const rate = localStorage.getItem("ttsSpeed");
  const handleSpeak = () => {
    cancel();
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
