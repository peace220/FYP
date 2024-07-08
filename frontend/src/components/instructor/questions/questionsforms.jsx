import React, { useState } from "react";

const QuestionForm = () => {
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("multiple-choice");
  const [choices, setChoices] = useState([""]);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [essayAnswer, setEssayAnswer] = useState("");

  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
    setChoices([""]);
    setCorrectAnswer(null);
    setEssayAnswer("");
  };

  const handleChoiceChange = (index, e) => {
    const newChoices = [...choices];
    newChoices[index] = e.target.value;
    setChoices(newChoices);
  };

  const handleCorrectAnswerChange = (index) => {
    setCorrectAnswer(index);
  };

  const handleEssayAnswerChange = (e) => {
    setEssayAnswer(e.target.value);
  };

  const addChoice = () => {
    setChoices([...choices, ""]);
  };

  const deleteChoice = (index) => {
    const newChoices = choices.filter((_, i) => i !== index);
    setChoices(newChoices);
    if (index === correctAnswer) {
      setCorrectAnswer(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      questionText,
      questionType,
      choices: questionType === "multiple-choice" ? choices : null,
      correctAnswer: questionType === "multiple-choice" ? correctAnswer : null,
      essayAnswer: questionType === "essay" ? essayAnswer : null,
    });
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
            <option value="multiple-choice">Multiple Choice</option>
            <option value="essay">Essay</option>
          </select>
        </div>
        {questionType === "multiple-choice" && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Choices
            </label>
            {choices.map((choice, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e)}
                  className="w-full px-3 py-2 border rounded mr-2"
                  placeholder={`Choice ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => deleteChoice(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded mr-2"
                >
                  Delete
                </button>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={correctAnswer === index}
                    onChange={() => handleCorrectAnswerChange(index)}
                    className="form-radio text-indigo-600"
                  />
                  <span className="ml-2">Correct</span>
                </label>
              </div>
            ))}
            <button
              type="button"
              onClick={addChoice}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Choice
            </button>
          </div>
        )}
        {questionType === "essay" && (
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="essayAnswer"
            >
              Essay Answer
            </label>
            <textarea
              id="essayAnswer"
              value={essayAnswer}
              onChange={handleEssayAnswerChange}
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
            Submit Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
