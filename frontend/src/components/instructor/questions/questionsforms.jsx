import React, { useState } from "react";
import Layout from "../../../pages/Layout/Layout1";
const QuestionForm = () => {
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("multiple-choice");
  const [choices, setChoices] = useState([""]);

  const handleQuestionTextChange = (e) => {
    setQuestionText(e.target.value);
  };

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
  };

  const handleChoiceChange = (index, e) => {
    const newChoices = [...choices];
    newChoices[index] = e.target.value;
    setChoices(newChoices);
  };

  const addChoice = () => {
    setChoices([...choices, ""]);
  };

  const deleteChoice = (index) => {
    const newChoices = choices.filter((_, i) => i !== index);
    setChoices(newChoices);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      questionText,
      questionType,
      choices: questionType === "multiple-choice" ? choices : null,
    });
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg mt-4">
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
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
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
    </Layout>
  );
};

export default QuestionForm;
