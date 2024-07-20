import React, { useState, useEffect } from "react";
import Comment from "./comments";
import axios from "axios";
import { useParams } from "react-router-dom";

const CommentsSection = () => {
  const courseId = useParams();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    fetchComments();
  }, []);

  const handlePostComment = async () => {
    if (commentText.trim()) {
      const response = await axios.post(
        "http://localhost:5000/api/comments/postComments",
        {
          text: commentText,
          parent_id: null,
          course_id: courseId.courseId,
        },
        {
          headers: { "x-access-token": localStorage.getItem("token") },
        }
      );
      setComments([...comments, { ...response.data, replies: [] }]);
      setCommentText("");
    }
  };

  const fetchComments = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/comments/comments/${courseId.courseId}`
    );
    setComments(response.data);
  };
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <div className="mb-4">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full p-2 border rounded-lg mb-2"
          placeholder="Write a comment..."
        ></textarea>
        <button
          onClick={handlePostComment}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Post Comment
        </button>
      </div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsSection;
