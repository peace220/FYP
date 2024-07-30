import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CurriculumCourse from "./CurriculumCourse";
import CommentsSection from "../../comments/commentSection";
import {
  fetchCourseById,
  updateCourses,
  deleteCourse,
} from "../../../API/curriculumApi";
import { useThemedStyles } from "../../../hooks/ThemeContrast";
import ThemedButton from "../../Theme/ThemeButton";
import { useTranslation } from "react-i18next";
const CurriculumCourseEdit = () => {
  const { t } = useTranslation();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const navigate = useNavigate();
  const { textColor } = useThemedStyles();
  const fetchCourse = async () => {
    const courseData = await fetchCourseById(courseId);
    setCourse(courseData[0]);
  };
  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const handleUpdateCourse = async (updatedCourse) => {
    await updateCourses(updatedCourse);
    fetchCourse();
    setCourse(updatedCourse);
  };

  const handleDeleteCourse = async () => {
    await deleteCourse(courseId);
    navigate("/instructor/courses");
  };

  const handleGoBack = () => {
    navigate("/instructor/courses");
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  if (!course)
    return <div className={`text-center ${textColor}`}>{t("curriculum.loading")}...</div>;

  return (
    <div className={`container mx-auto p-4`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className={`text-2xl font-bold ${textColor}`}>{t("curriculum.editCourse")}</h1>
        <div>
          <ThemedButton
            type="secondary"
            onClick={handleGoBack}
            className="px-4 py-2 rounded mr-2"
          >
            {t("curriculum.backtoCourse")}
          </ThemedButton>
          <ThemedButton
            type="primary"
            onClick={toggleComments}
            className="px-4 py-2 rounded"
          >
            {showComments ? t("curriculum.hideComments") : t("curriculum.showComments")}
          </ThemedButton>
        </div>
      </div>
      {!showComments && (
        <CurriculumCourse
          course={course}
          updateCourse={handleUpdateCourse}
          deleteCourse={handleDeleteCourse}
        />
      )}

      {showComments && (
        <div className="mt-8">
          <CommentsSection />
        </div>
      )}
    </div>
  );
};

export default CurriculumCourseEdit;
