import "../styles/App.css";
import { useState } from "react";
import Sidebar from "./sidebar/sidebar.jsx";
import Question from './components/Questions';

function App() {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState("");
  const [storedValues, setStoredValues] = useState([]);
  const questions = [
    "What is your name?",
    "How old are you?",
    "Where are you from?",
  ];

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setMessage(data.message); // Display success message from the backend
    } catch (error) {
      console.error("Failed to fetch:", error);
      setMessage("Failed to store value"); // Display error message
    }
  };

  const fetchStoredValues = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/values");
      const data = await response.json();
      setStoredValues(data);
    } catch (error) {
      console.error("Failed to fetch values:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Sidebar />
        <input
          placeholder="Enter something"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button onClick={handleButtonClick}>Store</button>
        <a>asd{inputValue}</a>
        <p>{message}</p> {/* Display backend response message */}
        <button onClick={fetchStoredValues}>Fetch Stored Values</button>
        <ul>
          {storedValues.map((item) => (
            <li key={item.id}>{item.value}</li>
          ))}
        </ul>
        <h1>Voice Activated Speech to Text</h1>
        {questions.map((question, index) => (
        <Question key={index} text={question} />
      ))}
      </header>
    </div>
  );
}

export default App;
