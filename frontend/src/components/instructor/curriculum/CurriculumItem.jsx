import React, { useState } from "react";
import QuestionForm from "../questions/questionsforms";

const CurriculumItem = ({ item, updateItem, deleteItem }) => {
  const [title, setTitle] = useState(item.title);
  const [isTitleConfirmed, setIsTitleConfirmed] = useState(!!item.title);
  const [showButton, setShowButton] = useState(false);
  const [video, setVideo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const saveTitle = () => {
    updateItem(item.id, { ...item, title: title });
    setIsTitleConfirmed(true);
    setIsEditing(false);
  };

  const handleMouseEnter = () => {
    setShowButton(true);
  };

  const handleMouseLeave = () => {
    setShowButton(false);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleVideoUpload = () => {
    console.log("Uploaded video:", video);
  };

  return (
    <div className="border mb-2 p-3 bg-white space-y-2">
      <div
        className="flex justify-between items-center border-b-0 border-black"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <p className="font-semibold p-2">
          {item.type === "lecture" ? `Lecture ${item.id}` : `Quiz ${item.id}`}:{" "}
          {` ${item.title}`}
        </p>

        {showButton && isEditing === false  && (
          <div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 text-white px-2 py-1 rounded mr-3"
            >
              Edit
            </button>
            <button
              onClick={() => deleteItem(item.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {!isTitleConfirmed || isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full px-3 py-2 border rounded "
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={saveTitle}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Confirm
            </button>
          </div>
        </>
      ) : (
        <>
          {item.type === "quiz" ? (
            <QuestionForm />
          ) : (
            <div>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                className="w-full px-3 py-2 border rounded"
              />
              <button
                onClick={handleVideoUpload}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                Upload Video
              </button>
              {video && (
                <div className="mt-2">
                  <p>Selected video: {video.name}</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CurriculumItem;
