import React, { useEffect, useState } from "react";
import Layout from "../../../pages/Layout/Layout1";
import TTSButton from "../../Buttons/TTSButton";
import { useThemedStyles } from "../../../hooks/ThemeContrast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faBook,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";
import { fetchEnrolledCoursesContent } from "../../../API/courseApi";
import { useParams } from "react-router-dom";

const UserQuestion = () => {
  const { courseId } = useParams();
  const {
    backgroundColor,
    textColor,
    cardBackground,
    accordionHeaderBackground,
    accordionContentBackground,
  } = useThemedStyles();
  const [courseContent, setCourseContent] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null);
  const [answers, setAnswers] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState({});

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const contents = await fetchEnrolledCoursesContent(courseId);
      setCourseContent(contents);
    } catch (error) {
      console.error("Error fetching course content:", error);
    }
  };

  const toggleSection = (sectionId) => {
    setCourseContent((prevContent) =>
      prevContent.map((section) =>
        section.section_id === sectionId
          ? { ...section, isOpen: !section.isOpen }
          : section
      )
    );
  };

  const handleContentClick = (content) => {
    setSelectedContent(content);
  };

  const handleAnswerChange = (questionId, value) => {
    if (!answeredQuestions[questionId]) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted answers:", answers);
    const newAnsweredQuestions = { ...answeredQuestions };
    Object.keys(answers).forEach((questionId) => {
      newAnsweredQuestions[questionId] = true;
    });
    setAnsweredQuestions(newAnsweredQuestions);
  };

  const renderContent = () => {
    if (!selectedContent) {
      return (
        <p className={`text-center ${textColor}`}>
          Select a lecture or quiz from the sidebar to view content.
        </p>
      );
    }

    if (selectedContent.type === "lecture") {
      return (
        <div className={`mb-6 ${cardBackground} p-4 rounded-lg shadow`}>
          <h3 className={`text-xl font-bold mb-4 ${textColor}`}>
            {selectedContent.title}
          </h3>
          <p className={`${textColor}`}>{selectedContent.description}</p>
          {selectedContent && (
            <div className="mt-2">
              <p>Video: {selectedContent.title}</p>
              {selectedContent.video_path && (
                <video width="1024" height="576" controls>
                  <source
                    src={`http://localhost:5000/${selectedContent.video_path}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
        {selectedContent.questions &&
          selectedContent.questions.map((question) => (
            <div
              key={question.question_id}
              className={`mb-6 ${cardBackground} p-4 rounded-lg shadow`}
            >
              <h3 className={`text-xl font-bold mb-4 ${textColor}`}>
                {selectedContent.title}
              </h3>
              <p className={`mb-6 ${textColor}`}>
                {selectedContent.description}
              </p>
              <div className="flex items-center mb-2">
                <h3 className={`text-lg font-bold ${textColor}`}>
                  {question.question_text}
                </h3>
                <TTSButton text={question.question_text} />
              </div>
              {question.question_type === "multiple_choice" ? (
                <div className="mb-4">
                  {question.options.map((choice, index) => (
                    <label key={index} className={`block mb-2 ${textColor}`}>
                      <input
                        type="radio"
                        name={`question-${question.question_id}`}
                        value={choice.option_text}
                        onChange={(e) =>
                          handleAnswerChange(
                            question.question_id,
                            e.target.value
                          )
                        }
                        className="mr-2"
                      />
                      {choice.option_text}
                    </label>
                  ))}
                </div>
              ) : (
                <div className="mb-4">
                  <textarea
                    name={`question-${question.question_id}`}
                    rows="4"
                    onChange={(e) =>
                      handleAnswerChange(question.question_id, e.target.value)
                    }
                    className={`w-full px-3 py-2 border rounded ${backgroundColor} ${textColor}`}
                    placeholder="Write your answer here"
                  ></textarea>
                </div>
              )}
            </div>
          ))}
        {selectedContent.questions && selectedContent.questions.length > 0 && (
          <div className="text-right">
            <button
              type="submit"
              className={`px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors`}
            >
              Submit Answers
            </button>
          </div>
        )}
      </form>
    );
  };

  return (
    <Layout>
      <div className={`flex min-h-screen ${backgroundColor} shadow-lg`}>
        <div className={`w-1/4 p-4 overflow-y-auto ${backgroundColor}`}>
          <h2 className={`text-2xl font-bold mb-6 ${textColor}`}>
            Course Sections
          </h2>
          {courseContent.map((section) => (
            <div key={section.section_id} className="mb-4">
              <button
                className={`w-full text-left rounded-md font-semibold py-3 px-4 ${
                  section.isOpen
                    ? "bg-blue-600 text-white"
                    : accordionHeaderBackground
                } shadow-md transition-all duration-300 ease-in-out flex justify-between items-center ${textColor}`}
                onClick={() => toggleSection(section.section_id)}
              >
                <span>{section.title}</span>
                <FontAwesomeIcon
                  icon={section.isOpen ? faChevronUp : faChevronDown}
                />
              </button>
              {section.isOpen && (
                <div className="mt-2 ml-4 space-y-2">
                  {section.lectures.map((lecture) => (
                    <button
                      key={lecture.lecture_id}
                      className={`w-full text-left py-2 px-4 ${accordionContentBackground} rounded-md shadow-sm ${textColor} hover:bg-opacity-80 transition-all duration-200 ease-in-out flex items-center`}
                      onClick={() =>
                        handleContentClick({ ...lecture, type: "lecture" })
                      }
                    >
                      <FontAwesomeIcon icon={faBook} className="mr-2" />
                      <span>{lecture.title}</span>
                    </button>
                  ))}
                  {section.quizzes.map((quiz) => (
                    <button
                      key={quiz.Quiz_id}
                      className={`w-full text-left py-2 px-4 ${accordionContentBackground} rounded-md shadow-sm ${textColor} hover:bg-opacity-80 transition-all duration-200 ease-in-out flex items-center`}
                      onClick={() =>
                        handleContentClick({ ...quiz, type: "quiz" })
                      }
                    >
                      <FontAwesomeIcon
                        icon={faQuestionCircle}
                        className="mr-2"
                      />
                      <span>{quiz.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={`flex-1 p-4 overflow-y-auto ${backgroundColor}`}>
          {renderContent()}
        </div>
      </div>
    </Layout>
  );
};

export default UserQuestion;
