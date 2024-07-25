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
      fetchComments();
      setCommentText("");
    }
  };

  const fetchComments = async () => {
    const response = await axios.get(
      `http://localhost:5000/api/comments/comments/${courseId.courseId}`
    );
    setComments(response.data);
  };

  const renderComments = (commentsList) => {
    return commentsList.map((comment) => (
      <div key={comment.id}>
        <Comment comment={comment} refetchComments={fetchComments} />
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-8">
            {comment.replies.map((reply) => (
              <div key={reply.id} className="border-l-2 border-gray-200 pl-4 my-2">
                <p>
                  <strong>{reply.username}</strong> replying to @{comment.username}: {reply.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    ));
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
      <div className="overflow-y-auto max-h-60" style={{ maxHeight: "600px" }}> 
        {renderComments(comments)}
      </div>
    </div>
  );
};

export default CommentsSection;
