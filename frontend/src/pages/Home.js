import Sidebar from "./sidebar/sidebar.jsx";
import TTSButton from "../components/TTSButton.jsx";
import Profile from "../components/profile/profile.jsx";

function Home() {
  const questions = [
  "你好吗"
  ];

  return (
    <div className="App flex h-screen">
      <Sidebar />
      <div className="flex-1 ">
        <header className="App-header shadow-xl h-12">
        <div className="flex justify-end items-center h-full">
            <Profile />
          </div>
        </header>
        <div>
          <h1 className="text-3xl font-bold mb-8">Home</h1>
          <TTSButton text={questions}/>
        </div>
      </div>
    </div>
  );
}

export default Home;
