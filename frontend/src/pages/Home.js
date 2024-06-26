import Sidebar from "../components/Sidebar/Sidebar.jsx";
import TTSButton from "../components/Buttons/TTSButton.jsx";
import Profile from "../components/profile/profile.jsx";
import Layout from "./Layout/Layout1.jsx";
function Home() {
  const questions = ["hello"];

  return (
    <Layout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Home</h1>
        <TTSButton text={questions} />
      </div>
    </Layout>
  );
}

export default Home;
