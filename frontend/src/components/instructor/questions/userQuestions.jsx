import React, { useState, useEffect } from "react";
import Layout from "../../../pages/Layout/Layout1";
import { useLocation } from "react-router-dom";
import { useThemedStyles } from "../../../hooks/ThemeContrast";
const UserQuestion = () => {
  const { backgroundColor, textColor, cardBackground } = useThemedStyles();
  const location = useLocation();
  const questions = location.state.sampleQuestions;
  const [answers, setAnswers] = useState({});

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Section 1",
      content: [
        { id: 1, type: "lecture", title: "Lecture 1.1" },
        { id: 2, type: "quiz", title: "Quiz 1.1" },
        { id: 3, type: "lecture", title: "Lecture 1.2" },
      ],
    },
    {
      id: 2,
      title: "Section 2",
      content: [
        { id: 4, type: "lecture", title: "Lecture 2.1" },
        { id: 5, type: "quiz", title: "Quiz 2.1" },
        { id: 6, type: "lecture", title: "Lecture 2.2" },
      ],
    },
  ]);

  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };
  return (
    <Layout>
  <div className={`flex min-h-screen ${backgroundColor} shadow-lg`}>
        <div className={`w-1/4 p-4 overflow-y-auto ${backgroundColor}`}>
          <h2 className={`text-xl font-bold mb-4 ${textColor}`}>Course Sections</h2>
          {sections.map((section) => (
            <div key={section.id} className="mb-4">
              <button
                className={`w-full text-left font-semibold py-2 px-4 ${cardBackground} rounded shadow ${textColor}`}
                onClick={() => toggleSection(section.id)}
              >
                {section.title}
              </button>
              {activeSection === section.id && (
                <ul className="mt-2 ml-4">
                  {section.content.map((item) => (
                    <li key={item.id} className={`py-1 ${textColor}`}>
                      <span
                        className={`mr-2 ${
                          item.type === "lecture"
                            ? "text-blue-500"
                            : "text-green-500"
                        }`}
                      >
                        {item.type === "lecture" ? "📚" : "✅"}
                      </span>
                      {item.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className={`flex-1 p-4 overflow-y-auto ${backgroundColor}`}>
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            {questions.map((question) => (
              <div key={question.id} className={`mb-6 ${cardBackground} p-4 rounded-lg shadow`}>
                <h3 className={`text-lg font-bold mb-3 ${textColor}`}>{question.text}</h3>
                {question.type === "multiple-choice" ? (
                  <div className="mb-4">
                    {question.choices.map((choice, index) => (
                      <label key={index} className={`block mb-2 ${textColor}`}>
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={choice}
                          onChange={(e) =>
                            handleAnswerChange(question.id, e.target.value)
                          }
                          className="mr-2"
                        />
                        {choice}
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="mb-4">
                    <textarea
                      name={`question-${question.id}`}
                      rows="4"
                      onChange={(e) =>
                        handleAnswerChange(question.id, e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded ${backgroundColor} ${textColor}`}
                      placeholder="Write your answer here"
                    ></textarea>
                  </div>
                )}
              </div>
            ))}
            <div className="text-right">
              <button
                type="submit"
                className={`px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors`}
              >
                Submit Answers
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UserQuestion;