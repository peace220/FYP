import React, { useState, useEffect } from "react";
import CurriculumItem from "./CurriculumItem";
import {
  createQuiz,
  createLecture,
  fetchItems,
  deleteLecture,
  deleteQuiz,
  updateSection as updateSectionApi,
} from "../../../API/curriculumApi";
import { useThemedStyles } from "../../../hooks/ThemeContrast";
const CurriculumSection = ({ section, updateSection, deleteSection }) => {
  const {textColor } = useThemedStyles();
  const [items, setItems] = useState(section.items || []);
  const [title, setTitle] = useState(section.title);
  const [isSectionConfirmed, setIsSectionConfirmed] = useState(!!section.title);
  const [showButton, setShowButton] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(section.description);
  const [lectureCount, setLectureCount] = useState("");
  const [quizCount, setQuizCount] = useState("");

  const getItems = async () => {
    const ItemsData = await fetchItems(section.course_id, section.section_id);
    let lectureCounter = 0;
    let quizCounter = 0;
    let maxLectureId = 0;
    let maxQuizId = 0;
    const rearrangedData = ItemsData.map((item) => {
      if (item.type === "lecture") {
        lectureCounter++;
        maxLectureId = Math.max(maxLectureId, item.id);
        return { ...item, arranged_id: lectureCounter };
      } else if (item.type === "quiz") {
        quizCounter++;
        maxQuizId = Math.max(maxQuizId, item.id);
        return { ...item, arranged_id: quizCounter };
      }
      return item;
    });
    setLectureCount(maxLectureId);
    setQuizCount(maxQuizId)
    setItems(rearrangedData);
  };

  const addItem = async (type) => {
    if (items.length === 0) {
      const newItem = {
        id: type === "lecture" ? lectureCount + 1 : quizCount + 1,
        section_id: section.section_id,
        course_id: section.course_id,
        order_num: items.length + 1,
        type,
        title: "",
        description: "",
      };
      if (type === "lecture") {
        await createLecture(newItem);
        getItems();
      } else if (type === "quiz") {
        await createQuiz(newItem);
        getItems();
      }
    } else {
      const newItem = {
        id: type === "lecture" ? lectureCount + 1 : quizCount + 1,
        section_id: section.section_id,
        course_id: section.course_id,
        order_num: items.length + 1,
        type,
        title: "",
        description: "",
      };
      if (type === "lecture") {
        await createLecture(newItem);
        getItems();
      } else if (type === "quiz") {
        await createQuiz(newItem);
        getItems();
      }
    }
  };

  const updateItem = (itemId, updatedItem) => {
    const updatedItems = items.map((item) =>
      item.type === updatedItem.type && item.id === itemId ? updatedItem : item
    );
    setItems(updatedItems);
  };

  const deleteItem = async (itemId, itemSectionId, itemCourseId, itemType) => {
    if (itemType === "lecture") {
      await deleteLecture(itemId,itemSectionId,itemCourseId);
      getItems()
    } else if (itemType === "quiz") {
      await deleteQuiz(itemId,itemSectionId,itemCourseId);
      getItems()
    }
  };

  const saveSection = async () => {
    const sectionData = { ...section, title, description };
    await updateSectionApi(sectionData);
    updateSection(section.section_id, sectionData);
    setIsSectionConfirmed(true);
    setIsEditing(false);
  };

  const handleMouseEnter = () => {
    setShowButton(true);
  };

  const handleMouseLeave = () => {
    setShowButton(false);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="border border-black p-4 mb-4 bg-gray-100">
      <div
        className="flex justify-between items-center mb-4 border-b-0 border-black"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <h2 className={`font-bold text-lg mb-2 ${textColor}}`}>
          Section {section.arranged_id}: {section.title}
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
          {items
            .sort((a, b) => a.order_num - b.order_num)
            .map((item, index) => (
              <CurriculumItem
                key={index}
                item={item}
                updateItem={updateItem}
                deleteItem={(itemId) => deleteItem(itemId,item.section_id,item.course_id, item.type)}
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
