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
import {
  fetchEnrolledCoursesContent,
  storeUserAnswer,
  fetchPreviousAnswers,
  fetchTranscript,
} from "../../../API/courseApi";
import { useParams } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useTranslation } from "react-i18next";

const UserQuestion = () => {
  const { t } = useTranslation();
  const { courseId } = useParams();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
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
  const [previousAnswers, setPreviousAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [submitNotification, setSubmitNotification] = useState("");
  const [lectureTranscript, setLectureTranscript] = useState("");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const contents = await fetchEnrolledCoursesContent(courseId);
      setCourseContent(contents);
      const answers = await fetchPreviousAnswers(courseId);
      setPreviousAnswers(answers);
    } catch (error) {
      console.error("Error fetching course content:", error);
    }
  };
  const fetchTranscriptContent = async (videoId) => {
    try {
      const transcriptContent = await fetchTranscript(videoId);
      console.log(transcriptContent);
      setLectureTranscript(transcriptContent);
    } catch (error) {
      console.error("Error fetching transcript:", error);
    }
  };

  useEffect(() => {
    console.log(selectedContent);
    if (
      selectedContent &&
      selectedContent.itemType === "lecture" &&
      selectedContent.video_id
    ) {
      fetchTranscriptContent(selectedContent.video_id);
    }
  }, [selectedContent]);

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
    resetAnswerState();
  };

  const resetAnswerState = () => {
    setCurrentAnswer("");
    resetTranscript();
    setLiveTranscript("");
  };

  const handleAnswerChange = (questionType, value) => {
    if (questionType === "multiple_choice") {
      setAnswers({
        option_id: value,
        answer: "",
        questionType: questionType,
      });
    } else if (questionType === "essay") {
      setAnswers({
        option_id: "",
        answer: value,
        questionType: questionType,
      });
    }
  };

  const handleSubmit = async (e, questionId) => {
    e.preventDefault();
    const updatedAnswers = { question_id: questionId, ...answers };
    try {
      await storeUserAnswer(updatedAnswers);
      setSubmitNotification("Answers submitted successfully!");
      setTimeout(() => {
        setSubmitNotification("");
      }, 3000);
    } catch (error) {
      console.error("Error submitting answers:", error);
      setSubmitNotification("Error submitting answers. Please try again.");
      setTimeout(() => {
        setSubmitNotification("");
      }, 3000);
    }
  };

  const startListening = () => {
    resetTranscript();
    setLiveTranscript("");
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    const newAnswer = currentAnswer + " " + transcript;
    setCurrentAnswer(newAnswer);
    handleAnswerChange("essay", newAnswer);
    setLiveTranscript("");
  };

  const handleResetTranscript = () => {
    resetTranscript();
    setLiveTranscript("");
  };

  useEffect(() => {
    setLiveTranscript(transcript);
  }, [transcript]);

  const renderContent = () => {
    if (!selectedContent) {
      return (
        <p className={`text-center ${textColor}`}>
          {t("questions.selectQuestions")}
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
              <p>
                {t("curriculum.video")}: {selectedContent.title}
              </p>
              {selectedContent.video_path && (
                <video width="1024" height="576" controls>
                  <source
                    src={`http://localhost:5000/${selectedContent.video_path}`}
                    type="video/mp4"
                  />
                  {t("notSupportTag")}
                </video>
              )}
            </div>
          )}
          {lectureTranscript && (
            <div className="mt-4">
              <h4 className={`text-lg font-bold mb-2 ${textColor}`}>
                {t("curriculum.transcript")}
              </h4>
              <div
                className={`${cardBackground} p-4 rounded-lg shadow max-h-60 overflow-y-auto`}
              >
                <pre className={`whitespace-pre-wrap ${textColor}`}>
                  {lectureTranscript}
                </pre>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="max-w-3xl mx-auto">
        {selectedContent.questions &&
          selectedContent.questions.map((question) => {
            const previousAnswer = previousAnswers[question.question_id];
            const hasAnswered = !!previousAnswer.answer;
            return (
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
                          value={choice.options_id}
                          onChange={(e) =>
                            handleAnswerChange(
                              question.question_type,
                              e.target.value
                            )
                          }
                          disabled={hasAnswered}
                          checked={
                            !hasAnswered &&
                            answers.option_id === choice.options_id.toString()
                          }
                          className="mr-2"
                        />
                        {choice.option_text}
                        {hasAnswered &&
                          previousAnswer.isCorrect &&
                          previousAnswer.answer ===
                            choice.options_id.toString() && (
                            <span className="ml-2 text-green-500">
                              (Correct)
                            </span>
                          )}
                        {hasAnswered &&
                          !previousAnswer.isCorrect &&
                          previousAnswer.answer ===
                            choice.options_id.toString() && (
                            <span className="ml-2 text-red-500">
                              (Incorrect)
                            </span>
                          )}
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="mb-4">
                    {browserSupportsSpeechRecognition === true ? (
                      <div className="mb-2">
                        <button
                          onClick={startListening}
                          disabled={listening || hasAnswered}
                          className={`px-4 py-2 rounded mr-2 ${
                            listening || hasAnswered
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-blue-500 hover:bg-blue-600 text-white"
                          }`}
                        >
                          {t("TTS.startListening")}
                        </button>
                        <button
                          onClick={stopListening}
                          disabled={!listening || hasAnswered}
                          className={`px-4 py-2 rounded mr-2 ${
                            !listening || hasAnswered
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-red-500 hover:bg-red-600 text-white"
                          }`}
                        >
                          {t("TTS.stopListening")}
                        </button>
                        <button
                          onClick={handleResetTranscript}
                          disabled={hasAnswered}
                          className={`px-4 py-2 rounded ${
                            hasAnswered
                              ? "bg-gray-300 cursor-not-allowed"
                              : "bg-yellow-500 hover:bg-yellow-600 text-white"
                          }`}
                        >
                          {t("TTS.reset")}
                        </button>
                      </div>
                    ) : (
                      <h3 className={`text-lg ${textColor}`}>
                        {t("TTS.STTsupport")}
                      </h3>
                    )}
                    {listening && (
                      <div className="mb-2 p-2 bg-gray-100 rounded">
                        <p className="font-semibold">
                          {t("TTS.liveTranscript")}:
                        </p>
                        <p>{liveTranscript}</p>
                      </div>
                    )}
                    <textarea
                      name={`question-${question.question_id}`}
                      rows="4"
                      onChange={(e) => {
                        handleAnswerChange(
                          question.question_type,
                          e.target.value
                        );
                        setCurrentAnswer(e.target.value);
                      }}
                      readOnly={hasAnswered}
                      value={
                        hasAnswered
                          ? `${t("questions.originalAnswer")}: ${
                              previousAnswer.answer
                            }`
                          : currentAnswer
                      }
                      className={`w-full px-3 py-2 border rounded ${backgroundColor} ${textColor} ${
                        hasAnswered ? "cursor-not-allowed" : ""
                      }`}
                      placeholder={
                        hasAnswered
                          ? t("questions.previousAnswer")
                          : t("questions.writeAnswer")
                      }
                    ></textarea>
                    {hasAnswered && (
                      <p>
                        {t("questions.Answeris")}: {question.answer_text}
                      </p>
                    )}
                  </div>
                )}
                {selectedContent.questions &&
                  selectedContent.questions.length > 0 && (
                    <div className="text-right">
                      <button
                        type="submit"
                        disabled={hasAnswered}
                        onClick={(e) => handleSubmit(e, question.question_id)}
                        className={`px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors ${
                          hasAnswered ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        {hasAnswered
                          ? t("questions.alreadySubmit")
                          : t("questions.submitAnswer")}
                      </button>
                      {submitNotification && (
                        <p className={`mt-2 text-sm ${textColor}`}>
                          {submitNotification}
                        </p>
                      )}
                    </div>
                  )}
              </div>
            );
          })}
      </div>
    );
  };

  return (
    <Layout>
      <div className={`flex min-h-screen ${backgroundColor} shadow-lg`}>
        <div className={`w-1/4 p-4 overflow-y-auto ${backgroundColor}`}>
          <h2 className={`text-2xl font-bold mb-6 ${textColor}`}>
            {t("questions.courseSection")}
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
                  {section.contents
                    .sort((a, b) => a.order_num - b.order_num)
                    .map((content) =>
                      content.itemType === "lecture" ? (
                        <button
                          key={content.lecture_id}
                          className={`w-full text-left py-2 px-4 ${accordionContentBackground} rounded-md shadow-sm ${textColor} hover:bg-opacity-80 transition-all duration-200 ease-in-out flex items-center`}
                          onClick={() =>
                            handleContentClick({ ...content, type: "lecture" })
                          }
                        >
                          <FontAwesomeIcon icon={faBook} className="mr-2" />
                          <span>{content.itemType}</span>
                        </button>
                      ) : (
                        <button
                          key={content.Quiz_id}
                          className={`w-full text-left py-2 px-4 ${accordionContentBackground} rounded-md shadow-sm ${textColor} hover:bg-opacity-80 transition-all duration-200 ease-in-out flex items-center`}
                          onClick={() =>
                            handleContentClick({ ...content, type: "quiz" })
                          }
                        >
                          <FontAwesomeIcon
                            icon={faQuestionCircle}
                            className="mr-2"
                          />
                          <span>{content.title}</span>
                        </button>
                      )
                    )}
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
