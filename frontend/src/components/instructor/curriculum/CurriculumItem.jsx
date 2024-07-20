import React, { useEffect, useState } from "react";
import QuestionForm from "../questions/questionsforms";
import { fetchVideos, uploadVideo, updateLecture } from "../../../API/courseApi";
import axios from "axios";

const CurriculumItem = ({ item, updateItem, deleteItem }) => {
  const [title, setTitle] = useState(item.title);
  const [isTitleConfirmed, setIsTitleConfirmed] = useState(!!item.title);
  const [showButton, setShowButton] = useState(false);
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState(item.description);
  const [isEditing, setIsEditing] = useState(false);

  const getVideos = async () => {
    const fetchedVideos = await fetchVideos(item);
    setVideo(fetchedVideos[0]);
  };

  const saveItem = async () => {
    const ItemData = { ...item, title, description };
    updateItem(item.id, ItemData);
    setIsTitleConfirmed(true);
    setIsEditing(false);
    if(ItemData.type === "lecture"){
      await axios.post
    }
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

  const handleVideoUpload = async () => {
    const formData = new FormData();
    formData.append("video", video);
    formData.append('lecture_id', item.id);
    formData.append('section_id', item.section_id);
    formData.append('course_id', item.course_id);
    await uploadVideo(formData);
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
          {item.type === "lecture" ? `Lecture ${item.id}` : `Quiz ${item.id}`}:{" "}
          {` ${item.title}`}
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
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full px-3 py-2 border rounded "
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full px-3 py-2 border rounded mb-2"
          />
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
                  <video width="320" height="240" controls>
                    <source
                      src={`http://localhost:3000/videos/${video.name}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              <div key={video.id}>
                <p>{video.name}</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CurriculumItem;
