import React from "react";
import Layout from "./Layout/Layout1.jsx";
import TTSButton from "../components/Buttons/TTSButton.jsx";
import { useThemedStyles } from "../hooks/ThemeContrast.jsx";

function Home() {
  const { backgroundColor, textColor, cardBackground } = useThemedStyles();
  const welcomeMessage =
    "Welcome to our inclusive learning platform. Explore our features and start your learning journey today!";

  const features = [
    {
      title: "Customizable Accessibility",
      description: "Tailor your learning experience to your needs.",
    },
    {
      title: "Adaptive Assessments",
      description: "Fair and accessible evaluations for all learners.",
    },
    {
      title: "Multi-format Content",
      description: "Access materials in text, audio, and visual formats.",
    },
  ];

  const benefits = [
    {
      title: "Increased Engagement",
      description: "Interactive features keep learners motivated.",
    },
    {
      title: "Improved Outcomes",
      description: "Personalized learning paths lead to better results.",
    },
    {
      title: "Enhanced Inclusivity",
      description: "Everyone has equal opportunity to succeed.",
    },
    {
      title: "Lifelong Learning",
      description: "Develop skills at your own pace, anytime, anywhere.",
    },
  ];

  return (
    <Layout>
      <div className={`min-h-screen ${backgroundColor}`}>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <h1 className={`text-5xl font-bold mb-6 text-center ${textColor}`}>
            Welcome to Inclusive Learning
          </h1>
          <TTSButton text={welcomeMessage} className="mb-8 mx-auto block" />

          <div>
            <h2 className={`text-3xl font-semibold mb-6 ${textColor}`}>
              Get Started
            </h2>
            <p className={`mb-4 ${textColor}`}>
              Ready to embark on your learning journey? Join our community of
              learners today and experience the power of inclusive education.
            </p>
          </div>
          <div className="mb-16">
            <h2 className={`text-3xl font-semibold mb-6 ${textColor}`}>
              Our Features
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg shadow-lg ${cardBackground}`}
                >
                  <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>
                    {feature.title}
                  </h3>
                  <p className={textColor}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className={`text-3xl font-semibold mb-6 ${textColor}`}>
              Benefits
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg shadow-lg ${cardBackground}`}
                >
                  <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>
                    {benefit.title}
                  </h3>
                  <p className={textColor}>{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
