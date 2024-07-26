import React, { useState, useEffect } from "react";
import {
  createQuestion,
  getQuestions,
  updateQuestions,
} from "../../../API/curriculumApi";

const QuestionForm = ({ item }) => {
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("multiple_choice");
  const [options, setOptions] = useState([
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
    { option_text: "", is_correct: false },
  ]);
  const [answer, setAnswer] = useState("");
  const [existingQuestion, setExistingQuestion] = useState(null);

  const fetchQuestions = async () => {
    try {
      const questions = await getQuestions(item);
      if (questions.length > 0) {
        const question = questions[0];
        setExistingQuestion(question);
        setQuestionText(question.question_text);
        setQuestionType(question.question_type);
        if (question.question_type === "multiple_choice") {
          setOptions(
            question.options.length === 4
              ? question.options
              : [
                  { option_text: "", is_correct: false },
                  { option_text: "", is_correct: false },
                  { option_text: "", is_correct: false },
                  { option_text: "", is_correct: false },
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
  }, []);

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
            Question Text
          </label>
          <input
            type="text"
            id="questionText"
            value={questionText}
            onChange={handleQuestionTextChange}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter the question"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="questionType"
          >
            Question Type
          </label>
          <select
            id="questionType"
            value={questionType}
            onChange={handleQuestionTypeChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="multiple_choice">Multiple Choice</option>
            <option value="essay">Essay</option>
          </select>
        </div>
        {questionType === "multiple_choice" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Options
            </label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option.option_text}
                  onChange={(e) => handleOptionChange(index, e)}
                  className="w-full px-3 py-2 border rounded mr-2"
                  required
                  placeholder={`Option ${index + 1}`}
                />
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={option.is_correct}
                    onChange={() => handleCorrectAnswerChange(index)}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Correct</span>
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
              Essay Answer
            </label>
            <textarea
              id="answer"
              value={answer}
              onChange={handleAnswerChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="Enter the essay answer"
              rows="4"
            />
          </div>
        )}
        <div className="text-right">
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            {existingQuestion ? "Update Question" : "Submit Question"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
