import React, { useState, useEffect } from "react";
import Layout from "../../../pages/Layout/Layout1";
const UserQuestion = ({ questions }) => {
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

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg mt-4">
        <form onSubmit={handleSubmit}>
          {questions.map((question) => (
            <div key={question.id} className="mb-4">
              <h3 className="text-lg font-bold mb-2">{question.text}</h3>
              {question.type === "multiple-choice" ? (
                <div className="mb-4">
                  {question.choices.map((choice, index) => (
                    <label key={index} className="block">
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
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Write your answer here"
                  ></textarea>
                </div>
              )}
            </div>
          ))}
          <div className="text-right">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Submit Answers
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UserQuestion;
