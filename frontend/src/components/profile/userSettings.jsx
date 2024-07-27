import React, { useState, useEffect } from 'react';
import Layout from '../../pages/Layout/Layout1';
import { useThemedStyles } from '../../hooks/ThemeContrast';
import { useTheme } from '../Theme/ThemeContext';
import TTSButton from "../Buttons/TTSButton";
function UserSettings() {
  const { theme, setTheme, contrast, setContrast } = useTheme();
  const { backgroundColor, textColor, cardBackground } = useThemedStyles();

  const [rate, setRate] = useState(() => {
    return localStorage.getItem('ttsSpeed') || '1';
  });


  const handleTtsSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    setRate(newSpeed);
    localStorage.setItem('ttsSpeed', newSpeed);
  };

  return (
    <Layout>
      <div className={`min-h-screen ${backgroundColor}`}>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className={`text-4xl font-bold mb-8 ${textColor}`}>User Settings</h1>

          <div className={`p-6 rounded-lg shadow-lg ${cardBackground} mb-8`}>
            <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>Appearance</h2>

            <div className="mb-4">
              <label htmlFor="theme" className={`block mb-2 ${textColor}`}>Theme</label>
              <select 
                id="theme"
                value={theme} 
                onChange={(e) => setTheme(e.target.value)}
                className="w-full p-2 rounded"
              >
                <option value="default">Default Theme</option>
                <option value="light">Light Theme</option>
                <option value="dark">Dark Theme</option>
              </select>
            </div>

            <div>
              <label htmlFor="contrast" className={`block mb-2 ${textColor}`}>Contrast</label>
              <select 
                id="contrast"
                value={contrast} 
                onChange={(e) => setContrast(e.target.value)}
                className="w-full p-2 rounded"
              >
                <option value="normal">Normal Contrast</option>
                <option value="high">High Contrast</option>
              </select>
            </div>
          </div>

          <div className={`p-6 rounded-lg shadow-lg ${cardBackground} mb-8`}>
            <h2 className={`text-2xl font-semibold mb-4 ${textColor}`}>Text-to-Speech</h2>

            <div className="mb-4">
              <label htmlFor="ttsSpeed" className={`block mb-2 ${textColor}`}>TTS Speed</label>
              <input
                type="range"
                id="ttsSpeed"
                min="0.5"
                max="2"
                step="0.1"
                value={rate}
                onChange={handleTtsSpeedChange}
                className="w-full"
              />
              <span className={textColor}>{rate}</span>
              <TTSButton text={"This is the test for Text to Speech Speed"} />
            </div>
          </div>

          <p className={`${textColor}`}>Your settings are automatically saved.</p>
        </div>
      </div>
    </Layout>
  );
}

export default UserSettings;
