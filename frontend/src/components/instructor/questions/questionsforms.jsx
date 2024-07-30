import React, { useState, useEffect } from "react";
import {
  createQuestion,
  getQuestions,
  updateQuestions,
} from "../../../API/curriculumApi";
import { useTranslation } from "react-i18next";
const QuestionForm = ({ item }) => {
  const { t } = useTranslation();
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("multiple_choice");
  const [options, setOptions] = useState([
    { id: 1, option_text: "", is_correct: false },
    { id: 2, option_text: "", is_correct: false },
    { id: 3, option_text: "", is_correct: false },
    { id: 4, option_text: "", is_correct: false },
  ]);
  const [answer, setAnswer] = useState("");
  const [existingQuestion, setExistingQuestion] = useState(null);
  const [validationError, setValidationError] = useState("");

  const fetchQuestions = async () => {
    try {
      const questions = await getQuestions(item);
      if (questions.length <= 0) {
        return;
      }
      const question = questions[0];
      if (question.section_id == item.section_id) {
        setExistingQuestion(question);
        setQuestionText(question.question_text);
        setQuestionType(question.question_type);
        if (question.question_type === "multiple_choice") {
          setOptions(
            question.options.length === 4
              ? question.options
              : [
                  { id: 1, option_text: "", is_correct: false },
                  { id: 2, option_text: "", is_correct: false },
                  { id: 3, option_text: "", is_correct: false },
                  { id: 4, option_text: "", is_correct: false },
                ]
          );
        } else {
          setAnswer(question.answer?.answer_text || "");
        }
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [item]);

  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
    setOptions([
      { option_text: "", is_correct: false },
      { option_text: "", is_correct: false },
      { option_text: "", is_correct: false },
      { option_text: "", is_correct: false },
    ]);
    setAnswer("");
  };

  const handleOptionChange = (index, e) => {
    const newOptions = options.map((option, i) =>
      i === index ? { ...option, option_text: e.target.value } : option
    );
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (index) => {
    const newOptions = options.map((option, i) => ({
      ...option,
      is_correct: i === index,
    }));
    setOptions(newOptions);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (questionType === "multiple_choice") {
      const hasCorrectOption = options.some((option) => option.is_correct);
      if (!hasCorrectOption) {
        setValidationError("Please select at least one correct option.");
        return;
      }
    }

    setValidationError("");

    const questionData = {
      question_text: questionText,
      question_type: questionType,
      course_id: item.course_id,
      section_id: item.section_id,
      quiz_id: item.id,
      options: questionType === "multiple_choice" ? options : null,
      answer:
        questionType === "multiple_choice"
          ? options.find((option) => option.is_correct)?.option_text
          : answer,
    };
    try {
      if (existingQuestion) {
        const updateData = {
          ...questionData,
          question_id: existingQuestion.question_id,
        };
        await updateQuestions(updateData);
      } else {
        await createQuestion(questionData);
      }
      await fetchQuestions();
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="questionText"
          >
            {t("questions.questionText")}
          </label>
          <input
            type="text"
            id="questionText"
            value={questionText}
            onChange={handleQuestionTextChange}
            className="w-full px-3 py-2 border rounded"
            placeholder={t("questions.enterQuestion")}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="questionType"
          >
            {t("questions.questionType")}
          </label>
          <select
            id="questionType"
            value={questionType}
            onChange={handleQuestionTypeChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="multiple_choice">
              {t("questions.multipleChoice")}
            </option>
            <option value="essay">{t("questions.essay")}</option>
          </select>
        </div>
        {questionType === "multiple_choice" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              {t("questions.options")}
            </label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option.option_text}
                  onChange={(e) => handleOptionChange(index, e)}
                  className="w-full px-3 py-2 border rounded mr-2"
                  required
                  placeholder={`${t("questions.option")} ${index + 1}`}
                />
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={option.is_correct}
                    onChange={() => handleCorrectAnswerChange(index)}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">{t("questions.correctAnswer")}</span>
                </label>
              </div>
            ))}
          </div>
        )}
        {questionType === "essay" && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="answer"
            >
              {t("questions.essayAnswer")}
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={handleAnswerChange}
              className="w-full px-3 py-2 border rounded"
              placeholder={t("questions.enterEssayAnswer")}
              rows="4"
            />
          </div>
        )}
        {validationError && (
          <div className="text-red-500 mb-4">{validationError}</div>
        )}
        <div className="text-right">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            {existingQuestion
              ? t("questions.updateQuestion")
              : t("questions.submitQuestion")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
