import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useThemedStyles } from "../../hooks/ThemeContrast";
const TTSButton = ({ text }) => {
  const { speak } = useSpeechSynthesis();
  const { textColor } = useThemedStyles();
  return (
    <div className="container mb-4 flex items-center">
      <p className={`mr-2 ${textColor}`}>{text}</p>
      <button
        onClick={() => speak({ text })}
        className="ml-2 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700"
      >
        🔊
      </button>
    </div>
  );
};

export default TTSButton;
