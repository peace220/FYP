import React, { useState } from "react";
import CurriculumItem from "./CurriculumItem";
import { updateSection as updateSectionApi} from "../../../API/courseApi";
const CurriculumSection = ({ section, updateSection, deleteSection }) => {
  const [items, setItems] = useState(section.items || []);
  const [title, setTitle] = useState(section.title);
  const [isSectionConfirmed, setIsSectionConfirmed] = useState(!!section.title);
  const [showButton, setShowButton] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState("");
  const [lectureCount, setLectureCount] = useState(
    items.filter((item) => item.type === "lecture").length
  );
  const [quizCount, setQuizCount] = useState(
    items.filter((item) => item.type === "quiz").length
  );

  const addItem = (type) => {
    const newItem = {
      id: type === "lecture" ? lectureCount + 1 : quizCount + 1,
      sectionId: section.section_id,
      type,
      title: ""
    };
    const updatedItems = [...items, newItem];
    setItems(updatedItems);
    if (type === "lecture") {
      setLectureCount(lectureCount + 1);
    } else if (type === "quiz") {
      setQuizCount(quizCount + 1);
    }
  };

  const updateItem = (itemId, updatedItem) => {
    const updatedItems = items.map((item) =>
      item.type === updatedItem.type && item.id === itemId ? updatedItem : item
    );
    setItems(updatedItems);
  };

  const deleteItem = (itemId, itemType) => {
    const updatedItems = items.filter(
      (item) => item.id !== itemId || item.type !== itemType
    );
    setItems(updatedItems);

    if (itemType === "lecture") {
      setLectureCount(lectureCount - 1);
    } else if (itemType === "quiz") {
      setQuizCount(quizCount - 1);
    }
  };

  const saveSection = () => {
    const sectionData = { ...section, title, description };
    updateSection(section.section_id, sectionData);
    updateSectionApi(sectionData);
    setIsSectionConfirmed(true);
    setIsEditing(false);
  };

  const handleMouseEnter = () => {
    setShowButton(true);
  };

  const handleMouseLeave = () => {
    setShowButton(false);
  };

  return (
    <div className="border border-black p-4 mb-4 bg-gray-100">
      <div
        className="flex justify-between items-center mb-4 border-b-0 border-black"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h2 className="font-bold text-lg mb-2">
          Section {section.section_id}: {section.title}
        </h2>
        {showButton && isEditing == false && (
          <div>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-green-500 text-white px-2 py-1 rounded mr-3"
            >
              Edit
            </button>
            <button
              onClick={() => deleteSection(section.section_id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      {!isSectionConfirmed || isEditing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="w-full px-3 py-2 border rounded mb-2"
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
              onClick={saveSection}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Confirm
            </button>
          </div>
        </>
      ) : (
        <div>
          {items.map((item, index) => (
            <CurriculumItem
              key={index}
              item={item}
              updateItem={updateItem}
              deleteItem={(itemId) => deleteItem(itemId, item.type)}
            />
          ))}
          <button
            onClick={() => addItem("lecture")}
            className="bg-blue-500 text-white px-2 py-1 rounded mt-2 mr-2"
          >
            + Lecture
          </button>
          <button
            onClick={() => addItem("quiz")}
            className="bg-green-500 text-white px-2 py-1 rounded mt-2"
          >
            + Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default CurriculumSection;
