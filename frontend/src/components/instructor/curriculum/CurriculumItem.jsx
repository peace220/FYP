import React, { useEffect, useState } from "react";
import QuestionForm from "../questions/questionsforms";
import {
  fetchVideos,
  uploadVideo,
  updateLecture,
  updateQuiz,
  updateVideo
} from "../../../API/curriculumApi";

const CurriculumItem = ({ item, updateItem, deleteItem }) => {
  const [title, setTitle] = useState(item.title);
  const [isTitleConfirmed, setIsTitleConfirmed] = useState(!!item.title);
  const [showButton, setShowButton] = useState(false);
  const [video, setVideo] = useState(null);
  const [description, setDescription] = useState(item.description);
  const [isEditing, setIsEditing] = useState(false);
  const [transcript, setTranscript] = useState(null);
  const [videoExists, setVideoExists] = useState(false);

  const getVideos = async () => {
    const fetchedVideos = await fetchVideos(item);
    if (fetchedVideos.length > 0) {
      setVideo(fetchedVideos[0]);
      setVideoExists(true);
    }
  };

  const saveItem = async () => {
    const ItemData = { ...item, title, description };

    if (ItemData.type === "lecture") {
      await updateLecture(ItemData);
    } else if (ItemData.type === "quiz") {
      await updateQuiz(ItemData);
    }
    updateItem(item.id, ItemData);
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

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("video", video);
    formData.append("lecture_id", item.id);
    formData.append("section_id", item.section_id);
    formData.append("course_id", item.course_id);
    if (transcript) {
      formData.append("transcript", transcript);
    }

    if (videoExists) {
      await updateVideo(formData);
    } else {
      await uploadVideo(formData);
    }
    getVideos();
  };

  const handleTranscriptChange = (e) => {
    setTranscript(e.target.files[0]);
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="border mb-2 p-3 bg-white space-y-2">
      <div
        className="flex justify-between items-center border-b-0 border-black"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <p className="font-semibold p-2">
          {item.type === "lecture"
            ? `Lecture ${item.arranged_id}`
            : `Quiz ${item.arranged_id}`}
          :{` ${item.title}`}
        </p>

        {showButton && isEditing === false && (
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
          <div className="mb-2">
            <label htmlFor="title" className="block font-medium text-gray-700">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="w-full px-3 py-2 border rounded "
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="description"
              className="block font-medium text-gray-700"
            >
              Description:
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="w-full px-3 py-2 border rounded mb-2"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={saveItem}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Confirm
            </button>
          </div>
        </>
      ) : (
        <>
          {item.type === "quiz" ? (
            <QuestionForm item={item} />
          ) : (
            <div>
              <div className="mb-2">
                <label
                  htmlFor="video"
                  className="block font-medium text-gray-700"
                >
                  Video:
                </label>
                <input
                  type="file"
                  id="video"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="mb-2">
                <label
                  htmlFor="transcript"
                  className="block font-medium text-gray-700"
                >
                  Transcript:
                </label>
                <input
                  type="file"
                  id="transcript"
                  accept=".txt"
                  onChange={handleTranscriptChange}
                  className="w-full px-3 py-2 border rounded mt-2"
                />
              </div>
              <button
                onClick={handleUpload}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              >
                {videoExists ? "Update" : "Upload"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CurriculumItem;
