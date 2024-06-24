import Sidebar from "./sidebar/sidebar.jsx";
import TTSButton from "../components/TTSButton.jsx";

function Home() {
  const questions = [
    "What is your name?",
    "How old are you?",
    "Where are you from?",
  ];

  return (
    <div className="App flex h-screen">
    <Sidebar />
    <div className="flex-1 p-8">
      <header className="App-header">
        <h1 className="text-3xl font-bold mb-8">Voice Activated Speech to Text</h1>
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <TTSButton text={question} />
          </div>
        ))}
      </header>
    </div>
  </div>
  );
}

export default Home;
